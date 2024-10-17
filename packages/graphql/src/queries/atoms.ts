import { gql } from 'graphql-request';
import { ATOM_METADATA_FRAGMENT, ATOM_TXN_FRAGMENT, ATOM_VAULT_DETAILS_FRAGMENT } from '../fragments/atom';
import { ACCOUNT_METADATA_FRAGMENT } from '../fragments/account';

export const GET_ATOMS_QUERY = gql`
  query GetAtoms($limit: Int, $offset: Int, $orderBy: [atoms_order_by!], $where: atoms_bool_exp) {
    atoms(limit: $limit, offset: $offset, order_by: $orderBy, where: $where) {
      ...AtomMetadata
      ...AtomTxn
      ...AtomVaultDetails
      creator {
        ...AccountMetadata
      }
    }
  }
  ${ATOM_METADATA_FRAGMENT}
  ${ATOM_TXN_FRAGMENT}
  ${ATOM_VAULT_DETAILS_FRAGMENT}
  ${ACCOUNT_METADATA_FRAGMENT}
`;
