import { Address, formatUnits, PublicClient } from 'viem'

import { EthMultiVaultAbi } from '../contracts'
import { MultivaultConfig } from '../types'

export type MultiCallIntuitionConfigs = {
  address: Address
  publicClient: PublicClient
}

export async function multiCallIntuitionConfigs(
  config: MultiCallIntuitionConfigs,
) {
  const { address, publicClient } = config

  const wagmiContract = {
    address,
    abi: EthMultiVaultAbi,
  } as const

  const resp = await publicClient.multicall({
    contracts: [
      {
        ...wagmiContract,
        functionName: 'getAtomCost',
        args: [],
      },
      {
        ...wagmiContract,
        functionName: 'getTripleCost',
        args: [],
      },
      {
        ...wagmiContract,
        functionName: 'atomConfig',
        args: [],
      },
      {
        ...wagmiContract,
        functionName: 'tripleConfig',
        args: [],
      },
      {
        ...wagmiContract,
        functionName: 'vaultFees',
        args: [BigInt(0)],
      },
      {
        ...wagmiContract,
        functionName: 'generalConfig',
        args: [],
      },
    ],
  })

  const atomCost = resp[0]?.result as bigint
  const formattedAtomCost = formatUnits(atomCost, 18)

  const tripleCost = resp[1]?.result as bigint
  const formattedTripleCost = formatUnits(tripleCost, 18)

  const atomWalletInitialDepositAmount = resp[2]?.result?.[0] as bigint
  const formattedAtomWalletInitialDepositAmount = formatUnits(
    atomWalletInitialDepositAmount,
    18,
  )

  const atomCreationProtocolFee = resp[2]?.result?.[1] as bigint
  const formattedAtomCreationProtocolFee = formatUnits(
    atomCreationProtocolFee,
    18,
  )

  const tripleCreationProtocolFee = resp[3]?.result?.[0] as bigint
  const formattedTripleCreationProtocolFee = formatUnits(
    tripleCreationProtocolFee,
    18,
  )

  const atomDepositFractionOnTripleCreation = resp[3]?.result?.[1] as bigint
  const formattedAtomDepositFractionOnTripleCreation = formatUnits(
    atomDepositFractionOnTripleCreation,
    18,
  )

  const atomDepositFractionForTriple = resp[3]?.result?.[2] as bigint
  const formattedAtomDepositFractionForTriple = formatUnits(
    atomDepositFractionForTriple,
    18,
  )

  const entryFee = resp[4]?.result?.[0] as bigint
  const formattedEntryFee = formatUnits(entryFee, 18)

  const exitFee = resp[4]?.result?.[1] as bigint
  const formattedExitFee = formatUnits(exitFee, 18)

  const protocolFee = resp[4]?.result?.[2] as bigint
  const formattedProtocolFee = formatUnits(protocolFee, 18)

  const feeDenominator = resp[5]?.result?.[2] as bigint
  const formattedFeeDenominator = formatUnits(feeDenominator, 18)

  const minDeposit = resp[5]?.result?.[3] as bigint
  const formattedMinDeposit = formatUnits(minDeposit, 18)

  return {
    atom_cost: atomCost.toString(),
    formatted_atom_cost: formattedAtomCost,
    triple_cost: tripleCost.toString(),
    formatted_triple_cost: formattedTripleCost,
    atom_wallet_initial_deposit_amount:
      atomWalletInitialDepositAmount.toString(),
    formatted_atom_wallet_initial_deposit_amount:
      formattedAtomWalletInitialDepositAmount,
    atom_creation_protocol_fee: atomCreationProtocolFee.toString(),
    formatted_atom_creation_protocol_fee: formattedAtomCreationProtocolFee,
    triple_creation_protocol_fee: tripleCreationProtocolFee.toString(),
    formatted_triple_creation_protocol_fee: formattedTripleCreationProtocolFee,
    atom_deposit_fraction_on_triple_creation:
      atomDepositFractionOnTripleCreation.toString(),
    formatted_atom_deposit_fraction_on_triple_creation:
      formattedAtomDepositFractionOnTripleCreation,
    atom_deposit_fraction_for_triple: atomDepositFractionForTriple.toString(),
    formatted_atom_deposit_fraction_for_triple:
      formattedAtomDepositFractionForTriple,
    entry_fee: entryFee.toString(),
    formatted_entry_fee: formattedEntryFee,
    exit_fee: exitFee.toString(),
    formatted_exit_fee: formattedExitFee,
    protocol_fee: protocolFee.toString(),
    formatted_protocol_fee: formattedProtocolFee,
    fee_denominator: feeDenominator.toString(),
    formatted_fee_denominator: formattedFeeDenominator,
    min_deposit: minDeposit.toString(),
    formatted_min_deposit: formattedMinDeposit,
  } as MultivaultConfig
}
