import { gql } from 'graphql-request';

export const ACCOUNT_METADATA_FRAGMENT = gql`
  fragment AccountMetadata on accounts {
    label
    image
    id
    atomId
    type
  }
`;
