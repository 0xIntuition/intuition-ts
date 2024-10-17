import { GraphQLClient } from 'graphql-request'

// const API_URL = process.env.HASURA_PROJECT_ENDPOINT || ''
const API_URL = "https://hasura-xfvc.onrender.com/v1/graphql"
// const HASURA_ADMIN_SECRET = process.env.HASURA_GRAPHQL_ADMIN_SECRET;

type ClientParams = {
  token?: string
  userId?: string
}

const X_HASURA_USER_ID = 'x-hasura-user-id'
// const X_HASURA_ADMIN_SECRET = 'x-hasura-admin-secret';

const client = ({ token, userId }: ClientParams) => {
  const headers: {
    authorization?: string
    [X_HASURA_USER_ID]?: string
    // [X_HASURA_ADMIN_SECRET]?: string;
  } = {}

  if (token) {
    headers.authorization = `Bearer ${token}`

    // * Set matching session variables for Hasura where needed
    if (userId) {
      headers[X_HASURA_USER_ID] = userId
    }
  }
  // if (HASURA_ADMIN_SECRET) {
  //   headers[X_HASURA_ADMIN_SECRET] = HASURA_ADMIN_SECRET;
  // }

  return new GraphQLClient(API_URL, { headers })
}

export default client
