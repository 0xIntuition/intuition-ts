import { GraphQLClient } from 'graphql-request'

if (process.env.POINTS_GRAPHQL_ENDPOINT === undefined) {
  throw new Error('Points API endpoint not defined')
}

export const pointsClient = new GraphQLClient(
  process.env.POINTS_GRAPHQL_ENDPOINT,
)
