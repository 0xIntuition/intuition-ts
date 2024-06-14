/* eslint-disable  @typescript-eslint/no-explicit-any */
import { useQuery, gql } from '@apollo/client';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Label
} from '@0xintuition/1ui'

const GET_ACCOUNTS = gql`
query Accounts {
  accounts {
    id
    image
    label
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
        <Avatar >
          <AvatarImage src={account.image} alt="intuition" />
          <AvatarFallback>{account.label}</AvatarFallback>
        </Avatar>
        <Label>{account.label} {account.label === account.id ? '' : account.id}</Label>
      </li>
    ))}
  </ul>)
}

