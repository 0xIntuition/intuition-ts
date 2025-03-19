import { Text } from '@0xintuition/1ui'

import { Link } from '@remix-run/react'

interface FeesTextProps {
  className?: string
}

export function FeesText({ className = '' }: FeesTextProps) {
  return (
    <Text variant="caption" className={`text-end text-primary/70 ${className}`}>
      Standard fees apply.{' '}
      <Link
        to="https://tech.docs.intuition.systems/fees"
        target="_blank"
        rel="noreferrer"
        className="text-primary font-semibold hover:text-accent"
      >
        Learn more
      </Link>
    </Text>
  )
}
