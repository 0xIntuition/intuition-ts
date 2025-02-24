export type ClaimrPointsType = {
  xp: number
  ref_xp: number
  ugc_xp: number
  rank: number
}

export async function getClaimrPoints(
  wallet: string,
): Promise<{ success: boolean; data?: ClaimrPointsType; error?: string }> {
  try {
    const res = await fetch(
      `https://prod.claimr.io/api/v1/user/balance?account=${wallet.toLowerCase()}&platform=web3&pid=${process.env.CLAIMR_CAMPAIGN_ID}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.CLAIMR_AUTH_TOKEN}`,
          accept: 'application/json',
        },
      },
    )

    const { data } = await res.json()

    return { success: true, data }
  } catch (error) {
    console.error(
      `Error in getClaimrPoints: ${error instanceof Error ? error.message : error}`,
    )
    return { success: false, error: (error as Error).message }
  }
}
