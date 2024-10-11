import PrivyLogoutButton from '@client/privy-logout-button'
import { HeaderLogo } from '@components/header-logo'
import { ClientOnly } from 'remix-utils/client-only'

export function Header() {
  return (
    <div className="flex flex-row items-center justify-between mb-8 md:mb-0">
      <HeaderLogo />
      <ClientOnly>{() => <PrivyLogoutButton />}</ClientOnly>
    </div>
  )
}
