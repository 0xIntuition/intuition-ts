import { GetFeeTransfersQuery } from '@0xintuition/graphql'

export const POINTS_CUTOFF_TIMESTAMP = 1733356800

export function calculateProtocolPoints(data: GetFeeTransfersQuery) {
  const beforeCutoffAmount = data.before_cutoff?.aggregate?.sum?.amount ?? '0'
  const afterCutoffAmount = data.after_cutoff?.aggregate?.sum?.amount ?? '0'

  const beforeCutoffPoints =
    (BigInt(beforeCutoffAmount) * BigInt(10000000)) / BigInt(1e18)
  const afterCutoffPoints =
    (BigInt(afterCutoffAmount) * BigInt(1000000)) / BigInt(1e18)
  const totalPoints = beforeCutoffPoints + afterCutoffPoints

  return {
    beforeCutoffAmount,
    afterCutoffAmount,
    beforeCutoffPoints: beforeCutoffPoints.toString(),
    afterCutoffPoints: afterCutoffPoints.toString(),
    totalPoints: totalPoints.toString(),
  }
}
