/* eslint-disable  @typescript-eslint/no-explicit-any */

import { useQuery, gql } from '@apollo/client';
import {
  HoverCard
} from '@0xintuition/1ui'
import { AtomHoverCardContent } from './components/AtomHoverCardContent';
import { AtomHoverCardTrigger } from './components/AtomHoverCardTrigger';

const GET_ATOMS = gql`
query Atoms {
  atoms {
    id
    type
    emoji
    label
    image
  }
}
`;

export function Atoms() {
  const { loading, error, data } = useQuery(GET_ATOMS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  return (<ul className="list-none list-inside w-full">
    {data.atoms.map((atom: any) => (
      <li key={atom.id} className="p-3 border-border/30 border-b-[1px] border-solid">
        <div className="flex items-center space-x-4">

          <HoverCard>
            <AtomHoverCardTrigger atom={atom} />
            <AtomHoverCardContent atomId={atom.id} />
          </HoverCard>

        </div>
      </li>
    ))}
  </ul>)
}

