import { Button } from '@intuition-ts/1ui';
import { usePrivy } from '@privy-io/react-auth';

export function PrivyButton() {
  const { ready, authenticated, login, user: privyUser } = usePrivy();

  // Disable login when Privy is not ready or the user is already authenticated
  const disableLogin = !ready || (ready && authenticated);

  console.log('ready', ready);
  console.log('authenticated', authenticated);
  console.log('privyUser', privyUser);

  if (!ready) {
    return null;
  }

  if (ready && !authenticated) {
    return (
      <Button disabled={disableLogin} onClick={login}>
        Log in
      </Button>
    );
  }

  if (ready && authenticated && privyUser !== null) {
    return (
      <button disabled={disableLogin} onClick={login}>
        User: {privyUser.id}
      </button>
    );
  }
}
