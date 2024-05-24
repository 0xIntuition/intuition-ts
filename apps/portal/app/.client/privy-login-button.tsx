import { Button } from '@0xintuition/1ui'
import { User, useLogin } from '@privy-io/react-auth'

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
  const { login } = useLogin({
    onComplete: (user, isNewUser, wasAlreadyAuthenticated) => {
      handleLogin(user, isNewUser, wasAlreadyAuthenticated)
    },
    onError: (error) => {
      console.log(error)
    },
  })

  return (
    <Button onClick={login} variant="primary">
      Log in
    </Button>
  )
}
