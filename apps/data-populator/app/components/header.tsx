import { useEffect, useState } from 'react'

import { Button } from '@0xintuition/1ui'

import PrivyLogoutButton from '@client/privy-logout-button'
import { Link } from '@remix-run/react'
import { History, Moon, Settings, Sun } from 'lucide-react'
import { ClientOnly } from 'remix-utils/client-only'

export function Header({
  onOpenOptions,
  onOpenHistory,
}: {
  onOpenOptions: () => void
  onOpenHistory: () => void
}) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    if (savedTheme) {
      setTheme(savedTheme)
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark')
    }
  }, [])

  const handleToggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    toggleTheme()
  }
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <img
            src="https://cdn.prod.website-files.com/65cdf366e68587fd384547f0/65d8fe503890d1bc9776916c_intuition-logo-type-ws.svg"
            alt="Intuition Logo"
            className="h-8"
          />
        </Link>
        <nav className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={handleToggleTheme}>
            {theme === 'light' ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Button variant="ghost" size="icon" onClick={onOpenHistory}>
            <History className="h-5 w-5" />
            <span className="sr-only">View History</span>
          </Button>
          <Button variant="ghost" size="icon" onClick={onOpenOptions}>
            <Settings className="h-5 w-5" />
            <span className="sr-only">Options</span>
          </Button>
          <ClientOnly>{() => <PrivyLogoutButton />}</ClientOnly>
        </nav>
      </div>
    </header>
  )
}
