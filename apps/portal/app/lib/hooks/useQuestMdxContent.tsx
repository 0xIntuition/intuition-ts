import { useMemo } from 'react'

import { getQuestContentBySlug } from '@lib/utils/quest'

interface MdxContent {
  introBody: string | undefined
  mainBody: string | undefined
  mainBody2: string | undefined
  closingBody: string | undefined
}

export function useQuestMdxContent(questId?: string): MdxContent {
  return useMemo(() => {
    if (!questId) {
      return {
        introBody: undefined,
        mainBody: undefined,
        mainBody2: undefined,
        closingBody: undefined,
      }
    }

    return {
      introBody: getQuestContentBySlug(`${questId}-intro`)?.body,
      mainBody: getQuestContentBySlug(`${questId}-main`)?.body,
      mainBody2: getQuestContentBySlug(`${questId}-main-2`)?.body,
      closingBody: getQuestContentBySlug(`${questId}-closing`)?.body,
    }
  }, [questId])
}
