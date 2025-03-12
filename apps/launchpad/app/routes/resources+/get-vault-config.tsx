import { json, LoaderFunctionArgs } from '@remix-run/node'
import { getMultiVaultConfig } from '@server/multivault'

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const contract = url.searchParams.get('contract')

  if (!contract) {
    return json({ error: 'Missing contract' }, { status: 400 })
  }

  try {
    const multivaultConfig = await getMultiVaultConfig(contract)
    console.log('[Mutlivault Config] Prefetching data')
    return json(multivaultConfig)
  } catch (error) {
    console.error('Multivault config error:', error)
    return json({ error: 'Failed to fetch multivault config' }, { status: 500 })
  }
}
