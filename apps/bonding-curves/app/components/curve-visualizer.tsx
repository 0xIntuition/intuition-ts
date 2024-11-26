'use client'

import { useCallback, useEffect, useState } from 'react'

import { useFetcher } from '@remix-run/react'
import { createPublicClient, http, parseEther, toHex } from 'viem'
import { foundry } from 'viem/chains'

import {
  formatConstructorValues,
  parseConstructorArgs,
  type ConstructorArg,
} from '../lib/contract-utils'
import { parseNumberInput } from '../utils/units'
import { ConstructorForm } from './constructor-form'
import { LineChart } from './ui/line-chart'
import {
  Alert,
  AlertDescription,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
} from './ui/ui-components'

interface Point {
  x: number
  y: number
}

interface DeployedCurve {
  id: string
  name: string
  address: `0x${string}`
  abi: any[]
  constructorValues?: string
}

interface CurveData {
  id: string
  name: string
  points: Point[]
  color: string
  constructorValues?: string
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

interface DeployedContract {
  id: string
  name: string
  address: `0x${string}`
  abi: any[]
  constructorValues?: string
  points: Point[]
  color: string
}

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
  const fetcher = useFetcher()

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

      // First compile the contract
      const compileResponse = await fetch('/api/compile', {
        method: 'POST',
        body: formData,
      })
      const compileData = await compileResponse.json()

      if (compileData.error) {
        setError(compileData.error)
        return
      }

      // Store compilation results and file info
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

      // Always show form for confirmation, even with no args
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
      fetcher.submit(deployFormData, {
        method: 'post',
        action: '/api/deploy',
        encType: 'multipart/form-data',
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to deploy contract')
      setPendingDeployment(null)
      setIsDeploying(false)
    }
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

  // Generate curve points when contract is deployed
  const generateCurvePoints = useCallback(
    async (address: string, abi: any[]) => {
      console.log('generating curve points for', address)
      const points: Point[] = []
      const numPoints = 100
      const maxValueWei = parseEther(maxValue.toString())
      const minValueWei = parseEther(minValue.toString())
      const stepWei = (maxValueWei - minValueWei) / BigInt(numPoints)

      for (let i = 0; i <= numPoints; i++) {
        const assets = minValueWei + BigInt(i) * stepWei
        try {
          const shares = await publicClient.readContract({
            address: address as `0x${string}`,
            abi,
            functionName: 'assetsToShares',
            args: [assets, 0n, 0n], // Initial state
          })

          points.push({
            x: Number(assets) / 1e18, // Convert to ETH
            y: Number(shares) / 1e18, // Convert to ETH
          })
        } catch (err) {
          console.error('Error calling contract:', err)
        }
      }

      return points
    },
    [publicClient, minValue, maxValue],
  )

  // Handle ABI response and deployment response
  useEffect(() => {
    if (!fetcher.data || !pendingDeployment || fetcher.state !== 'idle') return

    const data = fetcher.data as AbiResponse | DeployResponse

    if ('address' in data && data.address) {
      const fileData = files.get(pendingDeployment)
      if (!fileData) return

      const contractAddress = data.address as `0x${string}`
      console.log('New contract deployed at:', contractAddress)

      generateCurvePoints(contractAddress, fileData.abi).then((points) => {
        setDeployedContracts((prev) => {
          // Skip if we already have this contract
          // Fetchers are really good at creating bugs because of how they present stale data
          if (prev.some((c) => c.address === contractAddress)) {
            return prev
          }

          const newContract: DeployedContract = {
            id: contractAddress,
            name: fileData.file.name.replace('.sol', ''),
            address: contractAddress,
            abi: fileData.abi,
            constructorValues: formatConstructorValues(constructorValues),
            points,
            color: CURVE_COLORS[prev.length % CURVE_COLORS.length],
          }
          return [...prev, newContract]
        })
        setPendingDeployment(null)
        setIsDeploying(false)
      })
    }

    if ('error' in data && data.error) {
      setError(data.error)
      setPendingDeployment(null)
      setIsDeploying(false)
    }
  }, [
    fetcher.data,
    fetcher.state,
    pendingDeployment,
    files,
    constructorValues,
    generateCurvePoints,
  ])

  const removeCurve = (id: string) => {
    setFiles((prev) => {
      const newMap = new Map(prev)
      newMap.delete(id)
      return newMap
    })
    setDeployedContracts((prev) => prev.filter((c) => c.id !== id))
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Bonding Curve Visualizer</CardTitle>
        <CardDescription>
          Upload and compare multiple bonding curve implementations
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="min-value">Min Value (ETH)</Label>
            <Input
              id="min-value"
              type="number"
              min="0"
              step="0.1"
              value={minValue}
              onChange={(e) => setMinValue(Number(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="max-value">Max Value (ETH)</Label>
            <Input
              id="max-value"
              type="number"
              min="0"
              step="0.1"
              value={maxValue}
              onChange={(e) => setMaxValue(Number(e.target.value))}
            />
          </div>
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="curve-file">Add Curve Implementation</Label>
          <div className="flex gap-2">
            <Input
              id="curve-file"
              type="file"
              accept=".sol"
              onChange={handleFileChange}
            />
          </div>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {deployedContracts.length > 0 && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {deployedContracts.map((contract) => (
                <div
                  key={contract.id}
                  className="flex items-center gap-2 rounded-md border border-border bg-card p-2"
                >
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: contract.color }}
                  />
                  <span>
                    {contract.name}
                    {contract.constructorValues && (
                      <span className="text-sm text-muted-foreground">
                        {' '}
                        ({contract.constructorValues})
                      </span>
                    )}
                  </span>
                  <Button
                    className="h-6 w-6 p-0"
                    onClick={() => removeCurve(contract.id)}
                  >
                    ×
                  </Button>
                </div>
              ))}
            </div>
            <div className="h-[400px] w-full">
              <LineChart
                data={deployedContracts}
                xLabel="Assets (ETH)"
                yLabel="Shares (ETH)"
                title="Bonding Curves Comparison"
              />
            </div>
          </div>
        )}
      </CardContent>

      {selectedFileId && (
        <ConstructorForm
          isOpen={true}
          onClose={() => setSelectedFileId(null)}
          onSubmit={handleConstructorSubmit}
          args={files.get(selectedFileId)?.constructorArgs || []}
          fileName={files.get(selectedFileId)?.file.name || ''}
        />
      )}
    </Card>
  )
}
