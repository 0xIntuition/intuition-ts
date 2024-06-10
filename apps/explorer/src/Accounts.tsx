import { useQuery, gql } from '@apollo/client';
import {
  Label
} from '@0xintuition/1ui'

const GET_ACCOUNTS = gql`
query Accounts {
  accounts {
    id
    image
  }
}
`;

export function Accounts() {
  const { loading, error, data } = useQuery(GET_ACCOUNTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  return (<ul className="list-none list-inside w-full">
    {data.accounts.map((account: any) => (
      <li key={account.id} className="p-3 border-border/30 border-b-[1px] border-solid">
        <Label>{account.id}</Label>
      </li>
    ))}
  </ul>)
}

