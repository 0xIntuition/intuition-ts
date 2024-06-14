/* eslint-disable  @typescript-eslint/no-explicit-any */

import { useQuery, gql } from '@apollo/client';
import {
  Label, HoverCard
} from '@0xintuition/1ui'
import { AtomHoverCardContent } from './components/AtomHoverCardContent';
import { AtomHoverCardTrigger } from './components/AtomHoverCardTrigger';

const GET_TRIPLES = gql`
query Triples {
  triples {
    id
    subject {
      id
      emoji
      label
      image
    }
    predicate {
      id
      emoji
      label
    }
    object {
      id
      emoji
      image
      label
    }
  }
}
`;

export function Triples() {
  const { loading, error, data } = useQuery(GET_TRIPLES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  return (<ul className="list-none list-inside w-full">
    {data.triples.map((triple: any) => (
      <li key={triple.id} className="p-3 border-border/30 border-b-[1px] border-solid">
        <div className="flex items-center space-x-4">

          <HoverCard>
            <AtomHoverCardTrigger atom={triple.subject} />
            <AtomHoverCardContent atomId={triple.subject.id} />
          </HoverCard>

          <Label>{triple.predicate.emoji} {triple.predicate.label}</Label>

          <HoverCard>
            <AtomHoverCardTrigger atom={triple.object} />
            <AtomHoverCardContent atomId={triple.object.id} />
          </HoverCard>
        </div>
      </li>
    ))}
  </ul>)
}

