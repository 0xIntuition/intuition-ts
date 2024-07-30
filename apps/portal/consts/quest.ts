import comingSoonImage from '@assets/coming-soon-image.png'
import narrativeStandardImage from '@assets/narrative-standard-image.png'
import { QuestSet } from 'types/quest'

export const QUEST_LOG_DESCRIPTION =
  'Something inside you stirs, urging you to rekindle and reclaim humanity’s lost intuition...'

export const STANDARD_QUEST_SET: QuestSet = {
  imgSrc: narrativeStandardImage,
  title: 'Tutorial Island: The Primitive Elements',
  description: 'Learn the core elements of the Intuition System',
  summary:
    'Complete the chapters below to learn the core primitives that make up the Intuition system.',
  navigatePath: '/app/quest/narrative/0',
}

export const COMING_SOON_QUEST_SET: QuestSet = {
  imgSrc: comingSoonImage,
  title: 'Coming Soon',
  description: 'Our interns are hard at work.',
  summary: 'Our interns are hard at work.',
  navigatePath: '',
}

export const FALLBACK_IDENTITY_ID = '0160563f-45da-4f17-928a-69b54339c97d'

export const FALLBACK_CLAIM_ID = '19ac84b0-4db2-403c-a236-e09a60ce02da'

export const FALLBACK_QUEST_PLACEHOLDER_IMAGE =
  'https://res.cloudinary.com/dfpwy9nyv/image/upload/f_auto,q_auto/v1/Portal%20Assets/quests/quest-placeholder'
