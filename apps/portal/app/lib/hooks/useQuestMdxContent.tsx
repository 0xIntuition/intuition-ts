import { useMemo } from 'react'

import { getQuestContentBySlug } from '@lib/utils/quest'

interface MdxContent {
  introBody?: string | null
  mainBody?: string | null
  mainBody2?: string | null
  closingBody?: string | null
}

export function useQuestMdxContent(questId?: string): MdxContent {
  return useMemo(() => {
    if (!questId) {
      return {
        introBody: null,
        mainBody: null,
        mainBody2: null,
        closingBody: null,
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
