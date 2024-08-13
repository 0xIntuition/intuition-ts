import { useEffect, useRef, useState } from 'react'

import {
  Button,
  ButtonSize,
  ButtonVariant,
  Input,
  Label,
  Text,
  TextVariant,
} from '@0xintuition/1ui'

import { invariant } from '@lib/utils/misc'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { useFetcher } from '@remix-run/react'
import { requireUserWallet } from '@server/auth'

export async function loader({ request }: LoaderFunctionArgs) {
  const wallet = await requireUserWallet(request)
  invariant(wallet, 'User wallet is required')
  return json({ message: 'Ready to reconcile positions' })
}

interface ReconcileResult {
  id: string
  success: boolean
  error?: string
}

export default function ReconcilePositions() {
  const fetcher = useFetcher()
  const [status, setStatus] = useState('Idle')
  const [progress, setProgress] = useState(0)
  const [results, setResults] = useState<ReconcileResult[]>([])
  const [totalPositions, setTotalPositions] = useState(0)
  const abortControllerRef = useRef<AbortController | null>(null)
  const [singleId, setSingleId] = useState('')

  useEffect(() => {
    if (fetcher.data) {
      try {
        const { totalPositions, results } =
          typeof fetcher.data === 'string'
            ? JSON.parse(fetcher.data)
            : fetcher.data
        setTotalPositions(totalPositions)
        setResults(results)
        setProgress(100)
        setStatus('Reconciliation complete')
      } catch (error) {
        console.error('Error parsing fetcher data:', error)
        setStatus('Error processing results')
      }
    }
  }, [fetcher.data])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    abortControllerRef.current = new AbortController()
    setStatus('Reconciling positions...')
    setResults([])
    setProgress(0)
    setTotalPositions(0)
    fetcher.submit(formData, {
      method: 'post',
      action: '/actions/reconcile-positions',
    })
  }

  const handleSingleIdSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData()
    formData.append('singleId', singleId)
    setStatus('Reconciling single position...')
    setResults([])
    setProgress(0)
    setTotalPositions(1)
    fetcher.submit(formData, {
      method: 'post',
      action: '/actions/reconcile-positions',
    })
  }

  const handleCancel = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
      setStatus('Reconciliation cancelled')
    }
  }

  return (
    <div className="max-w-7xl h-full p-8">
      <h1 className="text-2xl font-bold mb-4">Reconcile Positions</h1>
      <div className="flex flex-col gap-4 mb-4">
        <div className="flex-1 theme-border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2">
            Reconcile Multiple Positions
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <Label htmlFor="timestamp" hidden>
                Select date and time to reconcile from:
              </Label>
              <Text variant={TextVariant.body}>
                Select date and time to reconcile from:
              </Text>
              <div className="flex flex-row gap-4 items-center">
                <Input
                  type="datetime-local"
                  id="timestamp"
                  name="timestamp"
                  required
                />
                <Button
                  variant={ButtonVariant.secondary}
                  size={ButtonSize.lg}
                  type="submit"
                  disabled={fetcher.state === 'loading'}
                >
                  Start Reconciliation
                </Button>
              </div>
            </div>
          </form>
        </div>
        <div className="flex-1 theme-border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2">
            Reconcile Single Position
          </h2>
          <form onSubmit={handleSingleIdSubmit}>
            <div className="flex flex-col gap-2">
              <Label htmlFor="singleId" hidden>
                Enter position ID:
              </Label>
              <Text variant={TextVariant.body}>Enter position ID:</Text>
              <div className="flex flex-row gap-4 items-center">
                <Input
                  type="text"
                  id="singleId"
                  value={singleId}
                  onChange={(e) => setSingleId(e.target.value)}
                  required
                />
                <Button
                  variant={ButtonVariant.secondary}
                  size={ButtonSize.lg}
                  type="submit"
                  disabled={fetcher.state === 'loading'}
                >
                  Reconcile Single Position
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="flex flex-col gap-6 mb-4">
        <Text variant={TextVariant.bodyLarge}>Status: {status}</Text>
        <div className="w-full bg-muted rounded-full h-2.5 mt-2">
          <div
            className="bg-for h-2.5 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <Text variant={TextVariant.bodyLarge}>Progress: {progress}%</Text>
        <Button
          variant={ButtonVariant.destructive}
          className="w-40"
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </div>
      {results.length > 0 && (
        <div>
          <Text variant={TextVariant.headline}>Results:</Text>
          <Text variant={TextVariant.body}>
            Total positions: {totalPositions}
          </Text>
          <div className="mt-4 max-h-96 overflow-y-auto">
            <ul className="list-disc pl-5">
              {results.map((result, index) => (
                <li key={index}>
                  <Text
                    variant={TextVariant.body}
                    className={
                      result.success ? 'text-success' : 'text-desctructive'
                    }
                  >
                    Position {result.id}:{' '}
                    {result.success ? 'Reconciled' : `Failed - ${result.error}`}
                  </Text>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
