import { json } from '@remix-run/node'
import { getAtomCost, getFees, getGeneralConfig } from '@server/multivault'

export type CreateLoaderData = {
  vaultId: string
  atomCost: string
  atomCreationFee: string
  protocolFee: string
  entryFee: string
  feeDenominator: string
}

export async function loader() {
  // Base vault id
  const vid = BigInt(0)

  // Contract reads and is batched via viem public client param
  // See https://viem.sh/docs/clients/public.html#optimization

  const [atomCost, [entryFee, , protocolFee], [, , feeDenominator]] =
    await Promise.all([getAtomCost(), getFees(), getGeneralConfig()])

  return json({
    vaultId: vid.toString(),
    atomCost: atomCost.toString(),
    protocolFee: protocolFee.toString(),
    entryFee: entryFee.toString(),
    feeDenominator: feeDenominator.toString(),
  } as CreateLoaderData)
}
