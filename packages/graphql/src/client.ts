import { GraphQLClient } from 'graphql-request'

// // const API_URL = process.env.HASURA_PROJECT_ENDPOINT || ''
// const API_URL = "https://hasura-xfvc.onrender.com/v1/graphql"
// // const HASURA_ADMIN_SECRET = process.env.HASURA_GRAPHQL_ADMIN_SECRET;

// type ClientParams = {
//   token?: string
//   userId?: string
// }

// const X_HASURA_USER_ID = 'x-hasura-user-id'
// // const X_HASURA_ADMIN_SECRET = 'x-hasura-admin-secret';

// const client = ({ token, userId }: ClientParams) => {
//   const headers: {
//     authorization?: string
//     [X_HASURA_USER_ID]?: string
//     // [X_HASURA_ADMIN_SECRET]?: string;
//   } = {}

//   if (token) {
//     headers.authorization = `Bearer ${token}`

//     // * Set matching session variables for Hasura where needed
//     if (userId) {
//       headers[X_HASURA_USER_ID] = userId
//     }
//   }
//   // if (HASURA_ADMIN_SECRET) {
//   //   headers[X_HASURA_ADMIN_SECRET] = HASURA_ADMIN_SECRET;
//   // }

//   return new GraphQLClient(API_URL, { headers })
// }

// export default client

/* eslint-disable import/no-unused-modules */
// if (!process.env.VITE_HASURA_PROJECT_ENDPOINT) {
//   throw new Error("VITE_HASURA_PROJECT_ENDPOINT is not set");
// }

// export const endpointUrl = process.env.VITE_HASURA_PROJECT_ENDPOINT;

export const fetchParams = () => {
  return {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  };
};

export function fetcher<TData, TVariables>(
  query: string,
  variables?: TVariables,
  options?: RequestInit["headers"],
) {
  return async () => {
    const res = await fetch("https://hasura-xfvc.onrender.com/v1/graphql", {
      method: "POST",
      ...fetchParams(),
      ...options,
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors && (!json.data || Object.keys(json.data).length === 0)) {
      const { message } = json.errors[0];
      throw new Error(message);
    }

    return json.data as TData;
  };
}