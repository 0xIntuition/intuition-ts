'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import { Button, Input, Label, Text } from '@0xintuition/1ui'

import { generateCurvePoints } from '~/lib/curveUtils'
import html2canvas from 'html2canvas'
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
import { ColorPicker } from './ui/color-picker'
import { LineChart } from './ui/line-chart'
import { SpinButton } from './ui/number-input'

interface Point {
  x: number
  y: number
  totalValue?: number
  userValue?: number
  previewPoint?: boolean
  previewValue?: number
  isRedeem?: boolean
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
  previewPoints?: Point[]
  scaledPreviewAmount?: bigint
  scaledTotalAssets?: bigint
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
  'hsl(221.2 83.2% 53.3%)' /* Primary blue */,
  'hsl(142.1 76.2% 36.3%)' /* Forest green */,
  'hsl(346.8 77.2% 49.8%)' /* Rose red */,
  'hsl(43.3 96.4% 56.3%)' /* Golden yellow */,
  'hsl(262.1 83.3% 57.8%)' /* Royal purple */,
  'hsl(20.5 90.2% 48.2%)' /* Burnt orange */,
  'hsl(189.5 94.5% 42.7%)' /* Turquoise */,
  'hsl(283.4 67.1% 50.4%)' /* Magenta */,
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

  // Add new state for color picker
  const [colorPickerOpen, setColorPickerOpen] = useState(false)

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

  const simulatePreview = useCallback(
    async (
      contract: DeployedContract,
      amount: number,
      type: 'deposit' | 'mint' | 'withdraw' | 'redeem',
    ) => {
      const amountWei = parseEther(amount.toFixed(18))
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
            return {
              x: Number(formatEther(totalAssetsWei + amountWei)),
              y: Number(formatEther(totalSharesWei + result)),
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
            const previewPoint = {
              x: Number(formatEther(totalAssetsWei - result)),
              y: Number(formatEther(totalSharesWei - amountWei)),
              previewPoint: true,
            }
            console.log('Redeem preview calculation:', {
              totalAssetsWei: totalAssetsWei.toString(),
              totalSharesWei: totalSharesWei.toString(),
              amountWei: amountWei.toString(),
              result: result.toString(),
              previewPoint,
            })
            return previewPoint
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
    async (type: 'deposit' | 'redeem', amountWei: bigint) => {
      if (!selectedCurveId) return
      const contract = deployedContracts.find((c) => c.id === selectedCurveId)
      if (!contract) return

      try {
        const previewPoints = await simulatePreview(
          contract,
          Number(formatEther(amountWei)),
          type,
        )
        if (!previewPoints) {
          console.log('No previewPoints generated')
          return
        }

        setDeployedContracts((prev) =>
          prev.map((c) => {
            if (c.id === selectedCurveId) {
              const totalAssetsNum = Number(formatEther(c.totalAssets))
              const totalSharesNum = Number(formatEther(c.totalShares))
              console.log('Current totals:', { totalAssetsNum, totalSharesNum })

              // For redeem, we want to use the assets we'll get back
              const previewAmount =
                type === 'redeem'
                  ? parseEther((totalAssetsNum - previewPoints.x).toFixed(18))
                  : amountWei

              return {
                ...c,
                previewPoints: [
                  {
                    x: totalAssetsNum,
                    y: totalSharesNum,
                    previewPoint: true,
                    isRedeem: type === 'redeem',
                  },
                  previewPoints && {
                    x: previewPoints.x,
                    y: previewPoints.y,
                    previewPoint: true,
                    isRedeem: type === 'redeem',
                  },
                ],
                scaledPreviewAmount: previewAmount,
                scaledTotalAssets: c.totalAssets,
              }
            }
            return c
          }),
        )
      } catch (err) {
        console.error('Error in handlePreview:', err)
      }
    },
    [selectedCurveId, deployedContracts, simulatePreview],
  )

  const parseInputValue = (value: string): bigint => {
    // Remove any units from the input
    const cleanValue = value.replace(/\s*(?:wei|ETH)$/, '')

    // If the value contains a decimal point or is in scientific notation, treat as ETH
    if (cleanValue.includes('.') || cleanValue.includes('e')) {
      // Convert scientific notation to fixed decimal string
      const num = Number(cleanValue)
      if (isNaN(num)) return 0n
      const fixedStr = num.toFixed(18)
      return parseEther(fixedStr)
    }

    // Otherwise treat as wei
    try {
      return BigInt(cleanValue)
    } catch {
      return 0n
    }
  }

  const handleDepositPreview = useCallback(
    (value: string) => {
      // Convert empty string to 0
      if (!value) {
        setDepositAmount(() => 0n)
        setRedeemAmount(() => 0n) // Clear redeem preview
        return
      }

      // Keep as ETH value (decimal) until we need to convert to wei
      const ethValue = parseFloat(value) || 0
      const weiValue = parseEther(ethValue.toFixed(18))
      setDepositAmount(() => weiValue)
      setRedeemAmount(() => 0n) // Clear redeem preview
      handlePreview('deposit', weiValue)
    },
    [handlePreview],
  )

  const handleRedeemPreview = useCallback(
    async (value: string) => {
      console.log('handleRedeemPreview called with value:', value)
      // Convert empty string to 0
      if (!value) {
        setRedeemAmount(() => 0n)
        setDepositAmount(() => 0n) // Clear deposit preview
        return
      }

      // Keep as ETH value (decimal) until we need to convert to wei
      const ethValue = parseFloat(value) || 0
      const weiValue = parseEther(ethValue.toFixed(18))
      console.log('Parsed amount:', weiValue.toString())
      setRedeemAmount(weiValue)
      setDepositAmount(() => 0n) // Clear deposit preview
      await handlePreview('redeem', weiValue)
    },
    [handlePreview],
  )

  // Calculate step size based on current value and total
  const getStepSize = (
    value: number,
    total: number,
    isRedeem: boolean = false,
  ) => {
    if (isRedeem) {
      // For redeem, work directly with wei values
      // Use 0.1% of total shares as step
      return Number(totalShares / 1000n)
    }

    // For deposits, continue with ETH values
    if (value === 0) {
      return Math.max(0.001, total * 0.001)
    }
    return Math.max(0.001, total * 0.001)
  }

  const formatDisplayValue = (value: bigint, includeUnits: boolean = true) => {
    // If value is 0, just return "0"
    if (value === 0n) return '0'

    // If value is less than 0.0001 ETH (100000000000000 wei), show in wei
    if (value < parseEther('0.0001')) {
      return `${value.toString()}${includeUnits ? ' wei' : ''}`
    }

    // Otherwise show in ETH with appropriate decimal places
    const ethValue = Number(formatEther(value))
    if (ethValue < 0.1) {
      // Show more decimals for very small numbers
      const str = ethValue.toFixed(18).replace(/\.?0+$/, '')
      return `${str}${includeUnits ? ' ETH' : ''}`
    }
    if (ethValue < 1) {
      const str = ethValue.toFixed(6)
      return `${str}${includeUnits ? ' ETH' : ''}`
    }
    if (ethValue < 10) {
      const str = ethValue.toFixed(4)
      return `${str}${includeUnits ? ' ETH' : ''}`
    }
    const str = ethValue.toFixed(2)
    return `${str}${includeUnits ? ' ETH' : ''}`
  }

  const regenerateCurves = useCallback(async () => {
    const { min, max } = latestRangeRef.current
    console.log('Regenerating all curves for range:', { min, max })

    const updatedCurves = await Promise.all(
      deployedContracts.map(async (contract) => {
        const points = await generateCurvePoints(
          contract.address,
          contract.abi,
          maxValue,
          publicClient,
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
  }, [deployedContracts, generateCurvePoints, maxValue, publicClient])

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
            publicClient,
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
    [deployedContracts, generateCurvePoints, publicClient],
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
          publicClient,
        )

        // Get max values first
        const maxAssets = await publicClient
          .readContract({
            address: data.address as `0x${string}`,
            abi: fileData.abi,
            functionName: 'MAX_ASSETS',
            args: [] as const,
          })
          .then((result) => BigInt(result as unknown as string))

        const maxShares = await publicClient
          .readContract({
            address: data.address as `0x${string}`,
            abi: fileData.abi,
            functionName: 'MAX_SHARES',
            args: [] as const,
          })
          .then((result) => BigInt(result as unknown as string))

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
      const newShares = BigInt(response.toString())

      // Update user's assets and shares
      const newUserAssets = userAssets - depositAmount
      const newUserShares = userShares + newShares
      setUserAssets(newUserAssets)
      setUserShares(newUserShares)

      // Since user is the only one who can mint shares, total shares should match user shares
      const newTotalAssets = curve.totalAssets + depositAmount
      const newTotalShares = newUserShares // Set total shares to match user shares
      setTotalAssets(newTotalAssets)
      setTotalShares(newTotalShares)

      // Update all points with new totals
      const updatedPoints = curve.points.map((point) => ({
        ...point,
        totalValue:
          point.x <= Number(formatEther(newTotalAssets)) ? point.y : undefined,
        userValue:
          point.x <= Number(formatEther(newUserAssets)) ? point.y : undefined,
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
                previewPoints: undefined,
                points: updatedPoints,
              }
            : c,
        ),
      )

      // Clear deposit amount
      setDepositAmount(0n)
    } catch (err) {
      console.error('Error executing deposit:', err)
    }
  }, [
    selectedCurveId,
    depositAmount,
    publicClient,
    deployedContracts,
    userAssets,
    userShares,
  ])

  const handleRedeem = useCallback(async () => {
    if (!selectedCurveId || !redeemAmount) return
    const curve = deployedContracts.find((c) => c.id === selectedCurveId)
    if (!curve) return

    try {
      // Calculate assets to return for the shares being redeemed
      const assetsToReturn = await publicClient.readContract({
        address: curve.address,
        abi: curve.abi,
        functionName: 'previewRedeem',
        args: [redeemAmount, curve.totalShares, curve.totalAssets] as const,
      })
      const assetsToReturnBigInt = BigInt(assetsToReturn.toString())

      // Update user's assets and shares
      const newUserAssets = userAssets + assetsToReturnBigInt
      const newUserShares = userShares - redeemAmount
      setUserAssets(newUserAssets)
      setUserShares(newUserShares)

      // Since user is the only one who can mint shares, total shares should match user shares
      const newTotalAssets = curve.totalAssets - assetsToReturnBigInt
      const newTotalShares = newUserShares // Set total shares to match user shares
      setTotalAssets(newTotalAssets)
      setTotalShares(newTotalShares)

      // Update all points with new totals
      const updatedPoints = curve.points.map((point) => ({
        ...point,
        totalValue:
          point.x <= Number(formatEther(newTotalAssets)) ? point.y : undefined,
        userValue:
          point.x <= Number(formatEther(newUserAssets)) ? point.y : undefined,
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
                previewPoints: undefined,
                points: updatedPoints,
              }
            : c,
        ),
      )

      // Clear redeem amount
      setRedeemAmount(0n)
    } catch (err) {
      console.error('Error executing redeem:', err)
    }
  }, [
    selectedCurveId,
    redeemAmount,
    publicClient,
    deployedContracts,
    userAssets,
    userShares,
  ])

  const handleContractLayout = useCallback(async (layout: ContractLayout) => {
    setContractLayout(layout)
  }, [])

  const handleContractInfo = useCallback(async (info: ContractInfo) => {
    setContractInfo(info)
  }, [])

  const handleVariableChange = useCallback(
    async (variable: StorageVariable, newValue: string) => {
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

        // Update the contract layout
        const layout = await getContractLayout(
          selectedContract.address,
          selectedContract.abi,
          publicClient,
        )
        handleContractLayout(layout)

        // Update the contract info
        const info = {
          address: selectedContract.address,
          name: selectedContract.name,
          variables: layout.variables,
          constructorValues: selectedContract.constructorValues,
          variableToConstructor: selectedContract.variableToConstructor,
        }
        handleContractInfo(info)
      } catch (err) {
        console.error('Failed to update variable:', err)
        setError(
          err instanceof Error ? err.message : 'Failed to update variable',
        )
      }
    },
    [publicClient, selectedContract, handleContractLayout, handleContractInfo],
  )

  // Add handleColorChange function
  const handleColorChange = useCallback(
    (color: string) => {
      if (!selectedCurveId) return

      setDeployedContracts((prev) =>
        prev.map((curve) =>
          curve.id === selectedCurveId
            ? {
                ...curve,
                color,
              }
            : curve,
        ),
      )
    },
    [selectedCurveId],
  )

  const handleScreenshot = useCallback(async () => {
    const contentArea = document.querySelector<HTMLDivElement>(
      '.flex.flex-col.gap-4 > .flex.flex-col.gap-4.rounded-lg.border.border-border.p-4',
    )
    if (!contentArea) return

    try {
      const rect = contentArea.getBoundingClientRect()
      const appBg = window.getComputedStyle(document.body).backgroundColor

      // Render at 8x scale
      const scale = 8
      const canvas = await html2canvas(contentArea, {
        backgroundColor: 'transparent',
        scale: scale,
        logging: false,
        useCORS: true,
        allowTaint: true,
        foreignObjectRendering: true,
        width: rect.width + scale, // scale of 1 is off by 1 px
        height: rect.height + scale,
        x: -rect.left,
        y: -rect.top,
        onclone: (clonedDoc) => {
          const clonedContent = clonedDoc.querySelector<HTMLElement>(
            '.flex.flex-col.gap-4 > .flex.flex-col.gap-4.rounded-lg.border.border-border.p-4',
          )
          if (clonedContent) {
            // Set the background color on the content area
            clonedContent.style.backgroundColor = appBg
            clonedContent.style.position = 'relative'
            clonedContent.style.width = `${rect.width}px`
            clonedContent.style.height = `${rect.height}px`

            // Fix Browse button styling
            const fileInput = clonedContent.querySelector('input[type="file"]')
            if (fileInput instanceof HTMLElement) {
              fileInput.style.opacity = '1'
              fileInput.style.cursor = 'pointer'
            }

            // Ensure all child elements maintain their positions
            clonedContent.querySelectorAll('*').forEach((el) => {
              if (el instanceof HTMLElement) {
                const originalEl = document.querySelector(
                  `[data-testid="${el.dataset.testid}"]`,
                )
                if (originalEl) {
                  const originalRect = originalEl.getBoundingClientRect()
                  const relativeTop = originalRect.top - rect.top
                  const relativeLeft = originalRect.left - rect.left
                  el.style.position = 'absolute'
                  el.style.top = `${relativeTop}px`
                  el.style.left = `${relativeLeft}px`
                }
              }
            })

            // Make tooltips visible
            clonedContent
              .querySelectorAll('[role="tooltip"]')
              .forEach((tooltip) => {
                if (tooltip instanceof HTMLElement) {
                  tooltip.style.visibility = 'visible'
                  tooltip.style.opacity = '1'
                  tooltip.style.display = 'block'
                }
              })

            // Ensure SVG elements are visible
            clonedContent.querySelectorAll('svg').forEach((svg) => {
              if (svg instanceof SVGElement) {
                svg.style.visibility = 'visible'
                svg.style.opacity = '1'
              }
            })
          }
        },
      })

      // Create a new canvas at 2x scale for the final output
      const finalScale = 2
      const outputCanvas = document.createElement('canvas')
      outputCanvas.width = rect.width * finalScale
      outputCanvas.height = rect.height * finalScale
      const ctx = outputCanvas.getContext('2d')

      if (ctx) {
        // Enable image smoothing for better antialiasing
        ctx.imageSmoothingEnabled = true
        ctx.imageSmoothingQuality = 'high'

        // Draw the high-res canvas onto the smaller output canvas
        ctx.drawImage(
          canvas,
          0,
          0,
          canvas.width,
          canvas.height,
          0,
          0,
          outputCanvas.width,
          outputCanvas.height,
        )
      }

      // Use the downscaled canvas for the blob
      outputCanvas.toBlob(async (blob) => {
        if (!blob) return
        try {
          await navigator.clipboard.write([
            new ClipboardItem({
              'image/png': blob,
            }),
          ])
        } catch (err) {
          console.error('Error copying to clipboard:', err)
        }
      }, 'image/png')
    } catch (err) {
      console.error('Error creating screenshot:', err)
    }
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
      <div className="flex justify-between items-center">
        <div></div>
        <Button onClick={handleScreenshot}>Copy to Clipboard</Button>
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
              previewPoints: contract.previewPoints,
              scaledPreviewAmount: contract.scaledPreviewAmount,
              scaledTotalAssets: contract.scaledTotalAssets,
            }))}
            xLabel="Assets"
            yLabel="Shares"
            totalAssets={
              selectedCurveId ? Number(formatEther(totalAssets)) : undefined
            }
            previewAmount={
              selectedCurveId && (depositAmount > 0n || redeemAmount > 0n)
                ? Number(
                    formatEther(
                      deployedContracts.find((c) => c.id === selectedCurveId)
                        ?.scaledPreviewAmount || 0n,
                    ),
                  )
                : undefined
            }
            selectedCurveId={selectedCurveId || undefined}
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
                    value={formatDisplayValue(totalAssets)}
                    onChange={(e) => {
                      const value = parseInputValue(e.target.value)
                      setTotalAssets(value)
                      handleTotalAssetsChange(e.target.value)
                    }}
                  />
                </div>
                <div className="flex-1">
                  <Label>Total Shares</Label>
                  <Input
                    type="text"
                    value={formatDisplayValue(totalShares)}
                    onChange={(e) => {
                      const value = parseInputValue(e.target.value)
                      setTotalShares(value)
                      handleTotalSharesChange(e.target.value)
                    }}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={() => setColorPickerOpen(true)}>Color</Button>
                <Button onClick={handleEditCurve}>Edit Curve</Button>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <Label>Deposit Amount (ETH)</Label>
                <div className="flex gap-2">
                  <SpinButton
                    value={formatDisplayValue(depositAmount, false)}
                    onChange={(value) => {
                      // Always treat input as ETH
                      const ethValue = parseFloat(value) || 0
                      const weiValue = parseEther(ethValue.toFixed(18))
                      setDepositAmount(weiValue)
                      handleDepositPreview(ethValue.toString())
                    }}
                    min="0"
                    step={getStepSize(
                      Number(formatEther(depositAmount)),
                      Number(formatEther(totalAssets)),
                    ).toString()}
                  />
                  <Button onClick={handleDeposit}>Deposit</Button>
                </div>
              </div>
              <div className="flex-1">
                <Label>Redeem Amount (Shares)</Label>
                <div className="flex gap-2">
                  <SpinButton
                    value={redeemAmount.toString()}
                    onChange={(value) => {
                      console.log('Redeem SpinButton onChange:', value)
                      // Always treat input as wei since we're dealing with shares
                      const weiValue = BigInt(Math.floor(parseFloat(value)))
                      console.log('Setting redeem amount:', {
                        value,
                        weiValue: weiValue.toString(),
                      })
                      setRedeemAmount(weiValue)
                      handleRedeemPreview(formatEther(weiValue))
                    }}
                    min="0"
                    max={userShares.toString()}
                    step={(totalShares / 1000n).toString()}
                  />
                  <Button onClick={handleRedeem}>Redeem</Button>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <Label>Your Assets</Label>
                <Input
                  type="text"
                  value={formatDisplayValue(userAssets)}
                  onChange={(e) =>
                    setUserAssets(
                      parseEther(
                        e.target.value.replace(/\s*(?:wei|ETH)$/, '') || '0',
                      ),
                    )
                  }
                />
              </div>
              <div className="flex-1">
                <Label>Your Shares</Label>
                <Input
                  type="text"
                  value={formatDisplayValue(userShares)}
                  onChange={(e) =>
                    setUserShares(
                      parseEther(
                        e.target.value.replace(/\s*(?:wei|ETH)$/, '') || '0',
                      ),
                    )
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
                constructorValues: selectedContract.constructorValues,
                variableToConstructor: selectedContract.variableToConstructor,
              }
            : null
        }
        onVariableChange={handleVariableChange}
      />

      <ColorPicker
        isOpen={colorPickerOpen}
        onClose={() => setColorPickerOpen(false)}
        onColorSelect={handleColorChange}
        currentColor={
          deployedContracts.find((c) => c.id === selectedCurveId)?.color ||
          CURVE_COLORS[0]
        }
      />
    </div>
  )
}
