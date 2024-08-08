import { json } from '@remix-run/node'
import {
  getAtomConfig,
  getAtomCost,
  getFees,
  getGeneralConfig,
} from '@server/multivault'

export type CreateLoaderData = {
  vaultId: string
  atomCost: string
  atomCreationFee: string
  tripleCost: string
  protocolFee: string
  entryFee: string
  feeDenominator: string
  minDeposit: string
}

export async function loader() {
  // Base vault id
  const vid = BigInt(0)

  // Contract reads and is batched via viem public client param
  // See https://viem.sh/docs/clients/public.html#optimization

  const [
    atomCost,
    [, atomCreationFee],
    [entryFee, , protocolFee],
    [, , feeDenominator, minDeposit],
  ] = await Promise.all([
    getAtomCost(),
    getAtomConfig(),
    getFees(),
    getGeneralConfig(),
  ])

  return json({
    vaultId: vid.toString(),
    atomCost: atomCost.toString(),
    atomCreationFee: atomCreationFee.toString(),
    protocolFee: protocolFee.toString(),
    entryFee: entryFee.toString(),
    feeDenominator: feeDenominator.toString(),
    minDeposit: minDeposit.toString(),
  } as CreateLoaderData)
}
