import { useQuery, gql } from '@apollo/client';
import {
  Label, Avatar, AvatarFallback, AvatarImage
} from '@0xintuition/1ui'

const GET_FEED = gql`
query Feed {
  triples {
    id
    subject {
      emoji
      label
      image
    }
    predicate {
      emoji
      label
    }
    object {
      emoji
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
          <Avatar >
            <AvatarImage src={triple.subject.image} alt="intuition" />
            <AvatarFallback>{triple.subject.emoji}</AvatarFallback>
          </Avatar>
          <Label>{triple.subject.label}</Label>
          <Label>{triple.predicate.emoji} {triple.predicate.label}</Label>
          <Avatar>
            <AvatarImage src={triple.object.image} alt="intuition" />
            <AvatarFallback>{triple.object.emoji}</AvatarFallback>
          </Avatar>
          <Label>{triple.object.label}</Label>
        </div>
      </li>
    ))}
  </ul>)
}
