import { graphql } from "../generated/gql";

export const VaultDetailsFragment = graphql(`
  fragment VaultDetails on vaults {
    atomId
    currentSharePrice
    id
    positionCount
    totalShares
    tripleId
  }
`);
