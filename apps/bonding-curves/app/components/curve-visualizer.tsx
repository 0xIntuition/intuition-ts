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
  type Abi,
  type Address,
  type ContractFunctionArgs,
  type ContractFunctionResult,
  type PublicClient,
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
  previewPoint?: boolean
  previewValue?: number
}

interface DeployedContract {
  id: string
  name: string
  address: Address
  abi: any[]
  constructorValues: Record<string, string>
  constructorToVariable: Record<string, string>
  variableToConstructor: Record<string, string>
  points: Point[]
  color: string
  totalAssets: bigint
  totalShares: bigint
  userAssets: bigint
  userShares: bigint
  maxAssets: bigint
  maxShares: bigint
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

interface ContractInfo {
  address: Address
  name: string
  variables: StorageVariable[]
  constructorValues?: Record<string, string>
  variableToConstructor?: Record<string, string>
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
  const [contractInfo, setContractInfo] = useState<ContractInfo | null>(null)

  // New state for simulation
  const [totalAssets, setTotalAssets] = useState<bigint>(0n)
  const [totalShares, setTotalShares] = useState<bigint>(0n)
  const [selectedCurveId, setSelectedCurveId] = useState<string | null>(null)
  const [depositAmount, setDepositAmount] = useState<bigint>(0n)
  const [redeemAmount, setRedeemAmount] = useState<bigint>(0n)

  // Initialize user assets and shares with defaults
  const [userAssets, setUserAssets] = useState<bigint>(parseEther('100'))
  const [userShares, setUserShares] = useState<bigint>(0n)

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
    async (address: string, abi: any[], currentMaxValue: number) => {
      const points: Point[] = []
      const numPoints = 100

      try {
        // Get max values in Wei
        const maxAssets = (await publicClient.readContract({
          address: address as `0x${string}`,
          abi,
          functionName: 'maxAssets',
          args: [] as const,
        })) as unknown as bigint

        const maxShares = (await publicClient.readContract({
          address: address as `0x${string}`,
          abi,
          functionName: 'maxShares',
          args: [] as const,
        })) as unknown as bigint

        // Convert maxValue to Wei for comparison
        const maxValueWei = parseEther(currentMaxValue.toString())

        // Use the smaller of maxValueWei and maxAssets as our upper bound
        const upperBoundWei = maxValueWei < maxAssets ? maxValueWei : maxAssets
        const stepWei = upperBoundWei / BigInt(numPoints)

        console.log('Generating points with:', {
          maxAssets: formatEther(maxAssets),
          maxShares: formatEther(maxShares),
          upperBound: formatEther(upperBoundWei),
          step: formatEther(stepWei),
        })

        // Add the origin point explicitly
        points.push({
          x: 0,
          y: 0,
        })

        // Start from the first non-zero step
        for (let i = 1n; i <= BigInt(numPoints); i++) {
          const assetsWei = stepWei * i
          if (assetsWei > maxAssets) break

          try {
            // Use previewDeposit with totalAssets=0 and totalShares=0 for plotting
            const sharesWei = (await publicClient.readContract({
              address: address as `0x${string}`,
              abi,
              functionName: 'previewDeposit',
              args: [assetsWei, 0n, 0n] as const,
            })) as unknown as bigint

            if (sharesWei > maxShares) break

            points.push({
              x: parseFloat(formatEther(assetsWei)),
              y: parseFloat(formatEther(sharesWei)),
            })
          } catch (err: any) {
            if (
              err.message?.includes('Assets exceed domain') ||
              err.message?.includes('Shares exceed domain')
            ) {
              break
            }
            throw err
          }
        }

        console.log('Generated points:', points)
        return points
      } catch (err) {
        console.error('Error generating curve points:', err)
        return points
      }
    },
    [publicClient],
  )

  const simulatePreview = useCallback(
    async (
      contract: DeployedContract,
      amount: number,
      type: 'deposit' | 'mint' | 'withdraw' | 'redeem',
    ) => {
      const amountWei = parseEther(amount.toString())
      const totalAssetsWei = contract.totalAssets
      const totalSharesWei = contract.totalShares

      try {
        let result: bigint
        switch (type) {
          case 'deposit': {
            const response = await publicClient.readContract({
              address: contract.address,
              abi: contract.abi,
              functionName: 'previewDeposit',
              args: [amountWei, totalAssetsWei, totalSharesWei] as const,
            })
            result = BigInt(response as unknown as string)
            console.log('result', result)
            return {
              x: amount,
              y: Number(formatEther(result)),
              previewPoint: true,
            }
          }
          case 'mint': {
            const response = await publicClient.readContract({
              address: contract.address,
              abi: contract.abi,
              functionName: 'previewMint',
              args: [amountWei, totalSharesWei, totalAssetsWei] as const,
            })
            result = BigInt(response as unknown as string)
            return {
              x: Number(formatEther(result)),
              y: amount,
              previewPoint: true,
            }
          }
          case 'withdraw': {
            const response = await publicClient.readContract({
              address: contract.address,
              abi: contract.abi,
              functionName: 'previewWithdraw',
              args: [amountWei, totalAssetsWei, totalSharesWei] as const,
            })
            result = BigInt(response as unknown as string)
            return {
              x: amount,
              y: Number(formatEther(result)),
              previewPoint: true,
            }
          }
          case 'redeem': {
            const response = await publicClient.readContract({
              address: contract.address,
              abi: contract.abi,
              functionName: 'previewRedeem',
              args: [amountWei, totalSharesWei, totalAssetsWei] as const,
            })
            result = BigInt(response as unknown as string)
            return {
              x: Number(formatEther(result)),
              y: amount,
              previewPoint: true,
            }
          }
        }
      } catch (err) {
        console.error('Error simulating preview:', err)
        return null
      }
    },
    [publicClient],
  )

  const handlePreview = useCallback(
    async (
      type: 'deposit' | 'mint' | 'withdraw' | 'redeem',
      amount: number,
    ) => {
      if (!selectedCurveId || amount <= 0) return

      const contract = deployedContracts.find((c) => c.id === selectedCurveId)
      if (!contract) return

      const previewPoint = await simulatePreview(contract, amount, type)
      if (!previewPoint) return

      setDeployedContracts((prev) =>
        prev.map((c) => {
          if (c.id === selectedCurveId) {
            return {
              ...c,
              previewPoints: [previewPoint],
            }
          }
          return c
        }),
      )
    },
    [selectedCurveId, deployedContracts, simulatePreview],
  )

  // Calculate step size based on current value
  const getStepSize = (value: number) => {
    if (value === 0) return 0.1
    const magnitude = Math.floor(Math.log10(Math.abs(value)))
    return magnitude < 0 ? 0.1 : Math.pow(10, magnitude - 1)
  }

  const formatDisplayValue = (value: bigint) => {
    const floatValue = Number(formatEther(value))
    if (floatValue === 0) return '0'
    if (floatValue < 0.1) return floatValue.toFixed(18).replace(/\.?0+$/, '')
    if (floatValue < 1) return floatValue.toFixed(1)
    if (floatValue < 10) return floatValue.toFixed(1)
    return floatValue.toFixed(0)
  }

  const handleDepositPreview = useCallback((value: string) => {
    // Convert empty string to 0
    if (!value) {
      setDepositAmount(0n)
      return
    }

    const numValue = parseFloat(value)
    if (isNaN(numValue)) return

    setDepositAmount(parseEther(numValue.toString()))
  }, [])

  const handleRedeemPreview = useCallback(
    (value: string) => {
      const amount = parseNumberInput(value)
      setRedeemAmount(amount)
      handlePreview('redeem', Number(formatEther(amount)))
    },
    [handlePreview],
  )

  const regenerateCurves = useCallback(async () => {
    const { min, max } = latestRangeRef.current
    console.log('Regenerating all curves for range:', { min, max })

    const updatedCurves = await Promise.all(
      deployedContracts.map(async (contract) => {
        const points = await generateCurvePoints(
          contract.address,
          contract.abi,
          maxValue,
        )
        return {
          ...contract,
          points: points.map((p) => ({
            ...p,
            totalValue:
              p.x <= Number(formatEther(contract.totalAssets))
                ? p.y
                : undefined,
            userValue:
              p.x <= Number(formatEther(contract.userAssets)) ? p.y : undefined,
          })),
        }
      }),
    )

    setDeployedContracts(updatedCurves)
  }, [deployedContracts, generateCurvePoints, maxValue])

  const handleMinMaxChange = useCallback(
    async (newMin: number, newMax: number) => {
      // Update the ref with the latest values
      latestRangeRef.current = { min: newMin, max: newMax }

      // Clear any pending updates
      if (pendingUpdateRef.current) {
        clearTimeout(pendingUpdateRef.current)
        pendingUpdateRef.current = null
      }

      // Use the latest values from the ref for regeneration
      const points = await Promise.all(
        deployedContracts.map(async (contract) => {
          const newPoints = await generateCurvePoints(
            contract.address,
            contract.abi,
            newMax,
          )
          return {
            ...contract,
            points: newPoints.map((p) => ({
              ...p,
              totalValue:
                p.x <= Number(formatEther(contract.totalAssets))
                  ? p.y
                  : undefined,
              userValue:
                p.x <= Number(formatEther(contract.userAssets))
                  ? p.y
                  : undefined,
            })),
          }
        }),
      )

      setDeployedContracts(points)
    },
    [deployedContracts, generateCurvePoints],
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

  const deployContract = useCallback(
    async (fileId: string, values: Record<string, string>) => {
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

        if (!data.address) {
          setError('No address returned from deployment')
          setPendingDeployment(null)
          setIsDeploying(false)
          return
        }

        console.log('Contract deployed at:', data.address)
        const points = await generateCurvePoints(
          data.address,
          fileData.abi,
          maxValue,
        )

        // Get max values first
        const maxAssets = (await publicClient.readContract({
          address: data.address as `0x${string}`,
          abi: fileData.abi,
          functionName: 'MAX_ASSETS',
        })) as bigint

        const maxShares = (await publicClient.readContract({
          address: data.address as `0x${string}`,
          abi: fileData.abi,
          functionName: 'MAX_SHARES',
        })) as bigint

        setDeployedContracts((prev) => {
          if (prev.some((c) => c.address === data.address)) {
            return prev
          }

          // Create bidirectional mappings between constructor args and contract variables
          const constructorToVariable: Record<string, string> = {}
          const variableToConstructor: Record<string, string> = {}

          fileData.constructorArgs.forEach((arg) => {
            const varName = arg.name.toUpperCase()
            constructorToVariable[arg.name] = varName
            variableToConstructor[varName] = arg.name
          })

          const newContract: DeployedContract = {
            id: data.address,
            name: fileData.file.name.replace('.sol', ''),
            address: data.address as `0x${string}`,
            abi: fileData.abi,
            constructorValues: values,
            constructorToVariable,
            variableToConstructor,
            points,
            color: CURVE_COLORS[prev.length % CURVE_COLORS.length],
            totalAssets: 0n,
            totalShares: 0n,
            userAssets: 0n,
            userShares: 0n,
            maxAssets,
            maxShares,
          }
          return [...prev, newContract]
        })
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to deploy contract',
        )
      } finally {
        setPendingDeployment(null)
        setIsDeploying(false)
      }
    },
    [files, isDeploying, publicClient, generateCurvePoints, maxValue],
  )

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
                totalValue: Number(
                  formatEther(
                    (parseEther(point.y.toString()) * totalAssets) /
                      parseEther('1'),
                  ),
                ),
                userValue: Number(
                  formatEther(
                    (parseEther(point.y.toString()) * curve.userShares) /
                      parseEther('1'),
                  ),
                ),
              })),
            }
          : curve,
      ),
    )
  }, [selectedCurveId, totalAssets, totalShares])

  const handleTotalAssetsChange = useCallback(
    async (newValue: string) => {
      try {
        const parsedValue = parseEther(newValue || '0')
        setTotalAssets(parsedValue)

        // Update deployed contracts
        if (selectedCurveId) {
          setDeployedContracts((prev: DeployedContract[]) =>
            prev.map((c) =>
              c.id === selectedCurveId
                ? {
                    ...c,
                    totalAssets: parsedValue,
                    points: c.points.map((point) => ({
                      ...point,
                      totalValue:
                        point.x <= parseFloat(formatEther(parsedValue))
                          ? point.y
                          : undefined,
                      userValue:
                        point.x <= parseFloat(formatEther(c.userAssets))
                          ? point.y
                          : undefined,
                    })),
                  }
                : c,
            ),
          )
        }
      } catch (err) {
        console.error('Error updating total assets:', err)
      }
    },
    [selectedCurveId, setDeployedContracts],
  )

  const handleTotalSharesChange = useCallback(
    async (newValue: string) => {
      try {
        const parsedValue = parseEther(newValue || '0')
        setTotalShares(parsedValue)

        // Update deployed contracts
        if (selectedCurveId) {
          setDeployedContracts((prev: DeployedContract[]) =>
            prev.map((c) =>
              c.id === selectedCurveId
                ? {
                    ...c,
                    totalShares: parsedValue,
                    points: c.points.map((point) => ({
                      ...point,
                      totalValue:
                        point.x <= parseFloat(formatEther(c.totalAssets))
                          ? point.y
                          : undefined,
                      userValue:
                        point.x <= parseFloat(formatEther(c.userAssets))
                          ? point.y
                          : undefined,
                    })),
                  }
                : c,
            ),
          )
        }
      } catch (err) {
        console.error('Error updating total shares:', err)
      }
    },
    [selectedCurveId, setDeployedContracts],
  )

  const handleDepositAmountChange = useCallback(
    async (amount: number) => {
      if (!selectedCurveId) return
      const curve = deployedContracts.find((c) => c.id === selectedCurveId)
      if (!curve) return

      try {
        if (!amount) {
          setDepositAmount(0n)
          return
        }

        // Convert scientific notation to fixed decimal string
        const fixedAmount = amount.toFixed(18)
        const amountBigInt = parseEther(fixedAmount)
        setDepositAmount(amountBigInt)

        // Preview the deposit with current pool state
        const shares = await publicClient.readContract({
          address: curve.address,
          abi: curve.abi,
          functionName: 'previewDeposit',
          args: [amountBigInt, curve.totalAssets, curve.totalShares] as const,
        })
        const sharesNumber = Number(formatEther(BigInt(shares.toString())))

        setDeployedContracts((prev) =>
          prev.map((c) =>
            c.id === selectedCurveId
              ? {
                  ...c,
                  previewPoints: [
                    {
                      x: Number(formatEther(curve.totalAssets + amountBigInt)),
                      y: sharesNumber,
                      previewPoint: true,
                    },
                  ],
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
          setRedeemAmount(0n)
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
          x: curve.totalAssets - parseEther(assetsNumber.toString()),
          y: curve.totalShares - parseEther(amount.toString()),
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
      // Calculate new shares using previewDeposit with current pool state
      const response = await publicClient.readContract({
        address: curve.address,
        abi: curve.abi,
        functionName: 'previewDeposit',
        args: [depositAmount, curve.totalAssets, curve.totalShares] as const,
      })
      const newShares = BigInt(response as unknown as string)

      // Update user's assets and shares
      setUserAssets((prev) => prev - depositAmount)
      setUserShares((prev) => prev + newShares)

      const newTotalAssets = curve.totalAssets + depositAmount
      const newTotalShares = curve.totalShares + newShares

      // Update all points with new totals and highlight owned portion
      const updatedPoints = curve.points.map((point) => ({
        ...point,
        totalValue:
          point.x <= Number(formatEther(newTotalAssets)) ? point.y : undefined,
        userValue:
          point.x <= Number(formatEther(userAssets - depositAmount))
            ? point.y
            : undefined,
      }))

      setDeployedContracts((prev) =>
        prev.map((c) =>
          c.id === selectedCurveId
            ? {
                ...c,
                totalAssets: newTotalAssets,
                totalShares: newTotalShares,
                previewDeposit: undefined,
                points: updatedPoints,
              }
            : c,
        ),
      )

      setDepositAmount(0n)
      setTotalAssets(newTotalAssets)
      setTotalShares(newTotalShares)
    } catch (err) {
      console.error('Error simulating deposit:', err)
    }
  }, [
    selectedCurveId,
    depositAmount,
    publicClient,
    deployedContracts,
    userAssets,
  ])

  const handleRedeem = useCallback(async () => {
    if (!selectedCurveId || !redeemAmount) return
    const curve = deployedContracts.find((c) => c.id === selectedCurveId)
    if (!curve) return

    try {
      // Calculate assets to return for the shares being redeemed
      const assetsToReturn = (await publicClient.readContract({
        address: curve.address,
        abi: curve.abi,
        functionName: 'previewRedeem',
        args: [redeemAmount, curve.totalShares, curve.totalAssets],
      })) as unknown as bigint

      // Calculate new totals
      const newTotalAssets = curve.totalAssets - assetsToReturn
      const newTotalShares = curve.totalShares - redeemAmount

      // Update all points with new totals and highlight owned portion
      const updatedPoints = curve.points.map((point) => ({
        ...point,
        // Highlight points from 0 to totalAssets
        totalValue:
          point.x <= Number(formatEther(newTotalAssets)) ? point.y : undefined,
        userValue:
          point.x <= Number(formatEther(curve.userAssets - assetsToReturn))
            ? point.y
            : undefined,
      }))

      setDeployedContracts((prev) =>
        prev.map((c) =>
          c.id === selectedCurveId
            ? {
                ...c,
                totalAssets: newTotalAssets,
                totalShares: newTotalShares,
                userAssets: c.userAssets - assetsToReturn,
                userShares: c.userShares - redeemAmount,
                previewRedeem: undefined,
                points: updatedPoints,
              }
            : c,
        ),
      )

      setRedeemAmount(0n)
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
        maxValue,
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

  const handleContractLayout = useCallback(async (layout: ContractLayout) => {
    setContractLayout(layout)
  }, [])

  const handleContractInfo = useCallback(async (info: ContractInfo) => {
    if (!info) {
      setSelectedContract(null)
      return
    }

    // Convert ContractInfo to DeployedContract
    const deployedContract: DeployedContract = {
      id: crypto.randomUUID(),
      name: info.name,
      address: info.address,
      abi: [], // This needs to be populated from somewhere
      constructorValues: info.constructorValues || {},
      constructorToVariable: {},
      variableToConstructor: info.variableToConstructor || {},
      points: [],
      color: 'hsl(var(--primary))',
      totalAssets: 0n,
      totalShares: 0n,
      userAssets: 0n,
      userShares: 0n,
      maxAssets: 0n,
      maxShares: 0n,
    }

    setSelectedContract(deployedContract)
  }, [])

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
                handleMinMaxChange(minValue, newMax).catch(console.error)
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
            data={deployedContracts.map((contract) => ({
              id: contract.id,
              color: contract.color,
              points: contract.points,
              name: contract.name,
              totalAssets: Number(formatEther(contract.totalAssets)),
              totalShares: Number(formatEther(contract.totalShares)),
            }))}
            xLabel="Assets"
            yLabel="Shares"
            totalAssets={
              selectedCurveId ? Number(formatEther(totalAssets)) : undefined
            }
            previewAmount={
              depositAmount > 0n
                ? Number(formatEther(depositAmount))
                : undefined
            }
          />
        </div>

        {selectedCurveId && (
          <>
            <div className="flex justify-between items-center">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label>Total Assets</Label>
                  <Input
                    type="text"
                    value={formatEther(totalAssets).toString()}
                    onChange={(e) => handleTotalAssetsChange(e.target.value)}
                    step={getStepSize(parseFloat(formatEther(totalAssets)))}
                    min="0"
                  />
                </div>
                <div className="flex-1">
                  <Label>Total Shares</Label>
                  <Input
                    type="text"
                    value={formatEther(totalShares).toString()}
                    onChange={(e) => handleTotalSharesChange(e.target.value)}
                    step={getStepSize(parseFloat(formatEther(totalShares)))}
                    min="0"
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
                    value={formatDisplayValue(depositAmount)}
                    onChange={(e) => handleDepositPreview(e.target.value)}
                    step={getStepSize(Number(formatEther(depositAmount)))}
                    min="0"
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
                  type="text"
                  value={formatEther(userAssets)}
                  onChange={(e) =>
                    setUserAssets(parseEther(e.target.value || '0'))
                  }
                />
              </div>
              <div className="flex-1">
                <Label>Your Shares</Label>
                <Input
                  type="text"
                  value={formatEther(userShares)}
                  onChange={(e) =>
                    setUserShares(parseEther(e.target.value || '0'))
                  }
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
