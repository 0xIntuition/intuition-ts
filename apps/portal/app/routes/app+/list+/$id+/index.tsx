import { Claim, ListHeaderCard } from '@0xintuition/1ui'
import { ClaimsService } from '@0xintuition/api'

import { NO_PARAM_ID_ERROR } from '@lib/utils/errors'
import logger from '@lib/utils/logger'
import { fetchWrapper, invariant } from '@lib/utils/misc'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

export async function loader({ params }: LoaderFunctionArgs) {
  const id = params.id
  invariant(id, NO_PARAM_ID_ERROR)

  const claim = await fetchWrapper({
    method: ClaimsService.getClaimById,
    args: { id },
  })

  logger('list claim', claim)
  return json({
    claim,
  })
}

export default function ListOverview() {
  const { claim } = useLoaderData<typeof loader>()

  return (
    <div className="flex-col justify-start items-start flex w-full gap-6">
      <div className="flex flex-col w-full pb-4">
        <ListHeaderCard label="Identities" value={35}>
          <Claim
            size="md"
            subject={{
              variant: claim.subject?.is_user ? 'user' : 'non-user',
              label: claim.subject?.is_user
                ? claim.subject?.user?.display_name ??
                  claim.subject?.display_name
                : claim.subject?.display_name ?? '',
              imgSrc: claim.subject?.is_user
                ? claim.subject?.user?.image ?? claim.subject?.image
                : claim.subject?.image ?? null,
            }}
            predicate={{
              variant: claim.predicate?.is_user ? 'user' : 'non-user',
              label: claim.predicate?.is_user
                ? claim.predicate?.user?.display_name ??
                  claim.predicate?.display_name
                : claim.predicate?.display_name ?? '',
              imgSrc: claim.predicate?.is_user
                ? claim.predicate?.user?.image ?? claim.predicate?.image
                : claim.predicate?.image ?? null,
            }}
            object={{
              variant: claim.object?.is_user ? 'user' : 'non-user',
              label: claim.object?.is_user
                ? claim.object?.user?.display_name ?? claim.object?.display_name
                : claim.object?.display_name ?? '',
              imgSrc: claim.object?.is_user
                ? claim.object?.user?.image ?? claim.object?.image
                : claim.object?.image ?? null,
            }}
          />
        </ListHeaderCard>
      </div>
    </div>
  )
}
