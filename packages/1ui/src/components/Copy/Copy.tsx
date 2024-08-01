import { useState } from 'react'

import { Button, ButtonVariant } from 'components/Button'
import { Icon, IconName } from 'components/Icon'

interface CopyProps extends React.HTMLAttributes<HTMLButtonElement> {
  text: string
  disabled?: boolean
}

const Copy: React.FC<CopyProps> = ({
  text,
  disabled = false,
  className,
  ...props
}) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Button
      variant={ButtonVariant.text}
      className={`p-0 h-4 w-4 ${className}`}
      disabled={disabled}
      onClick={handleCopy}
      {...props}
    >
      <Icon
        name={copied ? IconName.checkmark : IconName.copy}
        className={`h-4 w-4 ${copied ? 'text-success' : disabled ? 'text-muted-foreground' : 'text-primary'}`}
      />
    </Button>
  )
}

export { Copy }
