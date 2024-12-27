import { formatEther, parseEther, type Address, type PublicClient } from 'viem'

export interface Point {
  x: number
  y: number
  totalValue?: number
  userValue?: number
  previewPoint?: boolean
  previewValue?: number
}

interface CurveConfig {
  maxDepth?: number
  // Interpret slopeThreshold now as a "curvature threshold" 
  // for the chord-midpoint test. Values ~ 0.01 = 1% error.
  slopeThreshold?: number
  numInitialPoints?: number
}

/**
 * Safely convert a contract return value to bigint.
 */
function toBigInt(value: unknown): bigint {
  if (typeof value === 'bigint') return value
  if (typeof value === 'string') return BigInt(value)
  if (typeof value === 'number') return BigInt(value)
  throw new Error(`Cannot convert ${typeof value} to bigint`)
}

/**
 * Convert Wei (bigint) to a JS number, placing the decimal point 18 places from the right.
 * 
 * WARNING: If the bigint is > ~9e15, you'll lose integer precision in double.
 * But it's often "good enough" for plotting.
 */
function weiToNumber(wei: bigint): number {
  if (wei === 0n) return 0
  const s = wei.toString()
  const len = s.length
  if (len <= 18) {
    // e.g. 100000000 => "0.000000001"
    const pad = 18 - len
    return Number(`0.${'0'.repeat(pad)}${s}`)
  } else {
    // e.g. 10000000000000000000000 => "10000.000000000000000000"
    const integerPart = s.slice(0, len - 18)
    const fractionalPart = s.slice(len - 18)
    return Number(`${integerPart}.${fractionalPart}`)
  }
}

/**
 * Linear interpolation (y-value) at midX, given two endpoints in Wei.
 * Returns a "double" (JS number) approximation (since we can't do fractional BigInt).
 */
function linearInterpolation(
  x1: bigint,
  y1: bigint,
  x2: bigint,
  y2: bigint,
  midX: bigint
): number {
  // We'll do everything in double for the interpolation ratio:
  // ratio = (midX - x1) / (x2 - x1)
  const dxFull = Number(x2 - x1)
  if (dxFull === 0) return Number(y1) // degenerate
  const dxMid = Number(midX - x1)
  const ratio = dxMid / dxFull

  const y1Num = Number(y1)
  const y2Num = Number(y2)
  const dy = y2Num - y1Num
  const yPredMid = y1Num + dy * ratio
  return yPredMid
}

/**
 * Generates points for a bonding curve using:
 *   1) Uniform sampling: "numInitialPoints"
 *   2) Adaptive chord-midpoint refinement: "maxDepth" + "slopeThreshold"
 */
export async function generateCurvePoints(
  address: Address,
  abi: any[],
  currentMaxValue: number,
  publicClient: PublicClient,
  config: CurveConfig = {}
): Promise<Point[]> {
  interface BigIntPoint {
    x: bigint
    y: bigint
  }

  const {
    maxDepth = 20,
    slopeThreshold = 0.1,   // interpret as "max relative error" from chord-midpoint
    numInitialPoints = 20
  } = config

  let bigPoints: BigIntPoint[] = []

  try {
    // 1. Fetch contract constraints
    const [maxAssets, maxShares] = await Promise.all([
      publicClient.readContract({
        address,
        abi,
        functionName: 'maxAssets',
        args: []
      }).then(toBigInt),
      publicClient.readContract({
        address,
        abi,
        functionName: 'maxShares',
        args: []
      }).then(toBigInt)
    ])

    // 2. Determine upper bound
    const maxValueWei = parseEther(currentMaxValue.toString())
    const upperBoundWei = maxValueWei < maxAssets ? maxValueWei : maxAssets

    console.log('Generating curve with:', {
      maxAssets: maxAssets.toString(),
      maxShares: maxShares.toString(),
      upperBoundWei: upperBoundWei.toString()
    })

    // 3. Helper for reading shares
    async function getShares(assetsWei: bigint): Promise<bigint> {
      const res = await publicClient.readContract({
        address,
        abi,
        functionName: 'previewDeposit',
        args: [assetsWei, 0n, 0n]
      })
      return toBigInt(res)
    }

    // 4. Start with (0,0)
    bigPoints.push({ x: 0n, y: 0n })

    // 5. Uniform sampling
    if (upperBoundWei > 0n) {
      const stepSize = upperBoundWei / BigInt(numInitialPoints)

      for (let i = 1; i <= numInitialPoints; i++) {
        const x = stepSize * BigInt(i)
        if (x > upperBoundWei) break
        try {
          const y = await getShares(x)
          if (y > maxShares) {
            console.log('Exceeded maxShares at x=', x.toString())
            break
          }
          bigPoints.push({ x, y })
        } catch (err) {
          console.warn('Error calling previewDeposit at x=', x.toString(), err)
          break
        }
      }
    }

    // Sort to ensure ascending order
    bigPoints.sort((a, b) => (a.x < b.x ? -1 : a.x > b.x ? 1 : 0))

    // 6. The adaptive “chord-midpoint” approach
    async function refineSegment(
      x1: bigint,
      y1: bigint,
      x2: bigint,
      y2: bigint,
      depth: number
    ): Promise<BigIntPoint[]> {
      // If segment is zero-length or we reached max recursion, just keep the endpoint
      if (x2 <= x1) return [{ x: x2, y: y2 }]
      if (depth >= maxDepth) return [{ x: x2, y: y2 }]

      // 6.1 Compute midpoint
      const midX = (x1 + x2) / 2n
      let midY: bigint
      try {
        midY = await getShares(midX)
        if (midY > maxShares) {
          // Out of domain
          return [{ x: x2, y: y2 }]
        }
      } catch {
        // Could revert
        return [{ x: x1, y: y1 }]
      }

      // 6.2 Compute predicted midpoint from chord
      const yPredMid = linearInterpolation(x1, y1, x2, y2, midX)
      const midYNum = Number(midY)

      // 6.3 Compute difference in absolute terms
      const absDiff = Math.abs(midYNum - yPredMid)

      // 6.4 Determine the “scale” of this segment 
      // Using |y2 - y1| as scale or max of (y1,y2,midY). 
      const segScale = Math.abs(Number(y2 - y1)) || 1 // avoid 0 scale

      // 6.5 Relative difference
      const relDiff = absDiff / segScale

      if (relDiff > slopeThreshold) {
        // We need to subdivide further
        const leftSub = await refineSegment(x1, y1, midX, midY, depth + 1)
        const rightSub = await refineSegment(midX, midY, x2, y2, depth + 1)
        // Return everything except the repeated midpoint
        return [...leftSub, ...rightSub]
      } else {
        // It's flat enough, keep the endpoint
        return [{ x: x2, y: y2 }]
      }
    }

    // 7. Walk through the “uniform” points pairwise, refining
    let refined: BigIntPoint[] = []
    for (let i = 0; i < bigPoints.length - 1; i++) {
      const p1 = bigPoints[i]
      const p2 = bigPoints[i + 1]
      // Always keep the left point
      refined.push(p1)

      // Subdivide
      const subPoints = await refineSegment(p1.x, p1.y, p2.x, p2.y, 0)
      // subPoints includes the right endpoint, so we skip duplicating p2
      refined.push(...subPoints)
    }
    // Guarantee the last point
    refined.push(bigPoints[bigPoints.length - 1])

    // 8. Remove duplicates by x, re-sort
    const dedupMap = new Map<bigint, bigint>()
    for (const { x, y } of refined) {
      dedupMap.set(x, y)
    }
    const finalBigPoints = Array.from(dedupMap.entries())
      .map(([x, y]) => ({ x, y }))
      .sort((a, b) => (a.x < b.x ? -1 : 1))

    // 9. Convert to final {x, y} in JS number form
    const finalPoints: Point[] = finalBigPoints.map(({ x, y }) => ({
      x: weiToNumber(x),
      y: weiToNumber(y),
    }))

    console.log(`Final #points: ${finalPoints.length}`, finalPoints)
    return finalPoints
  } catch (err) {
    console.error('Error generating curve points:', err)
    // Return partial results, if any
    return bigPoints.map(({ x, y }) => ({
      x: weiToNumber(x),
      y: weiToNumber(y),
    }))
  }
}
