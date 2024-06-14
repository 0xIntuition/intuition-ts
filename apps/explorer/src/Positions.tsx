/* eslint-disable  @typescript-eslint/no-explicit-any */

import { useQuery, gql } from '@apollo/client';
import { formatEther } from 'viem'
import {
  HoverCard,
  Label
} from '@0xintuition/1ui'
import { AtomHoverCardContent } from './components/AtomHoverCardContent';
import { AtomHoverCardTrigger } from './components/AtomHoverCardTrigger';

const GET_POSITIONS = gql`
query Positions {
  positions {
    balance
    account {
      label
    }
    vault {
      id
      atom {
        id
        type
        emoji
        label
        image
      }
      triple {
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
    id
  }
}`;

export function Positions() {
  const { loading, error, data } = useQuery(GET_POSITIONS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  return (<ul className="list-none list-inside w-full">
    {data.positions.map((position: any) => (
      <li key={position.id} className="p-3 border-border/30 border-b-[1px] border-solid" style={position.balance === '0' ? { opacity: 0.5 } : {}}>
        <div className="flex items-center space-x-4">

          <Label>
            {formatEther(position.balance)} :
          </Label>
          {position.account.label}

          {position.vault.atom && (
            <HoverCard>
              <AtomHoverCardTrigger atom={position.vault.atom} />
              <AtomHoverCardContent atomId={position.vault.atom.id} />
            </HoverCard>
          )}
          {position.vault.triple && (
            <div className="flex items-center space-x-4">
              <HoverCard>
                <AtomHoverCardTrigger atom={position.vault.triple.subject} />
                <AtomHoverCardContent atomId={position.vault.triple.subject.id} />
              </HoverCard>

              <div>{position.vault.triple.predicate.emoji} {position.vault.triple.predicate.label}</div>

              <HoverCard>
                <AtomHoverCardTrigger atom={position.vault.triple.object} />
                <AtomHoverCardContent atomId={position.vault.triple.object.id} />
              </HoverCard>
            </div>
          )}

        </div>
      </li>
    ))}
  </ul>)
}

