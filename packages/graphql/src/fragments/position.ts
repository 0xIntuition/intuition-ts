import { graphql } from "../generated/gql";

export const PositionDetailsFragment = graphql(`
  fragment PositionDetails on positions {
    id
    accountId
    shares
    vaultId
  }
`)
