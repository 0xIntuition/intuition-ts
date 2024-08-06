import { useState } from 'react'

import { Button, Icon } from '@0xintuition/1ui'

import { useLogin } from '@privy-io/react-auth'

// interface PrivyLoginButtonProps {
//   handleLogin: (
//     user: User,
//     isNewUser: boolean,
//     wasAlreadyAuthenticated: boolean,
//   ) => void
// }

export default function PrivyLoginButton() {
  const [loading, setLoading] = useState(false)
  const { login } = useLogin({
    onError: (error) => {
      setLoading(false)
      console.log(error)
    },
  })

  const handleClick = () => {
    setLoading(true)
    login()
  }

  return (
    <Button
      onClick={handleClick}
      variant="primary"
      size="xl"
      disabled={loading}
      className="px-10"
    >
      {loading ? (
        <>
          <Icon name="in-progress" className="animate-spin h-5 w-5 mr-1" />
          Connecting...
        </>
      ) : (
        'Connect'
      )}
    </Button>
  )
}
