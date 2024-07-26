import { json } from '@remix-run/node'
import {
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
  ] = await Promise.all([
    getTripleCost(),
    getTripleConfig(),
    getGeneralConfig(),
  ])

  return json({
    vaultId: vid.toString(),
    fees: {
      tripleCost: tripleCost.toString(),
      tripleCreationFee: tripleCreationFee.toString(),
      atomDepositFractionOnCreation: atomDepositFractionOnCreation.toString(),
      atomDepositFractionOnDeposit: atomDepositFractionOnDeposit.toString(),
      feeDenominator: feeDenominator.toString(),
    } as CreateClaimFeesType,
  } as CreateClaimLoaderData)
}
