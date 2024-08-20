import { QuestSet } from 'app/types/quest'

export const QUEST_LOG_DESCRIPTION =
  'Something inside you stirs, urging you to rekindle and reclaim humanity’s lost intuition...'

export const STANDARD_QUEST_SET: QuestSet = {
  imgSrc:
    'https://res.cloudinary.com/dfpwy9nyv/image/upload/f_auto,q_auto/v1/Portal%20Assets/quests/primitive-island-overview',
  title: 'Primitive Island',
  description:
    'An introduction to the core primitives of the Intuition System.',
  summary: `Your perspective shifts; the matrix seeming to glitch.
The universe flickers, winks. The fabric of reality tearing asunder.
You smile. A twinkle in your eye. An understanding. Deep, powerful - humbling, yet reassuring.
Reality fades out of existence. In full awareness, the world turns black.
From the nothingness, shape comes into form.
An island. A place from a time lost.
The blurred shapes become clear, the world sharply snapping into place.
This world suddenly feels… real. Even more real than the reality you knew before.
But how could this be?
Why have you been brought here?`,
  navigatePath: '/app/quest/narrative/0',
}

const COMING_SOON_IMAGE =
  'https://res.cloudinary.com/dfpwy9nyv/image/upload/f_auto,q_auto/v1/Portal%20Assets/quests/1_0-tribes'

export const COMING_SOON_QUEST_SET: QuestSet = {
  imgSrc: COMING_SOON_IMAGE,
  title: 'Coming Soon',
  description: 'Our interns are hard at work.',
  summary: 'Our interns are hard at work.',
  navigatePath: '',
}

export const FALLBACK_QUEST_PLACEHOLDER_IMAGE =
  'https://res.cloudinary.com/dfpwy9nyv/image/upload/f_auto,q_auto/v1/Portal%20Assets/quests/quest-placeholder'
