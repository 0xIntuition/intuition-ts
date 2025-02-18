import { useCallback, useEffect } from 'react'

import { ChapterHeader } from '@components/lore/chapter-header'
import { ChapterNavigation } from '@components/lore/chapter-navigation'
// Chapter 1
import { AwakeningSection } from '@components/lore/chapter-sections/1-1-awakening'
import { DecisionSection } from '@components/lore/chapter-sections/1-2-decision'
import { OppressorSection } from '@components/lore/chapter-sections/1-3-oppressor'
import { PyramidSection } from '@components/lore/chapter-sections/1-4-pyramid'
// Chapter 2
import { GildedCageSection } from '@components/lore/chapter-sections/2-1-gilded-cage'
import { WhatLiesBeyondSection } from '@components/lore/chapter-sections/2-2-what-lies-beyond'
import { ThePortalSection } from '@components/lore/chapter-sections/2-3-the-portal'
import { ThePowerOfManySection } from '@components/lore/chapter-sections/2-4-the-power-of-many'
// Chapter 3
import { TheThresholdSection } from '@components/lore/chapter-sections/3-1-threshold'
import { UniqueJourneySection } from '@components/lore/chapter-sections/3-2-unique-journey'
import { DeeperTruthSection } from '@components/lore/chapter-sections/3-3-deeper-truth'
import { ProveYourselfSection } from '@components/lore/chapter-sections/3-4-prove-yourself'
// Chapter 4
import { UnspokenTruthsSection } from '@components/lore/chapter-sections/4-1-unspoken-truths'
import { TheShiftSection } from '@components/lore/chapter-sections/4-2-the-shift'
// Chapter 5
import { AdvocatingIntuitionSection } from '@components/lore/chapter-sections/5-1-advocating-intuition'
// Chapter 6
import { CommonVisionSection } from '@components/lore/chapter-sections/6-1-common-vision'
import { TheCrossroadsSection } from '@components/lore/chapter-sections/6-2-the-crossroads'
import { AMovementSection } from '@components/lore/chapter-sections/6-3-a-movement'
// Chapter 7
import { ForceForChangeSection } from '@components/lore/chapter-sections/7-1-force-for-change'
import { TheEpiphanySection } from '@components/lore/chapter-sections/7-2-the-epiphany'
import { TheTransformationSection } from '@components/lore/chapter-sections/7-3-the-transformation'
// Chapter 8
import { TheRelicSection } from '@components/lore/chapter-sections/8-1-the-relic'
// Chapter 9
import { TheContinuumSection } from '@components/lore/chapter-sections/9-1-the-continuum'
import { chapters } from '@components/lore/chapters'
import type { Chapter } from '@lib/types/lore'
import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from '@remix-run/node'
import { useLoaderData, useNavigate, useNavigation } from '@remix-run/react'
import { motion } from 'framer-motion'

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) {
    return [
      { title: 'Chapter Not Found | Intuition Launchpad' },
      {
        name: 'description',
        content: 'The requested chapter could not be found.',
      },
    ]
  }

  const { chapter } = data
  const title = `${chapter.title} - ${chapter.subtitle} | Intuition Launchpad`
  const imageUrl = chapter.image

  const description = chapter.description ?? 'Explore the story of Intuition'

  return [
    { title },
    { name: 'description', content: description },
    // Open Graph
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:type', content: 'article' },
    { property: 'og:image', content: imageUrl },
    { property: 'og:site_name', content: 'Intuition Launchpad' },
    { property: 'og:locale', content: 'en_US' },
    // Twitter
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: imageUrl },
    { name: 'twitter:site', content: '@0xIntuition' },
    // Additional metadata
    {
      name: 'keywords',
      content: `Intuition, ${chapter.title}, ${chapter.subtitle}, Story, Lore, Web3, Future`,
    },
    { name: 'author', content: 'Intuition' },
  ]
}

export async function loader({ params }: LoaderFunctionArgs) {
  if (!params.chapterId) {
    throw new Response('Chapter ID is required', { status: 400 })
  }

  const currentIndex = chapters.findIndex(
    (chapter: Chapter) => chapter.id === params.chapterId,
  )

  if (currentIndex === -1) {
    throw new Response('Chapter not found', { status: 404 })
  }

  const chapter = chapters[currentIndex]
  const prevChapter = currentIndex > 0 ? chapters[currentIndex - 1] : undefined
  const nextChapter =
    currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : undefined

  return json({ chapter, prevChapter, nextChapter })
}

export default function ChapterRoute() {
  const { chapter, prevChapter, nextChapter } = useLoaderData<typeof loader>()
  const navigate = useNavigate()
  const navigation = useNavigation()
  const isLoading = navigation.state === 'loading'

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement
      ) {
        return
      }

      switch (event.key) {
        case 'ArrowLeft':
          if (prevChapter) {
            event.preventDefault()
            navigate(`/lore/${prevChapter.id}`)
          }
          break
        case 'ArrowRight':
          if (nextChapter) {
            event.preventDefault()
            navigate(`/lore/${nextChapter.id}`)
          }
          break
        case 'Escape':
          event.preventDefault()
          navigate('/lore')
          break
        default:
          break
      }
    },
    [navigate, prevChapter, nextChapter],
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background animate-pulse">
        <div className="h-[50vh] bg-primary/5" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground px-4 md:px-0">
      <ChapterHeader
        title={chapter.title}
        subtitle={chapter.subtitle}
        image={chapter.image}
      />

      <motion.div
        className="space-y-6 mb-24 max-w-[95vw] md:max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {chapter.id === 'be-human' && (
          <>
            <AwakeningSection />
            <DecisionSection />
            <OppressorSection />
            <PyramidSection />
          </>
        )}
        {chapter.id === 'lost-origins' && (
          <>
            <GildedCageSection />
            <WhatLiesBeyondSection />
            <ThePortalSection />
            <ThePowerOfManySection />
          </>
        )}
        {chapter.id === 'transcendence' && (
          <>
            <TheThresholdSection />
            <UniqueJourneySection />
            <DeeperTruthSection />
            <ProveYourselfSection />
          </>
        )}
        {chapter.id === 'emergence' && (
          <>
            <UnspokenTruthsSection />
            <TheShiftSection />
          </>
        )}
        {chapter.id === 'rebirth' && <AdvocatingIntuitionSection />}
        {chapter.id === 'choosing-your-path' && (
          <>
            <CommonVisionSection />
            <TheCrossroadsSection />
            <AMovementSection />
          </>
        )}
        {chapter.id === 'ascension' && (
          <>
            <ForceForChangeSection />
            <TheEpiphanySection />
            <TheTransformationSection />
          </>
        )}
        {chapter.id === 'the-relic' && <TheRelicSection />}
        {chapter.id === 'the-continuum' && <TheContinuumSection />}
      </motion.div>

      <ChapterNavigation prevChapter={prevChapter} nextChapter={nextChapter} />
    </div>
  )
}

export function ErrorBoundary() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Chapter Not Found</h1>
        <p className="text-xl opacity-80">
          The chapter you&apos;re looking for doesn&apos;t exist.
        </p>
      </div>
    </div>
  )
}
