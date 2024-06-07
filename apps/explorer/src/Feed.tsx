import { useQuery, gql } from '@apollo/client';
import {
  Button,
  Label, Avatar, AvatarFallback, AvatarImage, HoverCard, HoverCardTrigger
} from '@0xintuition/1ui'
import { AtomHoverCardContent } from './AtomHoverCardContent';

const GET_FEED = gql`
query Feed {
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

export function Feed() {
  const { loading, error, data } = useQuery(GET_FEED);

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

function AtomHoverCardTrigger({ atom }: { atom: any }) {
  return (
    <HoverCardTrigger asChild>
      <Button variant='text'>
        <Avatar >
          <AvatarImage src={atom.image} alt="intuition" />
          <AvatarFallback>{atom.emoji}</AvatarFallback>
        </Avatar>
        <Label>{atom.label}</Label>
      </Button>
    </HoverCardTrigger>
  )
}
