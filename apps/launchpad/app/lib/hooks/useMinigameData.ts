import { useGetListDetailsQuery } from '@0xintuition/graphql'

export function useMinigameData() {
  const { data: listData, isLoading } = useGetListDetailsQuery(
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

  const totalUsers =
    listData?.globalTriples?.reduce(
      (sum, triple) =>
        sum + Number(triple.vault?.positions_aggregate?.aggregate?.count ?? 0),
      0,
    ) ?? 0

  return {
    title: listData?.globalTriples[0].object.label ?? 'Minigame',
    atoms: listData?.globalTriplesAggregate?.aggregate?.count ?? 0,
    totalUsers,
    isLoading,
  }
}
