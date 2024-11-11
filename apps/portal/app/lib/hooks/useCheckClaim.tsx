import { TagLoaderData } from '@routes/resources+/tag'
import { useQuery } from '@tanstack/react-query'

export function useCheckClaim({
  subjectId,
  predicateId,
  objectId,
}: {
  subjectId?: string
  predicateId?: string
  objectId?: string
}) {
  return useQuery<TagLoaderData>({
    queryKey: ['check-claim', subjectId, predicateId, objectId],
    queryFn: async () => {
      if (!subjectId || !predicateId || !objectId) {
        return { result: '0' }
      }
      const response = await fetch(
        `/resources/tag?subjectId=${subjectId}&predicateId=${predicateId}&objectId=${objectId}`,
      )
      if (!response.ok) {
        throw new Error('Failed to check claim')
      }
      return response.json()
    },
    enabled: Boolean(subjectId && predicateId && objectId),
  })
}
