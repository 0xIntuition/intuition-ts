import { json } from '@remix-run/node'
import {
  getFees,
  getGeneralConfig,
  getTripleConfig,
  getTripleCost,
} from '@server/multivault'

export type CreateClaimLoaderData = {
  vaultId: string
  fees: CreateClaimFeesType
}

export type CreateClaimFeesType = {
  tripleCost: string
  tripleCreationFee: string
  atomDepositFractionOnCreation: string
  atomDepositFractionOnDeposit: string
  entryFee: string
  protocolFee: string
  feeDenominator: string
}

export async function loader() {
  const vid = BigInt(0)

  const [
    tripleCost,
    [
      tripleCreationFee,
      atomDepositFractionOnCreation,
      atomDepositFractionOnDeposit,
    ],
    [, , feeDenominator],
    [entryFee, , protocolFee],
  ] = await Promise.all([
    getTripleCost(),
    getTripleConfig(),
    getGeneralConfig(),
    getFees(),
  ])

  return json({
    vaultId: vid.toString(),
    fees: {
      tripleCost: tripleCost.toString(),
      tripleCreationFee: tripleCreationFee.toString(),
      atomDepositFractionOnCreation: atomDepositFractionOnCreation.toString(),
      atomDepositFractionOnDeposit: atomDepositFractionOnDeposit.toString(),
      entryFee: entryFee.toString(),
      protocolFee: protocolFee.toString(),
      feeDenominator: feeDenominator.toString(),
    } as CreateClaimFeesType,
  } as CreateClaimLoaderData)
}
