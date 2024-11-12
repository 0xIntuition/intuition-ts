import { useEffect, useState } from 'react'

import {
  Button,
  ButtonSize,
  ButtonVariant,
  Text,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@0xintuition/1ui'

import PrivyLogoutButton from '@client/privy-logout-button'
import { getTooltip, TooltipKey } from '@lib/utils/tooltips'
import { Link } from '@remix-run/react'
import { CURRENT_ENV } from 'app/consts'
import { HelpCircle, History } from 'lucide-react'
import { ClientOnly } from 'remix-utils/client-only'

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
              className={`px-2 py-1 rounded-md ${
                CURRENT_ENV === 'production'
                  ? 'text-green-500 bg-green-500/10'
                  : 'text-cyan-500 bg-cyan-500/10'
              }`}
            >
              {CURRENT_ENV === 'production' ? 'MAINNET' : 'TESTNET'}
            </Text>
          )}
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
                  className="text-accent"
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
