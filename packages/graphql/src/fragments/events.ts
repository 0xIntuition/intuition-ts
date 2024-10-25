import { graphql } from "../generated/gql";

export const EventFragment = graphql(`
  fragment Event on events {
    type
    atomId
    blockNumber
    blockTimestamp
    depositId
    feeTransferId
    id
    redemptionId
    transactionHash
    tripleId
  }
`)
