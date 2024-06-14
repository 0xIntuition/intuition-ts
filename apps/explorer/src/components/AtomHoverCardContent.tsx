/* eslint-disable  @typescript-eslint/no-explicit-any */

import { useQuery, gql } from '@apollo/client';
import {
  HoverCardContent, Text, Avatar, AvatarFallback, AvatarImage,
  Button
} from '@0xintuition/1ui'

const GET_FEED = gql`
query Atom($atomId: ID!) {
  atom(id: $atomId) {
    blockTimestamp
    image
    emoji
    label
    type
    value {
      book {
        genre
        name
        url
      }
      person {
        email
        identifier
        image
        name
        url
      }
    }
    emoji
  }
}
`;

export function AtomHoverCardContent({ atomId }: { atomId: string }) {
  const { loading, error, data } = useQuery(GET_FEED, {
    variables: { atomId }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (<HoverCardContent className="w-60">
    <div className="flex gap-4">
      <Avatar>
        <AvatarImage src={data.atom.image} />
        <AvatarFallback>{data.atom.emoji}</AvatarFallback>
      </Avatar>
      <div>
        <Text variant="body">{data.atom.label}</Text>
        <Text variant="caption" className="text-primary/50">
          {data.atom.value?.person?.email}
        </Text>
      </div>
    </div>
    {data.atom.type === 'Book' && (
      <div>
        <Text variant="caption">{data.atom.value.book.genre}</Text>
        <Button>Like</Button>
      </div>
    )}
    {data.atom.type === 'Person' && (
      <div>
        <Text variant="caption"><a href={`https://basescan.org/address/${data.atom.value.person.identifier}`}>Basescan</a></Text>
        <Text variant="caption"><a href={data.atom.value.person.url}>Website</a></Text>
        <Button>Follow</Button>
      </div>
    )}

  </HoverCardContent>)
}
