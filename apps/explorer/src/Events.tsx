/* eslint-disable  @typescript-eslint/no-explicit-any */

import { useQuery, gql } from '@apollo/client';
import {
  HoverCard
} from '@0xintuition/1ui'
import { AtomHoverCardContent } from './components/AtomHoverCardContent';
import { AtomHoverCardTrigger } from './components/AtomHoverCardTrigger';

const GET_EVENTS = gql`
query Events {
  events {
    id
    type
    feeTransfer {
      amount
      sender {
        label
      }
    }
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
    deposit {
      receiver {
        label
      }
      sharesForReceiver
      vault {
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
    }
  }
}`;

export function Events() {
  const { loading, error, data } = useQuery(GET_EVENTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  return (<ul className="list-none list-inside w-full">
    {data.events.map((event: any) => (
      <li key={event.id} className="p-3 border-border/30 border-b-[1px] border-solid">
        <div className="flex items-center space-x-4">

          <div>{event.type}</div>

          {event.type === 'FeesTransfered' && (
            <div className="flex items-center space-x-4">
              <div>Sender: {event.feeTransfer.sender.label}</div>
              <div>Amount: {event.feeTransfer.amount}</div>
            </div>
          )}


          {event.type === 'AtomCreated' && (
            <HoverCard>
              <AtomHoverCardTrigger atom={event.atom} />
              <AtomHoverCardContent atomId={event.atom.id} />
            </HoverCard>
          )}

          {event.type === 'TripleCreated' && (
            <div className="flex items-center space-x-4">
              <HoverCard>
                <AtomHoverCardTrigger atom={event.triple.subject} />
                <AtomHoverCardContent atomId={event.triple.subject.id} />
              </HoverCard>

              <div>{event.triple.predicate.emoji} {event.triple.predicate.label}</div>

              <HoverCard>
                <AtomHoverCardTrigger atom={event.triple.object} />
                <AtomHoverCardContent atomId={event.triple.object.id} />
              </HoverCard>
            </div>
          )}

          {event.type === 'Deposited' && (
            <div className="flex items-center space-x-4">
              <div>Receiver: {event.deposit.receiver.label}</div>
              <div>Shares: {event.deposit.sharesForReceiver}</div>
              {event.deposit.vault.atom && (
                <HoverCard>
                  <AtomHoverCardTrigger atom={event.deposit.vault.atom} />
                  <AtomHoverCardContent atomId={event.deposit.vault.atom.id} />
                </HoverCard>
              )}

              {event.deposit.vault.triple && (
                <div className="flex items-center space-x-4">
                  <HoverCard>
                    <AtomHoverCardTrigger atom={event.deposit.vault.triple.subject} />
                    <AtomHoverCardContent atomId={event.deposit.vault.triple.subject.id} />
                  </HoverCard>

                  <div>{event.deposit.vault.triple.predicate.emoji} {event.deposit.vault.triple.predicate.label}</div>

                  <HoverCard>
                    <AtomHoverCardTrigger atom={event.deposit.vault.triple.object} />
                    <AtomHoverCardContent atomId={event.deposit.vault.triple.object.id} />
                  </HoverCard>
                </div>
              )}
            </div>
          )}

        </div>
      </li>
    ))}
  </ul>)
}

