import { MULTIVAULT_CONTRACT_ADDRESS } from 'constants'

import logger from '@lib/utils/logger'
import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { getVaultDetails } from '@server/multivault'

export async function loader({ request }: LoaderFunctionArgs) {
  const searchParams = new URL(request.url).searchParams
  const contract = searchParams.get('contract') || MULTIVAULT_CONTRACT_ADDRESS
  const vaultId = searchParams.get('vid') || '0'
  const wallet = searchParams.get('wallet') || undefined

  try {
    if (wallet) {
      const {
        assets_sum,
        conviction_sum,
        conviction_price,
        user_conviction,
        user_assets,
        entry_fee,
        formatted_entry_fee,
        exit_fee,
        formatted_exit_fee,
        protocol_fee,
        formatted_protocol_fee,
      } = await getVaultDetails(contract, vaultId, wallet as `0x${string}`)

      return json({
        assets_sum,
        conviction_sum,
        conviction_price,
        user_conviction,
        user_assets,
        entry_fee,
        exit_fee,
        protocol_fee,
        formatted_entry_fee,
        formatted_exit_fee,
        formatted_protocol_fee,
      })
    }

    const {
      assets_sum,
      conviction_sum,
      conviction_price,
      entry_fee,
      formatted_entry_fee,
      exit_fee,
      formatted_exit_fee,
      protocol_fee,
      formatted_protocol_fee,
    } = await getVaultDetails(contract, vaultId)

    return json({
      assets_sum,
      conviction_sum,
      conviction_price,
      entry_fee,
      exit_fee,
      protocol_fee,
      formatted_entry_fee,
      formatted_exit_fee,
      formatted_protocol_fee,
    })
  } catch (e) {
    if (e instanceof Error) {
      logger(e.message)
      return null
    }
  }
}
