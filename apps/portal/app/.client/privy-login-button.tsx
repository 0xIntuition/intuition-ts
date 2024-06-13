import { useState } from 'react'

import { Button } from '@0xintuition/1ui'

import { useLogin, User } from '@privy-io/react-auth'
import { Loader2Icon } from 'lucide-react'

interface PrivyLoginButtonProps {
  handleLogin: (
    user: User,
    isNewUser: boolean,
    wasAlreadyAuthenticated: boolean,
  ) => void
}

export default function PrivyLoginButton({
  handleLogin,
}: PrivyLoginButtonProps) {
  const [loading, setLoading] = useState(false)
  const { login } = useLogin({
    onComplete: (user, isNewUser, wasAlreadyAuthenticated) => {
      handleLogin(user, isNewUser, wasAlreadyAuthenticated)
    },
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
    <Button onClick={handleClick} variant="primary" disabled={loading}>
      {loading ? (
        <>
          <Loader2Icon className="animate-spin h-5 w-5 mr-1" />
          Logging In...
        </>
      ) : (
        'Log in'
      )}
    </Button>
  )
}
