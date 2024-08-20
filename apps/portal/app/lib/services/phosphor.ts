import { apiPrivateGET } from '@lib/utils/http-requests'

const phosphorCollectionId =
  typeof window !== 'undefined'
    ? window.ENV?.PHOSPHOR_COLLECTION_ID
    : process.env.PHOSPHOR_COLLECTION_ID

export interface PurchaseIntentsData {
  cursor: string | null
  has_more: boolean
  results: string[]
  total_results: number
}

export interface PurchaseIntentsResponse {
  success: boolean
  data?: PurchaseIntentsData
  error?: string
}

export async function getPurchaseIntentsByAddress(
  eth_address?: string,
  status?: string,
  listing_id?: string,
): Promise<PurchaseIntentsResponse> {
  try {
    const queryParams = [
      eth_address ? `eth_address=${eth_address}` : '',
      status ? `status=${status}` : '',
      phosphorCollectionId ? `collection_id=${phosphorCollectionId}` : '',
      listing_id ? `listing_id=${listing_id}` : '',
    ]
      .filter(Boolean)
      .join('&')

    const data = await apiPrivateGET<PurchaseIntentsData>(
      `/v1/purchase-intents?${queryParams}`,
    )
    return { success: true, data }
  } catch (error) {
    if (error instanceof Error) {
      const errorMessage = 'Error getting purchase intents by address.'
      return {
        success: false,
        error: errorMessage,
      }
    }
    return { success: false, error: (error as Error).message }
  }
}
