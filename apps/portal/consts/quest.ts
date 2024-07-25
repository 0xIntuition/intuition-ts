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
