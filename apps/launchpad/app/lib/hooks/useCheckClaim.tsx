import { TagLoaderData } from '@routes/resources+/tag'
import { useQuery } from '@tanstack/react-query'

export function useCheckClaim(
  {
    subjectId,
    predicateId,
    objectId,
  }: {
    subjectId?: string
    predicateId?: string
    objectId?: string
  },
  options = {},
) {
  return useQuery<TagLoaderData>({
    queryKey: ['check-claim', subjectId, predicateId, objectId],
    queryFn: async () => {
      if (!subjectId || !predicateId || !objectId) {
        return { result: '0' }
      }
      const response = await fetch(
        `/resources/tag?subjectId=${subjectId}&predicateId=${predicateId}&objectId=${objectId}`,
      )
      const data = await response.json()

      return data
    },
    enabled: Boolean(subjectId && predicateId && objectId),
    ...options,
  })
}
