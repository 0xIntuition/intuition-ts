import { useState } from 'react'

import { cn } from 'styles'

import { Button, ButtonVariant, Icon, IconName, toast } from '..'

interface CopyProps extends React.HTMLAttributes<HTMLButtonElement> {
  text: string
  disabled?: boolean
  onCopy?: () => void
}

const Copy = ({ text, disabled = false, className, ...props }: CopyProps) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    // launch toast if they have a toaster setup in consuming app
    toast?.success('Copied to clipboard!')
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
