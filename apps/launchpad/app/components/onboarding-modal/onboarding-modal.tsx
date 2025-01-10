import { useCallback, useEffect, useState } from 'react'

import { Dialog, DialogContent } from '@0xintuition/1ui'

import { ClientOnly } from 'remix-utils/client-only'

import { INITIAL_TOPICS, STEPS } from './constants'
import { IntroStep } from './intro-step'
import { SubTopicsStep } from './subtopics-step'
import { SummaryStep } from './summary-step'
import { TopicsStep } from './topics-step'
import { OnboardingModalProps, PreferenceSubmission, Topic } from './types'

const STORAGE_KEY = 'onboarding-progress'

type Step = (typeof STEPS)[keyof typeof STEPS]

export function OnboardingModal({ isOpen, onClose }: OnboardingModalProps) {
  const [step, setStep] = useState<Step>(STEPS.INTRO)
  const [topics, setTopics] = useState<Topic[]>(() =>
    JSON.parse(JSON.stringify(INITIAL_TOPICS)),
  )
  const [selectedTopics, setSelectedTopics] = useState<Topic[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Load saved progress
  useEffect(() => {
    const savedProgress = localStorage.getItem(STORAGE_KEY)
    if (savedProgress) {
      try {
        const { step, topics, selectedTopics } = JSON.parse(savedProgress)
        setStep(step)
        setTopics(topics)
        setSelectedTopics(selectedTopics)
      } catch (error) {
        console.error('Error loading saved progress:', error)
      }
    }
  }, [])

  // Save progress
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ step, topics, selectedTopics }),
    )
  }, [step, topics, selectedTopics])

  // Reset state on close
  useEffect(() => {
    if (!isOpen) {
      setStep(STEPS.INTRO)
      setTopics(JSON.parse(JSON.stringify(INITIAL_TOPICS)))
      setSelectedTopics([])
      setIsSubmitting(false)
    }
  }, [isOpen])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.key === 'Enter' || e.key === ' ') && !isSubmitting) {
        handleNext()
      }
    }
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isSubmitting])

  const handleNext = useCallback(() => {
    setIsTransitioning(true)
    setTimeout(() => {
      if (step === STEPS.TOPICS) {
        const selected = topics.filter((topic) => topic.selected)
        setSelectedTopics(selected)
      }
      setStep((prev) => {
        if (prev === STEPS.INTRO) {
          return STEPS.TOPICS
        }
        if (prev === STEPS.TOPICS) {
          return STEPS.SUBTOPICS
        }
        if (prev === STEPS.SUBTOPICS) {
          return STEPS.SUMMARY
        }
        return prev
      })
      setIsTransitioning(false)
    }, 300)
  }, [step, topics])

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true)
    try {
      const finalPreferences: PreferenceSubmission[] = selectedTopics.map(
        (topic) => ({
          topicId: topic.id,
          subTopics: topic.subTopics
            .filter((sub) => sub.selected)
            .map((sub) => sub.id),
        }),
      )
      // Here you would typically make an API call to save preferences
      console.log('Final preferences:', finalPreferences)
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulated API call
      onClose()
    } catch (error) {
      console.error('Error saving preferences:', error)
    } finally {
      setIsSubmitting(false)
    }
  }, [selectedTopics, onClose])

  const toggleTopic = useCallback((id: string) => {
    setTopics((currentTopics) => {
      return currentTopics.map((topic) => {
        if (topic.id === id) {
          return { ...topic, selected: !topic.selected }
        }
        return topic
      })
    })
  }, [])

  const toggleSubTopic = useCallback((topicId: string, subTopicId: string) => {
    setSelectedTopics((currentTopics) => {
      return currentTopics.map((topic) => {
        if (topic.id === topicId) {
          return {
            ...topic,
            subTopics: topic.subTopics.map((sub) => {
              if (sub.id === subTopicId) {
                return { ...sub, selected: !sub.selected }
              }
              return sub
            }),
          }
        }
        return topic
      })
    })
  }, [])

  return (
    <ClientOnly>
      {() => (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="p-0 bg-gradient-to-br from-[#060504] to-[#101010] max-w-[640px] w-full border-none">
            <div
              className={`transition-opacity duration-300 ${
                isTransitioning ? 'opacity-0' : 'opacity-100'
              }`}
            >
              {step === STEPS.INTRO && <IntroStep onNext={handleNext} />}

              {step === STEPS.TOPICS && (
                <TopicsStep
                  topics={topics}
                  onToggleTopic={toggleTopic}
                  onNext={handleNext}
                />
              )}

              {step === STEPS.SUBTOPICS && (
                <SubTopicsStep
                  selectedTopics={selectedTopics}
                  onToggleSubTopic={toggleSubTopic}
                  onNext={handleNext}
                />
              )}

              {step === STEPS.SUMMARY && (
                <SummaryStep
                  selectedTopics={selectedTopics}
                  onSubmit={handleSubmit}
                  isSubmitting={isSubmitting}
                />
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </ClientOnly>
  )
}
