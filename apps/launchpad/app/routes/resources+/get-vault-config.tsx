import { json, LoaderFunctionArgs } from '@remix-run/node'
import { getMultiVaultConfig } from '@server/multivault'

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const contract = url.searchParams.get('contract')

  if (!contract) {
    return json({ error: 'Missing contract' }, { status: 400 })
  }

  try {
    const vaultDetails = await getMultiVaultConfig(contract)
    return json(vaultDetails)
  } catch (error) {
    console.error('Vault details error:', error)
    return json({ error: 'Failed to fetch vault details' }, { status: 500 })
  }
}
