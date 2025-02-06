import { pointsClient } from '@lib/graphql/client'

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
        launchpad_quests
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
    launchpad_quests: number
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
    launchpad_quests: 0,
    relic_points: 0,
    total_points: 0,
  }

  const result = {
    social: points.social,
    portalQuests: points.portal_quests,
    referral: points.referral,
    community: points.community,
    launchpadQuests: points.launchpad_quests,
    relicPoints: points.relic_points,
    totalPoints: points.total_points,
  }

  return result
}

export const GetUserRankDocument = `
  query GetUserRank($address: String!) {
    # Get user's points
    user_points: epoch_points_by_pk(account_id: $address) {
      launchpad_quests
    }
    # Get count of users with more points
    higher_ranks: epoch_points_aggregate(
      where: {
        _and: [
          { account_id: { _neq: $address } },
          { launchpad_quests: { _gt: 0 } }
        ]
      }
    ) {
      aggregate {
        count
      }
    }
    # Get total number of users with points
    total_users: epoch_points_aggregate(
      where: { launchpad_quests: { _gt: 0 } }
    ) {
      aggregate {
        count
      }
    }
  }
`

export interface GetUserRankQuery {
  user_points: {
    launchpad_quests: number
  } | null
  higher_ranks: {
    aggregate: {
      count: number
    }
  }
  total_users: {
    aggregate: {
      count: number
    }
  }
}

export interface GetUserRankQueryVariables {
  address: string
}

export async function fetchUserRank(
  address: string,
): Promise<{ rank: number; totalUsers: number }> {
  const data = await pointsClient.request<
    GetUserRankQuery,
    GetUserRankQueryVariables
  >(GetUserRankDocument, {
    address,
  })

  const userPoints = data.user_points?.launchpad_quests ?? 0
  const higherRanks = data.higher_ranks.aggregate.count
  const totalUsers = data.total_users.aggregate.count

  // If user has no points, they're unranked
  if (userPoints === 0) {
    return {
      rank: 0,
      totalUsers,
    }
  }

  // Add 1 to higher ranks to get user's position (1-based ranking)
  return {
    rank: higherRanks + 1,
    totalUsers,
  }
}
