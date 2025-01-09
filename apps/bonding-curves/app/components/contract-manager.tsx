import { useState } from 'react'

import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@0xintuition/1ui'

import { ethers } from 'ethers'

interface ContractState {
  address: string
  name: string
}

export function ContractManager() {
  const [contracts, setContracts] = useState<ContractState[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedTab, setSelectedTab] = useState('linear')
  const [customParams, setCustomParams] = useState({
    scale: '2',
    offset: '1',
    name: '',
  })

  const deployLinearCurve = async () => {
    setLoading(true)
    setError(null)
    try {
      const provider = new ethers.JsonRpcProvider('http://localhost:8545')
      const signer = await provider.getSigner()

      // Import factory dynamically to avoid build issues
      const { LinearCurve__factory } = await import('../typechain-types')
      const factory = new LinearCurve__factory(signer)

      const contract = await factory.deploy(customParams.name || 'Linear Curve')
      await contract.waitForDeployment()

      const address = await contract.getAddress()
      setContracts((prev) => [...prev, { address, name: 'Linear Curve' }])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to deploy contract')
    } finally {
      setLoading(false)
    }
  }

  const deployLogarithmicCurve = async () => {
    setLoading(true)
    setError(null)
    try {
      const provider = new ethers.JsonRpcProvider('http://localhost:8545')
      const signer = await provider.getSigner()

      const { LogarithmicCurve__factory } = await import('../typechain-types')
      const factory = new LogarithmicCurve__factory(signer)

      const scale = ethers.parseUnits(customParams.scale, 18)
      const offset = BigInt(customParams.offset)
      const name =
        customParams.name ||
        `Logarithmic Curve (${customParams.scale}e18, ${customParams.offset})`

      const contract = await factory.deploy(scale, offset, name)
      await contract.waitForDeployment()

      const address = await contract.getAddress()
      setContracts((prev) => [...prev, { address, name: 'Logarithmic Curve' }])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to deploy contract')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Bonding Curve Deployment</CardTitle>
        <CardDescription>
          Deploy and manage bonding curve contracts
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList>
            <TabsTrigger value="linear">Linear Curve</TabsTrigger>
            <TabsTrigger value="logarithmic">Logarithmic Curve</TabsTrigger>
          </TabsList>

          <TabsContent value="linear" className="space-y-4">
            <div className="space-y-2">
              <Label>Curve Name (Optional)</Label>
              <Input
                placeholder="Enter curve name"
                value={customParams.name}
                onChange={(e) =>
                  setCustomParams((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>
            <Button
              onClick={deployLinearCurve}
              disabled={loading}
              className="w-full"
            >
              {loading ? 'Deploying...' : 'Deploy Linear Curve'}
            </Button>
          </TabsContent>

          <TabsContent value="logarithmic" className="space-y-4">
            <div className="space-y-2">
              <Label>Scale (in ETH)</Label>
              <Input
                type="number"
                value={customParams.scale}
                onChange={(e) =>
                  setCustomParams((prev) => ({
                    ...prev,
                    scale: e.target.value,
                  }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Offset</Label>
              <Input
                type="number"
                value={customParams.offset}
                onChange={(e) =>
                  setCustomParams((prev) => ({
                    ...prev,
                    offset: e.target.value,
                  }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Curve Name (Optional)</Label>
              <Input
                placeholder="Enter curve name"
                value={customParams.name}
                onChange={(e) =>
                  setCustomParams((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>
            <Button
              onClick={deployLogarithmicCurve}
              disabled={loading}
              className="w-full"
            >
              {loading ? 'Deploying...' : 'Deploy Logarithmic Curve'}
            </Button>
          </TabsContent>
        </Tabs>

        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {contracts.length > 0 && (
          <div className="mt-6 space-y-4">
            <h3 className="font-medium">Deployed Contracts</h3>
            {contracts.map((contract, index) => (
              <div key={index} className="p-4 border rounded">
                <p className="font-medium">{contract.name}</p>
                <p className="text-sm text-muted-foreground break-all">
                  {contract.address}
                </p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
