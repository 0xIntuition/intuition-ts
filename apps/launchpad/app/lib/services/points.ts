import { pointsClient } from '@lib/graphql/client'
import logger from '@lib/utils/logger'

export const GetRelicPointsDocument = `
    query GetRelicPoints($address: String!) {
      relic_points(where: {address: {_eq: $address}}) {
        address
        genesis_minter_points
        snapshot_1_holder_points
        snapshot_2_holder_points
        total_relic_points
      }
    }
  `

export interface GetRelicPointsQuery {
  relic_points: Array<{
    address: string
    genesis_minter_points: number
    snapshot_1_holder_points: number
    snapshot_2_holder_points: number
    total_relic_points: number
  }>
}

export interface GetRelicPointsQueryVariables {
  address: string
}

export interface RelicPoints {
  totalPoints: number
  genesisPoints: number
  snapshot1Points: number
  snapshot2Points: number
}

export async function fetchRelicPoints(address: string): Promise<RelicPoints> {
  const data = await pointsClient.request<
    GetRelicPointsQuery,
    GetRelicPointsQueryVariables
  >(GetRelicPointsDocument, {
    address,
  })

  const points = data?.relic_points[0] ?? {
    genesis_minter_points: 0,
    snapshot_1_holder_points: 0,
    snapshot_2_holder_points: 0,
    total_relic_points: 0,
  }

  const result = {
    totalPoints: points.total_relic_points,
    genesisPoints: points.genesis_minter_points,
    snapshot1Points: points.snapshot_1_holder_points,
    snapshot2Points: points.snapshot_2_holder_points,
  }

  return result
}

export const GetPointsDocument = `
    query GetPoints($address: String!) {
      epoch_points(where: {account_id: {_eq: $address}}) {
        account_id
        social
        portal_quests
        referral
        community
        launchpad_quests_points
        relic_points
        total_points
      }
    }
  `

export interface GetPointsQuery {
  epoch_points: Array<{
    account_id: string
    social: number
    portal_quests: number
    referral: number
    community: number
    launchpad_quests_points: number
    relic_points: number
    total_points: number
  }>
}

export interface GetPointsQueryVariables {
  address: string
}

export interface Points {
  social: number
  portalQuests: number
  referral: number
  community: number
  launchpadQuests: number
  relicPoints: number
  totalPoints: number
}

export async function fetchPoints(address: string): Promise<Points> {
  const data = await pointsClient.request<
    GetPointsQuery,
    GetPointsQueryVariables
  >(GetPointsDocument, {
    address,
  })

  const points = data?.epoch_points[0] ?? {
    account_id: '',
    social: 0,
    portal_quests: 0,
    referral: 0,
    community: 0,
    launchpad_quests_points: 0,
    relic_points: 0,
    total_points: 0,
  }

  const result = {
    social: points.social,
    portalQuests: points.portal_quests,
    referral: points.referral,
    community: points.community,
    launchpadQuests: points.launchpad_quests_points,
    relicPoints: points.relic_points,
    totalPoints: points.total_points,
  }

  return result
}

export const GetUserRankDocument = `
  query GetUserRank($limit: Int!, $offset: Int!) {
    # Get all users with points, ordered by points descending
    epoch_points(
      where: { launchpad_quests_points: { _gt: 0 } }
      order_by: { launchpad_quests_points: desc }
      limit: $limit
      offset: $offset
    ) {
      account_id
      launchpad_quests_points
    }
    # Get total count for pagination
    epoch_points_aggregate(
      where: { launchpad_quests_points: { _gt: 0 } }
    ) {
      aggregate {
        count
      }
    }
  }
`

export interface GetUserRankQuery {
  epoch_points: Array<{
    account_id: string
    launchpad_quests_points: number
  }>
  epoch_points_aggregate: {
    aggregate: {
      count: number
    }
  }
}

export interface GetUserRankQueryVariables {
  limit: number
  offset: number
}

export async function fetchUserRank(
  address: string,
): Promise<{ rank: number; totalUsers: number }> {
  const PAGE_SIZE = 100
  let offset = 0
  let userFound = false
  let userRank = 0

  // Get total count first
  const firstPage = await pointsClient.request<
    GetUserRankQuery,
    GetUserRankQueryVariables
  >(GetUserRankDocument, {
    limit: PAGE_SIZE,
    offset: 0,
  })

  const totalUsers = firstPage.epoch_points_aggregate.aggregate.count

  // If no users with points, return unranked
  if (totalUsers === 0) {
    return {
      rank: 0,
      totalUsers: 0,
    }
  }

  // Check first page
  const normalizedAddress = address.toLowerCase()
  const userIndexInFirstPage = firstPage.epoch_points.findIndex(
    (user) => user.account_id === normalizedAddress,
  )

  if (userIndexInFirstPage !== -1) {
    // User found in first page
    userRank = userIndexInFirstPage + 1
    userFound = true
  }

  // If not found in first page, keep fetching until found
  while (!userFound && offset + PAGE_SIZE < totalUsers) {
    offset += PAGE_SIZE
    const nextPage = await pointsClient.request<
      GetUserRankQuery,
      GetUserRankQueryVariables
    >(GetUserRankDocument, {
      limit: PAGE_SIZE,
      offset,
    })

    const userIndexInPage = nextPage.epoch_points.findIndex(
      (user) => user.account_id === normalizedAddress,
    )

    if (userIndexInPage !== -1) {
      // User found in this page
      userRank = offset + userIndexInPage + 1
      userFound = true
      break
    }
  }

  logger(
    userFound
      ? `Found user at rank ${userRank} out of ${totalUsers} total users`
      : `User not found in ${totalUsers} total users`,
  )

  return {
    rank: userFound ? userRank : 0,
    totalUsers,
  }
}

export const GetUserRankEfficientDocument = `
  query GetUserRankEfficient($address: String!) {
    # Get user's points
    user_points: epoch_points_by_pk(account_id: $address) {
      launchpad_quests_points
    }
    # Get all users with points, ordered by points descending
    ranked_users: epoch_points(
      where: { launchpad_quests_points: { _gt: 0 } }
      order_by: { launchpad_quests_points: desc }
    ) {
      account_id
      launchpad_quests_points
    }
  }
`

export interface GetUserRankEfficientQuery {
  user_points: {
    launchpad_quests_points: number
  } | null
  ranked_users: Array<{
    account_id: string
    launchpad_quests_points: number
  }>
}

export interface GetUserRankEfficientQueryVariables {
  address: string
}

export async function fetchUserRankEfficient(
  address: string,
): Promise<{ rank: number; totalUsers: number }> {
  const data = await pointsClient.request<
    GetUserRankEfficientQuery,
    GetUserRankEfficientQueryVariables
  >(GetUserRankEfficientDocument, {
    address: address.toLowerCase(),
  })

  const userPoints = data.user_points?.launchpad_quests_points ?? 0
  const totalUsers = data.ranked_users.length

  // If user has no points, they're unranked
  if (userPoints === 0) {
    return {
      rank: 0,
      totalUsers,
    }
  }

  // Find user's position in the sorted array (1-based index)
  const userIndex = data.ranked_users.findIndex(
    (user) => user.account_id === address.toLowerCase(),
  )

  // If user not found, they're unranked
  if (userIndex === -1) {
    return {
      rank: 0,
      totalUsers,
    }
  }

  // Add 1 to convert from 0-based to 1-based ranking
  return {
    rank: userIndex + 1,
    totalUsers,
  }
}
