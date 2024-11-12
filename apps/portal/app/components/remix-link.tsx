import { Link } from '@remix-run/react'

const RemixLink = ({
  href,
  onClick,
  children,
}: {
  href: string
  onClick: (e: React.MouseEvent) => void
  children: React.ReactNode
}) => (
  <Link to={href} onClick={onClick}>
    {children}
  </Link>
)

export default RemixLink
