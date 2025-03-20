import { Button } from '@0xintuition/1ui'

import { useTestAuth } from '@lib/utils/test-auth'

export function AuthTest() {
  const { testConnect, testDisconnect } = useTestAuth()

  return (
    <div className="flex flex-col gap-4 p-4">
      <h2 className="text-lg font-semibold">Auth Test Panel</h2>
      <div className="flex gap-4">
        <Button onClick={testConnect} variant="outline">
          Test Connect
        </Button>
        <Button onClick={testDisconnect} variant="outline">
          Test Disconnect
        </Button>
      </div>
    </div>
  )
}
