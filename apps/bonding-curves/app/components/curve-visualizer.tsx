'use client'

import { useCallback, useEffect, useState } from 'react'

import { useFetcher } from '@remix-run/react'
import { createPublicClient, http, parseEther } from 'viem'
import { foundry } from 'viem/chains'

import {
  formatConstructorValues,
  parseConstructorArgs,
  prepareConstructorArgs,
  type ConstructorArg,
} from '../lib/contract-utils'
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

interface CurveData {
  id: string
  name: string
  points: Point[]
  color: string
  constructorValues?: string
}

interface FileData {
  file: File
  constructorArgs: ConstructorArg[]
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
  const [curves, setCurves] = useState<CurveData[]>([])
  const [error, setError] = useState<string | null>(null)
  const [minValue, setMinValue] = useState<number>(0)
  const [maxValue, setMaxValue] = useState<number>(10)
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null)
  const [pendingDeployment, setPendingDeployment] = useState<string | null>(
    null,
  )
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
      // Read file content to get ABI
      const content = await file.text()
      const formData = new FormData()
      formData.append('file', file)
      formData.append('content', content)
      formData.append('getAbiOnly', 'true')

      // Get ABI from server using Remix fetcher
      fetcher.submit(formData, {
        method: 'post',
        action: '/api/compile-and-deploy',
        encType: 'multipart/form-data',
      })

      // Store file info for later use
      const newId = crypto.randomUUID()
      setFiles((prevFiles) => {
        const newFiles = new Map(prevFiles)
        newFiles.set(newId, {
          file,
          constructorArgs: [],
        })
        return newFiles
      })
      setSelectedFileId(newId)
      setError(null)
    } catch (err) {
      console.error('Error processing file:', err)
      setError(err instanceof Error ? err.message : 'Failed to parse contract')
    }

    // Clear the input to allow reloading the same file
    event.target.value = ''
  }

  const removeCurve = (id: string) => {
    setFiles((prevFiles) => {
      const newFiles = new Map(prevFiles)
      newFiles.delete(id)
      return newFiles
    })
    setCurves((prevCurves) => prevCurves.filter((curve) => curve.id !== id))
  }

  const handleConstructorSubmit = async (values: Record<string, string>) => {
    if (!selectedFileId) return
    setConstructorValues(values)
    setPendingDeployment(selectedFileId)
    setSelectedFileId(null)
    await compileAndDeploy(selectedFileId, values)
  }

  const compileAndDeploy = useCallback(
    async (fileId: string, constructorValues: Record<string, string>) => {
      const fileData = files.get(fileId)
      if (!fileData) return

      try {
        const content = await fileData.file.text()
        const formData = new FormData()
        formData.append('file', fileData.file)
        formData.append('content', content)
        formData.append(
          'constructorArgs',
          JSON.stringify({
            args: fileData.constructorArgs,
            values: constructorValues,
          }),
        )

        fetcher.submit(formData, {
          method: 'post',
          action: '/api/compile-and-deploy',
          encType: 'multipart/form-data',
        })
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        setPendingDeployment(null)
      }
    },
    [files, fetcher],
  )

  // Generate curve points when contract is deployed
  const generateCurvePoints = useCallback(
    async (address: string, fileId: string) => {
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
            abi: [
              {
                inputs: [
                  { name: 'assets', type: 'uint256' },
                  { name: 'totalShares', type: 'uint256' },
                  { name: 'totalAssets', type: 'uint256' },
                ],
                name: 'assetsToShares',
                outputs: [{ name: 'shares', type: 'uint256' }],
                stateMutability: 'view',
                type: 'function',
              },
            ],
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
    if (!fetcher.data) return

    const data = fetcher.data as AbiResponse | DeployResponse

    // Handle ABI response
    if ('abi' in data && selectedFileId) {
      console.log('Received ABI:', data.abi)
      const constructorArgs = parseConstructorArgs(data.abi)

      setFiles((prev) => {
        const fileData = prev.get(selectedFileId)
        if (!fileData) return prev

        const newMap = new Map(prev)
        newMap.set(selectedFileId, {
          ...fileData,
          constructorArgs,
        })
        return newMap
      })
    }

    // Handle deployment response
    if ('address' in data && pendingDeployment && data.address) {
      const fileData = files.get(pendingDeployment)
      if (!fileData) return

      generateCurvePoints(data.address, pendingDeployment).then((points) => {
        setCurves((prevCurves) => {
          // Check for duplicates and remove old version if it exists
          const filteredCurves = prevCurves.filter(
            (curve) => curve.id !== pendingDeployment,
          )
          return [
            ...filteredCurves,
            {
              id: pendingDeployment,
              name: fileData.file.name.replace('.sol', ''),
              points,
              color: CURVE_COLORS[filteredCurves.length % CURVE_COLORS.length],
              constructorValues: formatConstructorValues(constructorValues),
            },
          ]
        })
        setPendingDeployment(null)
      })
    }

    if ('error' in data && data.error) {
      setError(data.error)
      setPendingDeployment(null)
      setSelectedFileId(null)
    }
  }, [
    fetcher.data,
    selectedFileId,
    pendingDeployment,
    files,
    constructorValues,
    compileAndDeploy,
    generateCurvePoints,
  ])

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

        {curves.length > 0 && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {curves.map((curve) => (
                <div
                  key={curve.id}
                  className="flex items-center gap-2 rounded-md border border-border bg-card p-2"
                >
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: curve.color }}
                  />
                  <span>
                    {curve.name}
                    {curve.constructorValues && (
                      <span className="text-sm text-muted-foreground">
                        {' '}
                        ({curve.constructorValues})
                      </span>
                    )}
                  </span>
                  <Button
                    className="h-6 w-6 p-0"
                    onClick={() => removeCurve(curve.id)}
                  >
                    ×
                  </Button>
                </div>
              ))}
            </div>
            <div className="h-[400px] w-full">
              <LineChart
                data={curves}
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
