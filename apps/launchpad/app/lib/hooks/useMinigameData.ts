import { useGetListDetailsQuery } from '@0xintuition/graphql'

import { mockMinigames } from '../data/mock-minigames'

export function useMinigameData(gameId: string) {
  const { data: listData } = useGetListDetailsQuery(
    {
      tagPredicateId: 3,
      globalWhere: {
        predicate_id: {
          _eq: 3,
        },
        object_id: {
          _eq: 620,
        },
      },
    },
    {
      queryKey: ['get-list-details', { predicateId: 3, objectId: 620 }],
    },
  )

  const mockGame = mockMinigames.find((g) => g.id === gameId)
  if (!mockGame) {
    throw new Error(`No mock data found for game ${gameId}`)
  }

  return {
    title: listData?.globalTriples[0].object.label ?? mockGame.title,
    atoms:
      listData?.globalTriplesAggregate?.aggregate?.count ?? mockGame.totalAtoms,
    users: mockGame.totalUsers, // Will come from query when available
    points: mockGame.points,
    totalEarned: mockGame.totalEarned,
    completed: false, // Will be dynamic when implemented
  }
}
