import { graphql } from "../generated/gql";

export const AccountMetadataFragment = graphql(`
  fragment AccountMetadata on accounts {
    label
    image
    id
    atomId
    type
  }
`)
