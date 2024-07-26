import logger from '@lib/utils/logger'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { requireUserWallet } from '@server/auth'
import { getVaultDetails } from '@server/multivault'

export async function loader({ request }: LoaderFunctionArgs) {
  logger('request', request)
  const userWallet = await requireUserWallet(request)
  logger('userWallet', userWallet)
  const url = new URL(request.url)
  const contract = url.searchParams.get('contract')
  const vaultId = url.searchParams.get('vaultId')
  logger('vaultId', vaultId)

  if (!contract || !vaultId) {
    return json({ error: 'Missing contract or vaultId' }, { status: 400 })
  }

  try {
    const vaultDetails = await getVaultDetails(
      contract,
      vaultId,
      userWallet as `0x${string}`,
    )
    logger('vaultDetails', vaultDetails)
    return json({ vaultDetails })
  } catch (error) {
    logger('Failed to fetch vaultDetails', error)
    return json({ error: 'Failed to fetch vault details' }, { status: 500 })
  }
}
