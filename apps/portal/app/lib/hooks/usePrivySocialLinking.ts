import { toast } from '@0xintuition/1ui'

import logger from '@lib/utils/logger'
import { useLinkAccount, usePrivy } from '@privy-io/react-auth'
import { useRevalidator } from '@remix-run/react'
import { LinkMethodNames, PrivyPlatform } from 'types/privy'

// for now the onSuccess and onError are contained in the hook. we may need to allow for this to take callbacks
// to use with the e2e integration with backend

export function useSocialLinking(verifiedPlatforms: PrivyPlatform[]) {
  const {
    user: privyUser,
    unlinkTwitter,
    unlinkGithub,
    unlinkFarcaster,
  } = usePrivy()
  const { revalidate } = useRevalidator()
  const { linkTwitter, linkGithub, linkFarcaster } = useLinkAccount({
    onSuccess: (user, linkMethod, linkedAccount) => {
      logger('Link successful:', user, linkMethod, linkedAccount)
      toast.success('Account link successful.')
      revalidate()
    },
    onError: (error) => {
      logger('Link error:', error)
      toast.success(`Account link failed: ${error}`)
    },
  })

  const linkMethods = {
    linkTwitter,
    linkGithub,
    linkFarcaster,
  }

  const unlinkMethodsBySubject = {
    unlinkTwitter,
    unlinkGithub,
  }

  const unlinkMethodsByFid = {
    unlinkFarcaster,
  }

  const handleLink = async (linkMethodName: LinkMethodNames) => {
    const linkMethod = linkMethods[linkMethodName]
    try {
      await linkMethod()
      revalidate()
    } catch (error) {
      console.error('Link failed', error)
    }
  }

  const handleUnlink = async (
    unlinkMethodName:
      | keyof typeof unlinkMethodsBySubject
      | keyof typeof unlinkMethodsByFid,
    subject?: string,
    fid?: number,
  ) => {
    if (unlinkMethodName === 'unlinkFarcaster') {
      if (fid === undefined) {
        throw new Error(`Missing fid for ${unlinkMethodName}`)
      }
      try {
        await unlinkMethodsByFid[
          unlinkMethodName as keyof typeof unlinkMethodsByFid
        ](fid)
        console.log('Unlink successful. privyUser:', privyUser)
        revalidate()
      } catch (error) {
        console.error('Unlink failed', error)
      }
    } else {
      if (subject === undefined) {
        throw new Error(`Missing subject for ${unlinkMethodName}`)
      }
      try {
        await unlinkMethodsBySubject[
          unlinkMethodName as keyof typeof unlinkMethodsBySubject
        ](subject)
        console.log('Unlink successful. privyUser:', privyUser)
        revalidate()
      } catch (error) {
        console.error('Unlink failed', error)
      }
    }
  }

  return {
    privyUser,
    handleLink,
    handleUnlink,
    verifiedPlatforms,
  }
}
