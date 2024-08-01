import { useState } from 'react'

import { Button, ButtonVariant } from 'components/Button'
import { Icon, IconName } from 'components/Icon'
import { cn } from 'styles'

interface CopyProps extends React.HTMLAttributes<HTMLButtonElement> {
  text: string
  disabled?: boolean
  onCopy?: () => void
}

const Copy: React.FC<CopyProps> = ({
  text,
  disabled = false,
  onCopy,
  className,
  ...props
}) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    onCopy && onCopy()
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Button
      variant={ButtonVariant.text}
      className={`p-0 h-4 w-4 text-primary/60 hover:text-primary ${className}`}
      disabled={disabled || copied}
      onClick={handleCopy}
      {...props}
    >
      <Icon
        name={copied ? IconName.checkmark : IconName.copy}
        className={cn(`h-4 w-4`, copied && 'text-success')}
      />
    </Button>
  )
}

export { Copy }
