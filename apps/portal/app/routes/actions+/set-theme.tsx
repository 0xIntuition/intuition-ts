import { Theme, isTheme } from '@0xintuition/1ui'
import { json } from '@remix-run/node'
import type { ActionFunction } from '@remix-run/node'
import { useFetcher } from '@remix-run/react'
import { setTheme } from '@server/theme'

import { useHints } from '@lib/utils/client-hints'
import { useRequestInfo } from '@lib/utils/request-info'

export const action: ActionFunction = async ({ request }) => {
  const requestText = await request.text()
  const form = new URLSearchParams(requestText)
  const theme = form.get('theme')

  if (!isTheme(theme)) {
    return json({
      success: false,
      message: `theme value of ${theme} is not a valid theme`,
    })
  }

  return json(
    { success: true },
    {
      headers: {
        'Set-Cookie': setTheme(theme === 'system' ? undefined : theme),
      },
    },
  )
}

export function ThemeSwitch() {
  const fetcher = useFetcher()

  const handleSelect = (themeValue: Theme) => {
    fetcher.submit(
      { theme: themeValue },
      { method: 'post', action: '/actions/set-theme' },
    )
  }

  return (
    <div>
      <button onClick={() => handleSelect(Theme.LIGHT)}>Light</button>
      <button onClick={() => handleSelect(Theme.DARK)}>Dark</button>
      <button onClick={() => handleSelect(Theme.SYSTEM)}>System</button>
    </div>
  )
}

/**
 * @returns the user's theme preference, or the client hint theme if the user
 * has not set a preference.
 */
export function useTheme() {
  const hints = useHints()
  const requestInfo = useRequestInfo()
  return requestInfo.userPrefs.theme ?? hints.theme
}
