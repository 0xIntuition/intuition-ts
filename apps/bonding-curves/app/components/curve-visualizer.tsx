'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import { Button, Input, Label, Text } from '@0xintuition/1ui'

import { X } from 'lucide-react'
import {
  createPublicClient,
  formatEther,
  http,
  parseEther,
  stringToHex,
  toHex,
} from 'viem'
import { foundry } from 'viem/chains'

import {
  formatConstructorValues,
  getContractLayout,
  parseConstructorArgs,
  writeStorageSlot,
  type ConstructorArg,
  type ContractLayout,
  type StorageVariable,
} from '../lib/contract-utils'
import { parseNumberInput } from '../utils/units'
import { ConstructorForm } from './constructor-form'
import { ContractVariablesModal } from './contract-variables-modal'
import { LineChart } from './ui/line-chart'

interface Point {
  x: number
  y: number
  totalValue?: number
  userValue?: number
}

interface DeployedContract {
  id: string
  name: string
  address: `0x${string}`
  abi: any[]
  color: string
  points: Point[]
  totalAssets: number
  totalShares: number
  userAssets: number
  userShares: number
  previewDeposit?: Point
  previewRedeem?: Point
  constructorValues: Record<string, string>
  variableToConstructor: Record<string, string>
  constructorToVariable: Record<string, string>
}

interface FileData {
  file: File
  abi: any[]
  bytecode: string
  constructorArgs: ConstructorArg[]
  address?: string
}

interface AbiResponse {
  abi: any[]
  error?: string
}

interface DeployResponse {
  address?: string
  error?: string
}

const CURVE_COLORS = [
  'hsl(var(--primary))',
  'hsl(var(--secondary))',
  'hsl(var(--accent))',
  'hsl(var(--destructive))',
  'hsl(var(--success))',
]

export function CurveVisualizer() {
  const [files, setFiles] = useState<Map<string, FileData>>(new Map())
  const [deployedContracts, setDeployedContracts] = useState<
    DeployedContract[]
  >([])
  const [error, setError] = useState<string | null>(null)
  const [minValue, setMinValue] = useState<number>(0)
  const [maxValue, setMaxValue] = useState<number>(10)
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null)
  const [pendingDeployment, setPendingDeployment] = useState<string | null>(
    null,
  )
  const [isDeploying, setIsDeploying] = useState(false)
  const [constructorValues, setConstructorValues] = useState<
    Record<string, string>
  >({})
  const [selectedContract, setSelectedContract] =
    useState<DeployedContract | null>(null)
  const [contractLayout, setContractLayout] = useState<ContractLayout | null>(
    null,
  )

  // New state for simulation
  const [totalAssets, setTotalAssets] = useState(0)
  const [totalShares, setTotalShares] = useState(0)
  const [selectedCurveId, setSelectedCurveId] = useState<string | null>(null)
  const [depositAmount, setDepositAmount] = useState<number>(0)
  const [redeemAmount, setRedeemAmount] = useState<number>(0)

  const latestRangeRef = useRef({ min: minValue, max: maxValue })
  const pendingUpdateRef = useRef<NodeJS.Timeout | null>(null)

  const publicClient = createPublicClient({
    chain: foundry,
    transport: http('http://localhost:8545'),
  })

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0]
    if (!file || !file.name.endsWith('.sol')) {
      setError('Please select a valid Solidity file')
      return
    }

    try {
      const content = await file.text()
      const formData = new FormData()
      formData.append('file', file)
      formData.append('content', content)

      const compileResponse = await fetch('/api/compile', {
        method: 'POST',
        body: formData,
      })
      const compileData = await compileResponse.json()

      if (compileData.error) {
        setError(compileData.error)
        return
      }

      const newId = crypto.randomUUID()
      setFiles((prevFiles) => {
        const newFiles = new Map(prevFiles)
        newFiles.set(newId, {
          file,
          abi: compileData.abi,
          bytecode: compileData.bytecode,
          constructorArgs: compileData.constructorInputs || [],
        })
        return newFiles
      })

      setSelectedFileId(newId)
      setError(null)
    } catch (err) {
      console.error('Error processing file:', err)
      setError(
        err instanceof Error ? err.message : 'Failed to process contract',
      )
    }

    event.target.value = ''
  }

  const generateCurvePoints = useCallback(
    async (address: string, abi: any[]) => {
      const { min, max } = latestRangeRef.current
      const points: Point[] = []
      const numPoints = 100
      const maxValueWei = parseEther(max.toString())
      const minValueWei = parseEther(min.toString())
      const stepWei = (maxValueWei - minValueWei) / BigInt(numPoints)

      for (let i = 0; i <= numPoints; i++) {
        const assets = minValueWei + BigInt(i) * stepWei
        try {
          const shares = await publicClient.readContract({
            address: address as `0x${string}`,
            abi,
            functionName: 'assetsToShares',
            args: [assets, 0n, 0n],
          })

          points.push({
            x: Number(assets) / 1e18,
            y: Number(shares) / 1e18,
          })
        } catch (err) {
          console.error('Error calling contract:', err)
        }
      }

      return points
    },
    [publicClient, latestRangeRef],
  )

  const regenerateCurves = useCallback(async () => {
    const { min, max } = latestRangeRef.current
    console.log('Regenerating all curves for range:', { min, max })

    const updatedCurves = await Promise.all(
      deployedContracts.map(async (contract) => {
        const points = await generateCurvePoints(contract.address, contract.abi)
        return {
          ...contract,
          points: points.map((p) => ({
            ...p,
            totalValue: p.x <= contract.totalAssets ? p.y : undefined,
            userValue: p.x <= contract.userAssets ? p.y : undefined,
          })),
        }
      }),
    )

    setDeployedContracts(updatedCurves)
  }, [deployedContracts, generateCurvePoints])

  const handleMinMaxChange = useCallback(
    (newMin: number, newMax: number) => {
      latestRangeRef.current = { min: newMin, max: newMax }
      if (pendingUpdateRef.current) {
        clearTimeout(pendingUpdateRef.current)
      }
      pendingUpdateRef.current = setTimeout(async () => {
        await regenerateCurves()
        pendingUpdateRef.current = null
      }, 100)
    },
    [regenerateCurves],
  )

  const removeCurve = (id: string) => {
    setFiles((prev) => {
      const newMap = new Map(prev)
      newMap.delete(id)
      return newMap
    })
    setDeployedContracts((prev) => prev.filter((c) => c.id !== id))
  }

  const handleConstructorSubmit = async (
    values: Record<string, string>,
    fileId?: string,
  ) => {
    const targetId = fileId || selectedFileId
    if (!targetId) return

    setSelectedFileId(null)
    await deployContract(targetId, values)
  }

  const deployContract = async (
    fileId: string,
    values: Record<string, string>,
  ) => {
    if (isDeploying) return
    const fileData = files.get(fileId)
    if (!fileData) return

    try {
      setIsDeploying(true)
      setPendingDeployment(fileId)
      setConstructorValues(values)

      const parsedArgs = fileData.constructorArgs.map((arg) => {
        const value = values[arg.name]
        if (!value && arg.type.startsWith('uint')) return toHex(0n)
        if (!value) return value

        if (arg.type.startsWith('uint') || arg.type.startsWith('int')) {
          const parsedValue = parseNumberInput(value)
          return toHex(parsedValue)
        }
        return value
      })

      const deployFormData = new FormData()
      deployFormData.append('abi', JSON.stringify(fileData.abi))
      deployFormData.append('bytecode', fileData.bytecode)
      deployFormData.append('constructorArgs', JSON.stringify(parsedArgs))

      console.log('Deploying contract with args:', parsedArgs)
      const response = await fetch('/api/deploy', {
        method: 'POST',
        body: deployFormData,
      })
      const data = await response.json()

      if (data.error) {
        setError(data.error)
        setPendingDeployment(null)
        setIsDeploying(false)
        return
      }

      if (data.address) {
        const points = await generateCurvePoints(data.address, fileData.abi)
        setDeployedContracts((prev) => {
          if (prev.some((c) => c.address === data.address)) {
            return prev
          }

          // Create bidirectional mappings between constructor args and contract variables
          const constructorToVariable: Record<string, string> = {}
          const variableToConstructor: Record<string, string> = {}

          fileData.constructorArgs.forEach((arg) => {
            // Constructor args are lowercase (e.g., "offset")
            // Contract variables are uppercase (e.g., "OFFSET")
            const varName = arg.name.toUpperCase()
            constructorToVariable[arg.name] = varName
            variableToConstructor[varName] = arg.name
          })

          const newContract: DeployedContract = {
            id: data.address,
            name: fileData.file.name.replace('.sol', ''),
            address: data.address,
            abi: fileData.abi,
            constructorValues: values,
            constructorToVariable,
            variableToConstructor,
            points,
            color: CURVE_COLORS[prev.length % CURVE_COLORS.length],
            totalAssets: 0,
            totalShares: 0,
            userAssets: 0,
            userShares: 0,
          }
          return [...prev, newContract]
        })
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to deploy contract')
    } finally {
      setPendingDeployment(null)
      setIsDeploying(false)
    }
  }

  const handleCurveSelect = (id: string) => {
    setSelectedCurveId(id)
    const curve = deployedContracts.find((c) => c.id === id)
    if (curve) {
      setTotalAssets(curve.totalAssets)
      setTotalShares(curve.totalShares)
    }
  }

  const handleEditCurve = useCallback(async () => {
    if (!selectedCurveId) return
    const curve = deployedContracts.find((c) => c.id === selectedCurveId)
    if (!curve) return

    try {
      const layout = await getContractLayout(
        curve.address,
        curve.abi,
        publicClient,
      )
      setContractLayout(layout)
      setSelectedContract(curve)
    } catch (err) {
      console.error('Error getting contract layout:', err)
    }
  }, [selectedCurveId, deployedContracts, publicClient])

  const handleUpdateTotals = useCallback(async () => {
    if (!selectedCurveId) return

    setDeployedContracts((prev) =>
      prev.map((curve) =>
        curve.id === selectedCurveId
          ? {
              ...curve,
              totalAssets,
              totalShares,
              points: curve.points.map((point) => ({
                ...point,
                totalValue: point.y * totalAssets,
                userValue: point.y * curve.userShares,
              })),
            }
          : curve,
      ),
    )
  }, [selectedCurveId, totalAssets, totalShares])

  // Calculate step size based on current value using logarithms
  const calculateStepSize = useCallback((value: number) => {
    if (value === 0) return 0.1
    const magnitude = Math.floor(Math.log10(value))
    return Math.pow(10, magnitude - 1)
  }, [])

  const handleTotalAssetsChange = useCallback(
    async (newValue: string) => {
      if (!selectedCurveId) return
      const curve = deployedContracts.find((c) => c.id === selectedCurveId)
      if (!curve) return

      const numericValue = Number(newValue)
      if (isNaN(numericValue) || numericValue < 0) return

      // Update max value if needed before updating graph
      if (numericValue > maxValue) {
        const newMax = Math.pow(2, Math.ceil(Math.log2(numericValue)))
        setMaxValue(newMax) // Update UI
        handleMinMaxChange(minValue, newMax) // Regenerate curves
      }

      try {
        const shares = await publicClient.readContract({
          address: curve.address,
          abi: curve.abi,
          functionName: 'assetsToShares',
          args: [parseEther(numericValue.toString()), 0n, 0n],
        })

        const sharesNum = Number(formatEther(BigInt(shares.toString())))
        setTotalAssets(numericValue)
        setTotalShares(sharesNum)

        setDeployedContracts((prev) =>
          prev.map((c) =>
            c.id === selectedCurveId
              ? {
                  ...c,
                  totalAssets: numericValue,
                  totalShares: sharesNum,
                  points: c.points.map((point) => ({
                    ...point,
                    totalValue: point.x <= numericValue ? point.y : undefined,
                    userValue: point.x <= c.userAssets ? point.y : undefined,
                  })),
                }
              : c,
          ),
        )
      } catch (error) {
        console.error('Error in handleTotalAssetsChange:', error)
      }
    },
    [
      selectedCurveId,
      deployedContracts,
      maxValue,
      minValue,
      publicClient,
      handleMinMaxChange,
      setMaxValue,
    ],
  )

  const handleTotalSharesChange = useCallback(
    async (newValue: string) => {
      if (!selectedCurveId) return
      const curve = deployedContracts.find((c) => c.id === selectedCurveId)
      if (!curve) return

      const numericValue = Number(newValue)
      if (isNaN(numericValue) || numericValue < 0) return

      // Start with a small step and gradually increase
      let currentAssets = 0
      let step = 0.1
      let prevShares = 0
      let prevAssets = 0
      const EPSILON = 0.0001

      try {
        // Binary search with dynamic step size
        while (true) {
          const shares = await publicClient.readContract({
            address: curve.address,
            abi: curve.abi,
            functionName: 'assetsToShares',
            args: [parseEther(currentAssets.toString()), 0n, 0n],
          })
          const sharesNum = Number(formatEther(BigInt(shares.toString())))

          // Check if we've bracketed our target
          if (Math.abs(sharesNum - numericValue) < EPSILON) {
            // Found exact match within epsilon
            setTotalShares(numericValue)
            setTotalAssets(currentAssets)

            // Update max value if needed before updating graph
            if (currentAssets > maxValue) {
              const newMax = Math.pow(2, Math.ceil(Math.log2(currentAssets)))
              setMaxValue(newMax) // Update UI
              handleMinMaxChange(minValue, newMax) // Regenerate curves
            }

            // Update deployed contracts state with new values
            setDeployedContracts((prev) =>
              prev.map((c) =>
                c.id === selectedCurveId
                  ? {
                      ...c,
                      totalAssets: currentAssets,
                      totalShares: numericValue,
                      points: c.points.map((point) => ({
                        ...point,
                        totalValue:
                          point.x <= currentAssets ? point.y : undefined,
                        userValue:
                          point.x <= c.userAssets ? point.y : undefined,
                      })),
                    }
                  : c,
              ),
            )
            break
          }

          if (prevShares < numericValue && sharesNum > numericValue) {
            // We've bracketed the target, interpolate
            const assetsNumber =
              prevAssets +
              ((numericValue - prevShares) * (currentAssets - prevAssets)) /
                (sharesNum - prevShares)

            setTotalShares(numericValue)
            setTotalAssets(assetsNumber)

            // Update max value if needed before updating graph
            if (assetsNumber > maxValue) {
              const newMax = Math.pow(2, Math.ceil(Math.log2(assetsNumber)))
              setMaxValue(newMax) // Update UI
              handleMinMaxChange(minValue, newMax) // Regenerate curves
            }

            // Update deployed contracts state with new values
            setDeployedContracts((prev) =>
              prev.map((c) =>
                c.id === selectedCurveId
                  ? {
                      ...c,
                      totalAssets: assetsNumber,
                      totalShares: numericValue,
                      points: c.points.map((point) => ({
                        ...point,
                        totalValue:
                          point.x <= assetsNumber ? point.y : undefined,
                        userValue:
                          point.x <= c.userAssets ? point.y : undefined,
                      })),
                    }
                  : c,
              ),
            )
            break
          }

          prevShares = sharesNum
          prevAssets = currentAssets

          if (sharesNum < numericValue) {
            currentAssets += step
            step *= 1.5 // Accelerate step size
          } else {
            currentAssets -= step
            step /= 2 // Reduce step size for finer search
          }

          // Safety check to prevent infinite loops
          if (currentAssets > 1000000 || currentAssets < 0) {
            console.error('Search exceeded bounds')
            return
          }
        }
      } catch (error) {
        console.error('Error in handleTotalSharesChange:', error)
      }
    },
    [
      selectedCurveId,
      deployedContracts,
      maxValue,
      minValue,
      publicClient,
      handleMinMaxChange,
      setMaxValue,
    ],
  )

  const handleDepositAmountChange = useCallback(
    async (amount: number) => {
      if (!selectedCurveId) return
      const curve = deployedContracts.find((c) => c.id === selectedCurveId)
      if (!curve) return

      try {
        if (!amount) {
          setDepositAmount(0)
          setDeployedContracts((prev) =>
            prev.map((c) =>
              c.id === selectedCurveId
                ? { ...c, previewDeposit: undefined }
                : c,
            ),
          )
          return
        }

        setDepositAmount(amount)
        const shares = await publicClient.readContract({
          address: curve.address,
          abi: curve.abi,
          functionName: 'previewDeposit',
          args: [parseEther(amount.toString())],
        })
        const sharesNumber = Number(formatEther(BigInt(shares.toString())))

        // Update preview point
        const previewPoint = {
          x: curve.totalAssets + amount,
          y: curve.totalShares + sharesNumber,
        }

        setDeployedContracts((prev) =>
          prev.map((c) =>
            c.id === selectedCurveId
              ? {
                  ...c,
                  previewDeposit: previewPoint,
                  previewRedeem: undefined,
                }
              : c,
          ),
        )
      } catch (err) {
        console.error('Error previewing deposit:', err)
      }
    },
    [selectedCurveId, publicClient, deployedContracts],
  )

  const handleRedeemAmountChange = useCallback(
    async (amount: number) => {
      if (!selectedCurveId) return
      const curve = deployedContracts.find((c) => c.id === selectedCurveId)
      if (!curve) return

      try {
        if (!amount) {
          setRedeemAmount(0)
          setDeployedContracts((prev) =>
            prev.map((c) =>
              c.id === selectedCurveId ? { ...c, previewRedeem: undefined } : c,
            ),
          )
          return
        }

        setRedeemAmount(amount)
        const assets = await publicClient.readContract({
          address: curve.address,
          abi: curve.abi,
          functionName: 'previewRedeem',
          args: [parseEther(amount.toString())],
        })
        const assetsNumber = Number(formatEther(BigInt(assets.toString())))

        // Update preview point
        const previewPoint = {
          x: curve.totalAssets - assetsNumber,
          y: curve.totalShares - amount,
        }

        setDeployedContracts((prev) =>
          prev.map((c) =>
            c.id === selectedCurveId
              ? {
                  ...c,
                  previewRedeem: previewPoint,
                  previewDeposit: undefined,
                }
              : c,
          ),
        )
      } catch (err) {
        console.error('Error previewing redeem:', err)
      }
    },
    [selectedCurveId, publicClient, deployedContracts],
  )

  const handleDeposit = useCallback(async () => {
    if (!selectedCurveId || !depositAmount) return
    const curve = deployedContracts.find((c) => c.id === selectedCurveId)
    if (!curve) return

    try {
      const shares = await publicClient.readContract({
        address: curve.address,
        abi: curve.abi,
        functionName: 'previewDeposit',
        args: [parseEther(depositAmount.toString())],
      })
      const sharesNumber = Number(formatEther(BigInt(shares.toString())))

      const newTotalAssets = curve.totalAssets + depositAmount
      const newTotalShares = curve.totalShares + sharesNumber
      const newUserAssets = curve.userAssets + depositAmount
      const newUserShares = curve.userShares + sharesNumber

      // Update all points with new totals
      const updatedPoints = curve.points.map((point) => ({
        ...point,
        totalValue: point.x <= newTotalAssets ? point.y : undefined,
        userValue: point.x <= newUserAssets ? point.y : undefined,
      }))

      setDeployedContracts((prev) =>
        prev.map((c) =>
          c.id === selectedCurveId
            ? {
                ...c,
                totalAssets: newTotalAssets,
                totalShares: newTotalShares,
                userAssets: newUserAssets,
                userShares: newUserShares,
                previewDeposit: undefined,
                points: updatedPoints,
              }
            : c,
        ),
      )

      setDepositAmount(0)
      setTotalAssets(newTotalAssets)
      setTotalShares(newTotalShares)
    } catch (err) {
      console.error('Error simulating deposit:', err)
    }
  }, [selectedCurveId, depositAmount, publicClient, deployedContracts])

  const handleRedeem = useCallback(async () => {
    if (!selectedCurveId || !redeemAmount) return
    const curve = deployedContracts.find((c) => c.id === selectedCurveId)
    if (!curve) return

    try {
      const assets = await publicClient.readContract({
        address: curve.address,
        abi: curve.abi,
        functionName: 'previewRedeem',
        args: [parseEther(redeemAmount.toString())],
      })
      const assetsNumber = Number(formatEther(BigInt(assets.toString())))

      const newTotalAssets = curve.totalAssets - assetsNumber
      const newTotalShares = curve.totalShares - redeemAmount
      const newUserAssets = curve.userAssets - assetsNumber
      const newUserShares = curve.userShares - redeemAmount

      // Update all points with new totals
      const updatedPoints = curve.points.map((point) => ({
        ...point,
        totalValue: point.x <= newTotalAssets ? point.y : undefined,
        userValue: point.x <= newUserAssets ? point.y : undefined,
      }))

      setDeployedContracts((prev) =>
        prev.map((c) =>
          c.id === selectedCurveId
            ? {
                ...c,
                totalAssets: newTotalAssets,
                totalShares: newTotalShares,
                userAssets: newUserAssets,
                userShares: newUserShares,
                previewRedeem: undefined,
                points: updatedPoints,
              }
            : c,
        ),
      )

      setRedeemAmount(0)
      setTotalAssets(newTotalAssets)
      setTotalShares(newTotalShares)
    } catch (err) {
      console.error('Error simulating redeem:', err)
    }
  }, [selectedCurveId, redeemAmount, publicClient, deployedContracts])

  const handleVariableChange = async (
    variable: StorageVariable,
    newValue: string,
  ) => {
    if (!selectedContract) return

    try {
      let parsedValue: bigint
      const isString = variable.type === 'string'

      if (isString) {
        // Use Viem's stringToHex, pad to 32 bytes
        const hex = stringToHex(newValue, { size: 32 })
        parsedValue = BigInt(hex)
      } else if (
        variable.type.startsWith('uint') ||
        variable.type.startsWith('int')
      ) {
        parsedValue = parseNumberInput(newValue)
      } else {
        console.warn('Unsupported variable type:', variable.type)
        return
      }

      await writeStorageSlot(
        selectedContract.address,
        variable.slot,
        parsedValue,
        publicClient,
      )

      // Get updated contract state
      const newLayout = await getContractLayout(
        selectedContract.address,
        selectedContract.abi,
        publicClient,
      )

      // Update the contract layout with the new values
      const updatedLayout = {
        ...newLayout,
        variables: newLayout.variables.map((v) => ({
          ...v,
          value:
            v.name === variable.name
              ? v.type === 'string'
                ? newValue
                : parsedValue.toString()
              : contractLayout?.variables
                  .find((cv) => cv.name === v.name)
                  ?.value?.toString() ||
                v.value?.toString() ||
                '',
        })),
      }

      setContractLayout(updatedLayout)

      const points = await generateCurvePoints(
        selectedContract.address,
        selectedContract.abi,
      )

      // Update both the contract state and constructor values
      setDeployedContracts((prev) =>
        prev.map((c) =>
          c.address === selectedContract.address
            ? {
                ...c,
                points: points.map((p) => ({ ...p })),
                constructorValues: {
                  ...c.constructorValues,
                  [c.variableToConstructor[variable.name] ||
                  variable.name.toLowerCase()]: newValue,
                },
              }
            : c,
        ),
      )
    } catch (err) {
      console.error('Failed to update variable:', err)
      setError(err instanceof Error ? err.message : 'Failed to update variable')
    }
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (pendingUpdateRef.current) {
        clearTimeout(pendingUpdateRef.current)
      }
    }
  }, [])

  return (
    <div className="flex flex-col gap-4">
      <div>
        <Text variant="heading2">Bonding Curve Visualizer</Text>
        <Text variant="body" className="text-muted-foreground">
          Upload and compare multiple bonding curve implementations
        </Text>
      </div>

      <div className="flex flex-col gap-4 rounded-lg border border-border p-4">
        <div className="flex justify-between gap-4">
          <div className="flex flex-col gap-2">
            <Label>Min Value (ETH)</Label>
            <Input
              type="number"
              value={minValue}
              onChange={(e) => {
                const newMin = Number(e.target.value)
                setMinValue(newMin)
                handleMinMaxChange(newMin, maxValue)
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Max Value (ETH)</Label>
            <Input
              type="number"
              value={maxValue}
              onChange={(e) => {
                const newMax = Number(e.target.value)
                setMaxValue(newMax)
                handleMinMaxChange(minValue, newMax)
              }}
            />
          </div>
        </div>

        <div>
          <Label>Add Curve Implementation</Label>
          <Input type="file" onChange={handleFileChange} />
        </div>

        <div className="flex items-center gap-2">
          {deployedContracts.map((contract) => (
            <div
              key={contract.id}
              className={`flex flex-col gap-2 rounded-lg border p-2 cursor-pointer ${
                selectedCurveId === contract.id
                  ? 'border-primary bg-primary/10'
                  : 'border-border'
              }`}
              onClick={() => handleCurveSelect(contract.id)}
            >
              <div className="flex items-center gap-2">
                <div
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: contract.color }}
                />
                <span>{contract.name}</span>
                <Button
                  variant="ghost"
                  className="h-4 w-4 p-0"
                  onClick={(e) => {
                    e.stopPropagation()
                    removeCurve(contract.id)
                  }}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
              <div className="text-xs text-muted-foreground">
                {Object.entries(contract.constructorValues).map(
                  ([key, value]) => (
                    <div key={key}>
                      {key}: {value}
                    </div>
                  ),
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="h-[400px] w-full rounded-lg border border-border p-4">
          <LineChart
            data={deployedContracts}
            xLabel="Assets (ETH)"
            yLabel="Shares (ETH)"
            minValue={minValue}
            maxValue={maxValue}
          />
        </div>

        {selectedCurveId && (
          <>
            <div className="flex justify-between items-center">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label>Total Assets</Label>
                  <Input
                    type="number"
                    value={totalAssets}
                    onChange={(e) => handleTotalAssetsChange(e.target.value)}
                    step={calculateStepSize(totalAssets)}
                    min={0}
                  />
                </div>
                <div className="flex-1">
                  <Label>Total Shares</Label>
                  <Input
                    type="number"
                    value={totalShares}
                    onChange={(e) => {
                      const newValue = e.target.value
                      setTotalShares(Number(newValue))
                      handleTotalSharesChange(newValue)
                    }}
                    step={calculateStepSize(totalShares)}
                    min={0}
                  />
                </div>
              </div>
              <Button onClick={handleEditCurve}>Edit Curve</Button>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <Label>Deposit Amount (ETH)</Label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    value={depositAmount}
                    onChange={(e) =>
                      handleDepositAmountChange(Number(e.target.value))
                    }
                  />
                  <Button onClick={handleDeposit}>Deposit</Button>
                </div>
              </div>
              <div className="flex-1">
                <Label>Redeem Amount (Shares)</Label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    value={redeemAmount}
                    onChange={(e) =>
                      handleRedeemAmountChange(Number(e.target.value))
                    }
                  />
                  <Button onClick={handleRedeem}>Redeem</Button>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <Label>Your Assets (ETH)</Label>
                <Input
                  type="number"
                  value={
                    deployedContracts.find((c) => c.id === selectedCurveId)
                      ?.userAssets || 0
                  }
                  readOnly
                />
              </div>
              <div className="flex-1">
                <Label>Your Shares</Label>
                <Input
                  type="number"
                  value={
                    deployedContracts.find((c) => c.id === selectedCurveId)
                      ?.userShares || 0
                  }
                  readOnly
                />
              </div>
            </div>
          </>
        )}
      </div>

      {selectedFileId && (
        <ConstructorForm
          isOpen={true}
          onClose={() => setSelectedFileId(null)}
          onSubmit={handleConstructorSubmit}
          args={files.get(selectedFileId)?.constructorArgs || []}
          fileName={files.get(selectedFileId)?.file.name || ''}
        />
      )}

      <ContractVariablesModal
        isOpen={!!selectedContract}
        onClose={() => {
          setSelectedContract(null)
          setContractLayout(null)
        }}
        contract={
          selectedContract && contractLayout
            ? {
                address: selectedContract.address,
                name: selectedContract.name,
                variables: contractLayout.variables,
              }
            : null
        }
        onVariableChange={handleVariableChange}
      />
    </div>
  )
}
