import { invariant } from '@lib/utils/misc'
import { LoaderFunctionArgs, redirect } from '@remix-run/node'
import { getUserWallet } from '@server/auth'
import { NO_WALLET_ERROR, PATHS } from 'app/consts'

export async function loader({ request }: LoaderFunctionArgs) {
  const wallet = await getUserWallet(request)
  invariant(wallet, NO_WALLET_ERROR)

  return redirect(PATHS.EXPLORE_LISTS)
}
