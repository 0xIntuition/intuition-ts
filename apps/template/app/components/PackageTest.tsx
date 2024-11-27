import { Button } from '@0xintuition/1ui'
import { useGetStatsQuery } from '@0xintuition/graphql'

export function PackageTest() {
  const { data, isLoading, isError } = useGetStatsQuery()

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Package Test</h2>

      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">1UI Button Test:</h3>
          <Button>Click Me</Button>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">GraphQL Query Test:</h3>
          {isLoading && <p>Loading...</p>}
          {isError && (
            <p className="text-red-500">Error: GraphQL Query Failed</p>
          )}
          {data && (
            <div className="space-y-2">
              <h4 className="font-medium">System Stats:</h4>
              <pre className="bg-gray-100 p-2 rounded">
                {JSON.stringify(data.stats[0], null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
