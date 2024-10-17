import { gql } from 'graphql-request';

export const EVENT_FRAGMENT = gql`
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
`;
