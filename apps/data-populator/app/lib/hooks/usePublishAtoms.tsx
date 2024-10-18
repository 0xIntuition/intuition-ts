import { usePollRequestDetails } from './usePollRequestDetails'

export function usePublishAtoms({
  requestHash,
}: {
  requestHash: string | null
}) {
  const { requestData, isLoading } = usePollRequestDetails({
    requestHash,
    active: requestHash !== null,
  })

  return { requestData, isLoading }
}
