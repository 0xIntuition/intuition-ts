import { GraphQLClient } from 'graphql-request'

// if (process.env.HASURA_POINTS_ENDPOINT === undefined) {
//   throw new Error('Points API endpoint not defined')
// }

export const pointsClient = new GraphQLClient(
  'https://intuition-points-api.onrender.com/v1/graphql',
)
