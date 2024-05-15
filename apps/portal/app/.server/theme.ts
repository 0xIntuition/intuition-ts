import { Theme, themesList } from '@0xintuition/1ui'
import * as cookie from 'cookie'

const cookieName = 'theme'

export function getTheme(request: Request): Theme | undefined {
  const cookieHeader = request.headers.get('Cookie')
  const parsed = cookieHeader && cookie.parse(cookieHeader)[cookieName]

  if (themesList.includes(parsed as Theme)) return parsed as Theme

  return undefined
}

// Cookie value set by the server
export function setTheme(theme?: Theme) {
  if (theme) {
    return cookie.serialize(cookieName, theme, { path: '/' })
  } else {
    return cookie.serialize(cookieName, '', { path: '/', maxAge: 0 })
  }
}
