import { pointsClient } from '@lib/graphql/client'

export const GetRelicPointsDocument = {
  query: `
    query GetRelicPoints($address: String!) {
      relic_points(where: {address: {_eq: $address}}) {
        address
        genesis_minter_points
        snapshot_1_holder_points
        snapshot_2_holder_points
        total_relic_points
      }
    }
  `,
} as const

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
  >(GetRelicPointsDocument.query, {
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

export const GetPointsDocument = {
  query: `
    query GetPoints($address: String!) {
      points(where: {account_id: {_eq: $address}}) {
        account_id
        social
        portal_quests
        referral
        community
        minigame1
      }
    }
  `,
} as const

export interface GetPointsQuery {
  points: Array<{
    account_id: string
    social: number
    portal_quests: number
    referral: number
    community: number
    minigame1: number
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
  minigame: number
  totalPoints: number
}

export async function fetchPoints(address: string): Promise<Points> {
  const data = await pointsClient.request<
    GetPointsQuery,
    GetPointsQueryVariables
  >(GetPointsDocument.query, {
    address,
  })

  const points = data?.points[0] ?? {
    social: 0,
    portal_quests: 0,
    referral: 0,
    community: 0,
    minigame1: 0,
  }

  const result = {
    social: points.social,
    portalQuests: points.portal_quests,
    referral: points.referral,
    community: points.community,
    minigame: points.minigame1,
    totalPoints:
      points.social +
      points.portal_quests +
      points.referral +
      points.community +
      points.minigame1,
  }

  return result
}
