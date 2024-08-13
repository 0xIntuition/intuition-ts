import { useEffect, useRef, useState } from 'react'

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

  const handleCancel = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
      setStatus('Reconciliation cancelled')
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Reconcile Positions</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-4">
          <label htmlFor="timestamp" className="block mb-2">
            Select date and time to reconcile from:
          </label>
          <input
            type="datetime-local"
            id="timestamp"
            name="timestamp"
            className="p-2 border rounded text-black"
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Start Reconciliation
        </button>
      </form>
      <div className="mb-4">
        <p>Status: {status}</p>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-2">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="mt-2">Progress: {progress}%</p>
        <button
          onClick={handleCancel}
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Cancel
        </button>
      </div>
      {results.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Results:</h2>
          <p>Total positions: {totalPositions}</p>
          <div className="mt-4 max-h-96 overflow-y-auto">
            {results.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-2">Results:</h2>
                <ul className="list-disc pl-5">
                  {results.map((result, index) => (
                    <li
                      key={index}
                      className={
                        result.success ? 'text-green-500' : 'text-red-500'
                      }
                    >
                      Position {result.id}:{' '}
                      {result.success
                        ? 'Reconciled'
                        : `Failed - ${result.error}`}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
