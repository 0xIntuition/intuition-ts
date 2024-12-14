import { useEffect, useState } from 'react'

import {
  Button,
  ButtonSize,
  ButtonVariant,
  cn,
  Text,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@0xintuition/1ui'

import PrivyLogoutButton from '@client/privy-logout-button'
import { getTooltip, TooltipKey } from '@lib/utils/tooltips'
import { Link } from '@remix-run/react'
import { CURRENT_ENV } from 'app/consts'
import { AnimatePresence, motion } from 'framer-motion'
import { HelpCircle, History } from 'lucide-react'
import { ClientOnly } from 'remix-utils/client-only'

const CHARS = '!@#$%^&*(){}[]<>~`_-+=ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const SHUFFLE_DURATION = 1000 // Total duration of shuffle animation
const DISPLAY_DURATION = 5000 // How long to show the final word
const FRAMES_PER_SHUFFLE = 15 // Number of random characters to show for each position

const BETA_LABELS = [
  '[BETA]',
  '[EXPERIMENTAL]',
  '[WIP]',
  '[EARLY ACCESS]',
  '[TOP SECRET]',
  '[PROTOTYPE]',
  '[PREVIEW]',
  '[ALPHA]',
  '[PRE-RELEASE]',
  '[CONFIDENTIAL]',
  '[CLASSIFIED]',
  '[IN DEVELOPMENT]',
  '[TESTING]',
  '[UNDER CONSTRUCTION]',
  '[COMING SOON]',
  '[UNRELEASED]',
  '[PRIVATE BUILD]',
  '[UNSTABLE]',
  '[BLEEDING EDGE]',
  '[DRAFT]',
  '[PROOF OF CONCEPT]',
  '[LIMITED ACCESS]',
  '[INVITE ONLY]',
  '[SNEAK PEEK]',
  '[DEVELOPMENT BUILD]',
  '[RESTRICTED]',
  '[INTERNAL USE]',
  '[PILOT]',
  '[SANDBOX]',
  '[TRIAL VERSION]',
  '[UNFINISHED]',
  '[WORK IN PROGRESS]',
  '[BETA TESTING]',
  '[PRE-ALPHA]',
  '[CLOSED BETA]',
  '[UNDER REVIEW]',
  '[PRELIMINARY]',
  '[EVALUATION]',
  '[BETA PHASE]',
  '[DEVELOPMENT MODE]',
  '[NOT FINAL]',
  '[SUBJECT TO CHANGE]',
  '[TESTING PHASE]',
  '[PRIVATE PREVIEW]',
  '[EARLY BIRD]',
  '[INSIDER BUILD]',
  '[FEATURE PREVIEW]',
  '[TECHNICAL PREVIEW]',
  '[DEVELOPMENT PREVIEW]',
  '[ALPHA TESTING]',
  '[BETA ACCESS]',
  '[PROTOTYPE PHASE]',
  '[INTERNAL TESTING]',
  '[QUALITY ASSURANCE]',
  '[DEBUG MODE]',
  '[PRE-PRODUCTION]',
  '[STAGING]',
  '[VALIDATION]',
  '[EARLY PROTOTYPE]',
  '[CONCEPT TESTING]',
  '[INTERNAL PREVIEW]',
  '[CLOSED TESTING]',
  '[DEVELOPMENT STAGE]',
  '[FEATURE TESTING]',
  '[INITIAL RELEASE]',
  '[PRIVATE TESTING]',
  '[RESTRICTED ACCESS]',
  '[EARLY DEVELOPMENT]',
  '[INTERNAL BETA]',
  '[PREVIEW BUILD]',
  '[TEST FLIGHT]',
  '[CANARY BUILD]',
  '[NIGHTLY BUILD]',
  '[EDGE VERSION]',
  '[DEVELOPER BUILD]',
  '[UNSTABLE BUILD]',
  '[EXPERIMENTAL BUILD]',
  '[ALPHA CHANNEL]',
  '[BETA CHANNEL]',
  '[DEV CHANNEL]',
  '[PREVIEW CHANNEL]',
  '[INSIDER CHANNEL]',
  '[EARLY PREVIEW]',
  '[INTERNAL ALPHA]',
  '[CLOSED ALPHA]',
  '[PRIVATE ALPHA]',
  '[DEVELOPMENT ALPHA]',
  '[FEATURE INCOMPLETE]',
  '[IN TESTING]',
  '[PRE-BETA]',
  '[DEVELOPMENT SNAPSHOT]',
  '[MILESTONE BUILD]',
  '[RELEASE CANDIDATE]',
  '[TECH DEMO]',
  '[INNOVATION LAB]',
  '[RESEARCH BUILD]',
  '[EXPLORATORY]',
  '[ITERATION]',
  '[PROTOTYPE BUILD]',
  '[CONCEPT PHASE]',
  '[DISCOVERY PHASE]',
  '[INTERNAL RELEASE]',
  '[VERIFICATION BUILD]',
]

const AnimatedBetaText = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [displayText, setDisplayText] = useState(BETA_LABELS[0])
  const [shuffling, setShuffling] = useState(false)
  const [isDisplaying, setIsDisplaying] = useState(true)

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = []

    const shuffleLetterAtPosition = (
      finalText: string,
      position: number,
      onComplete: () => void,
    ) => {
      let frame = 0

      const animate = () => {
        if (frame >= FRAMES_PER_SHUFFLE) {
          setDisplayText(
            (prev) =>
              prev.substring(0, position) +
              finalText[position] +
              prev.substring(position + 1),
          )
          onComplete()
          return
        }

        setDisplayText(
          (prev) =>
            prev.substring(0, position) +
            CHARS[Math.floor(Math.random() * CHARS.length)] +
            prev.substring(position + 1),
        )

        frame++
        const timeout = setTimeout(
          animate,
          SHUFFLE_DURATION / (FRAMES_PER_SHUFFLE * finalText.length),
        )
        timeouts.push(timeout)
      }

      animate()
    }

    const startNewCycle = () => {
      if (!isDisplaying) {
        setShuffling(true)
        const nextIndex = (currentIndex + 1) % BETA_LABELS.length
        const targetText = BETA_LABELS[nextIndex]

        // Initialize with random characters of the same length
        setDisplayText(Array(targetText.length).fill('_').join(''))

        // Shuffle each position with slight delays
        let completedPositions = 0

        for (let i = 0; i < targetText.length; i++) {
          const timeout = setTimeout(
            () => {
              shuffleLetterAtPosition(targetText, i, () => {
                completedPositions++
                if (completedPositions === targetText.length) {
                  setShuffling(false)
                  setCurrentIndex(nextIndex)
                  setDisplayText(targetText)
                  setIsDisplaying(true)
                }
              })
            },
            i * (SHUFFLE_DURATION / targetText.length) * 0.5,
          )

          timeouts.push(timeout)
        }
      }
    }

    // Handle display duration and cycle start
    const displayTimeout = setTimeout(() => {
      setIsDisplaying(false)
      startNewCycle()
    }, DISPLAY_DURATION)

    timeouts.push(displayTimeout)

    // Cleanup
    return () => {
      timeouts.forEach(clearTimeout)
    }
  }, [currentIndex, isDisplaying])

  return (
    <div className="relative font-mono min-w-[250px]">
      <motion.div
        key={displayText}
        className={cn(
          'transition-colors text-muted-foreground',
          shuffling ? 'opacity-80' : 'opacity-100',
        )}
      >
        {displayText}
      </motion.div>
    </div>
  )
}

export function Header({ onOpenHistory }: { onOpenHistory: () => void }) {
  const [, setTheme] = useState<'light' | 'dark'>('light')
  const [tooltipsEnabled, setTooltipsEnabled] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('tooltipsEnabled')
      return saved ? JSON.parse(saved) : true
    }
    return true
  })

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    if (savedTheme) {
      setTheme(savedTheme)
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark')
    }
  }, [])

  const toggleTooltips = () => {
    setTooltipsEnabled((prev: boolean) => {
      const newValue = !prev
      localStorage.setItem('tooltipsEnabled', JSON.stringify(newValue))
      return newValue
    })
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-primary/30 bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="https://cdn.prod.website-files.com/65cdf366e68587fd384547f0/65d8fe503890d1bc9776916c_intuition-logo-type-ws.svg"
              alt="Intuition Logo"
              className="h-8"
            />
          </Link>
          <div className="flex items-center gap-3 border-l border-primary/30 pl-4">
            <Text className="text-xl font-semibold tracking-tight text-foreground/90">
              Data Populator
            </Text>
            {tooltipsEnabled ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Text
                    className={`px-2 py-1 rounded-lg text-sm tracking-widest font-medium ${
                      CURRENT_ENV === 'production'
                        ? 'text-accent bg-accent/15 border border-accent/20'
                        : 'text-warning bg-warning/15 border border-warning/20'
                    }`}
                  >
                    {CURRENT_ENV === 'production' ? 'MAINNET' : 'TESTNET'}
                  </Text>
                </TooltipTrigger>
                <TooltipContent>
                  {getTooltip(
                    CURRENT_ENV === 'production'
                      ? TooltipKey.NETWORK_STATUS_MAINNET
                      : TooltipKey.NETWORK_STATUS_TESTNET,
                  )}
                </TooltipContent>
              </Tooltip>
            ) : (
              <Text
                className={`px-2 py-1 rounded-lg text-sm tracking-widest font-medium ${
                  CURRENT_ENV === 'production'
                    ? 'text-accent bg-accent/15 border border-accent/20'
                    : 'text-warning bg-warning/15 border border-warning/20'
                }`}
              >
                {CURRENT_ENV === 'production' ? 'MAINNET' : 'TESTNET'}
              </Text>
            )}
          </div>
          <div className="flex items-center">
            <AnimatedBetaText />
          </div>
        </div>
        <nav className="flex items-center space-x-4">
          {/* Tooltip Toggle Button */}
          {tooltipsEnabled ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={ButtonVariant.secondary}
                  size={ButtonSize.iconLg}
                  onClick={toggleTooltips}
                  className={cn(
                    'transition text-accent !bg-accent/10 border-accent/60 hover:text-accent hover:bg-accent/5 hover:border-accent/80',
                  )}
                >
                  <HelpCircle className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {getTooltip(TooltipKey.TOOLTIP_TOGGLE)}
              </TooltipContent>
            </Tooltip>
          ) : (
            <Button
              variant={ButtonVariant.secondary}
              size={ButtonSize.iconLg}
              onClick={toggleTooltips}
            >
              <HelpCircle className="h-5 w-5" />
            </Button>
          )}

          {/* History Button */}
          {tooltipsEnabled ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={ButtonVariant.secondary}
                  size={ButtonSize.iconLg}
                  onClick={onOpenHistory}
                >
                  <History className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {getTooltip(TooltipKey.HISTORY_VIEW)}
              </TooltipContent>
            </Tooltip>
          ) : (
            <Button
              variant={ButtonVariant.secondary}
              size={ButtonSize.iconLg}
              onClick={onOpenHistory}
            >
              <History className="h-5 w-5" />
            </Button>
          )}

          <ClientOnly>{() => <PrivyLogoutButton />}</ClientOnly>
        </nav>
      </div>
    </header>
  )
}
