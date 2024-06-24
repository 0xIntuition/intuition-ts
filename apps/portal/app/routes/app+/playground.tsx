import logger from '@lib/utils/logger'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import {
  ApiError,
  ClaimSortColumn,
  ClaimsService,
  OpenAPI,
  SortDirection,
} from '@0xintuition/api'
import { ApiError, IdentitiesService, OpenAPI } from '@0xintuition/api'
import { calculateTotalPages, getAuthHeaders } from '@lib/utils/misc'
import { SessionContext } from '@middleware/session'
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { getPrivyAccessToken } from '@server/privy'
import { useSearchParams } from "@remix-run/react";

export async function loader({ request}: LoaderFunctionArgs) {
  OpenAPI.BASE = process.env.API_URL
  const accessToken = getPrivyAccessToken(request)
  const headers = getAuthHeaders(accessToken !== null ? accessToken : '')
  OpenAPI.HEADERS = headers as Record<string, string>
  const url = new URL(request.url)
  const searchParams = new URLSearchParams(url.search)

  const tagId = searchParams.get('tagId')
  if (tagId !== null) {
    try {
      const identity_tags = await IdentitiesService.getIdentityTags({
        id: tagId,
      })

      logger(`tags ${JSON.stringify(identity_tags.data[0])}`) 
    } catch (error: unknown) {
      if (error instanceof ApiError) {
        logger(`${error.name} - ${error.status}: ${error.message} ${error.url}`)
      } else {
        throw error
      }
    }
 }

  
  const followId = searchParams.get('followId')
  if (followId !== null) {
    try {
      const identity_followers = await IdentitiesService.getIdentityFollowers({
        id: followId,
      })

      logger(`followers ${JSON.stringify(identity_followers.data[0])}`) 
    } catch (error: unknown) {
      if (error instanceof ApiError) {
        logger(`${error.name} - ${error.status}: ${error.message} ${error.url}`)
      } else {
        throw error
      }
    }
  }

  const hasTag = searchParams.get('hasTag')
  if (hasTag !== null) {
    try {
      const identities = await IdentitiesService.searchIdentity({
        hasTag: hasTag,
      })

      logger(`identities with tag ${JSON.stringify(identities.data[0])}`) 
    } catch (error: unknown) {
      if (error instanceof ApiError) {
        logger(`${error.name} - ${error.status}: ${error.message} ${error.url}`)
      } else {
        throw error
      }
    }
  }

  const followedBy = searchParams.get('followedBy')
  if (followedBy !== null) {
    try {
      const identities = await IdentitiesService.searchIdentity({
        followedBy: followedBy,
      })

      logger(`followedBy identities ${JSON.stringify(identities.data[0])}`) 
    } catch (error: unknown) {
      if (error instanceof ApiError) {
        logger(`${error.name} - ${error.status}: ${error.message} ${error.url}`)
      } else {
        throw error
      }
    }
  }

  const follows = searchParams.get('follows');
  if (follows !== null) {
    try {
      const identities = await IdentitiesService.searchIdentity({
        follows: follows,
      })

      logger(`follows identities ${JSON.stringify(identities.data[0])}`) 
    } catch (error: unknown) {
      if (error instanceof ApiError) {
        logger(`${error.name} - ${error.status}: ${error.message} ${error.url}`)
      } else {
        throw error
      }
    }
  }

  return json({
    message: 'placeholder',
  })
}


export default function Playground() {
  const { message } = useLoaderData<typeof loader>()
  logger('message from profile overview loader', message)

  return (
    <div className="m-8 flex flex-col items-center gap-4">
      <div className="flex flex-col">Quests Route</div>
      <pre>This is a placeholder for the Quests route</pre>
      <pre>quests route loader: {message}</pre>
    </div>
  )
}
