import { graphql } from "../generated/gql";

export const GetAtomsDocument = graphql(`
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
`);
