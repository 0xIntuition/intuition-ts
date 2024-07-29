import React, { useState } from 'react'

import { Icon, IconName } from '@0xintuition/1ui'

interface CopyComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string
  disabled?: boolean
}

export const CopyComponent: React.FC<CopyComponentProps> = ({
  text,
  disabled = false,
  className,
  ...props
}) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    if (!disabled) {
      navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div
      className={`uppercase flex items-center cursor-pointer gap-2 ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      onClick={handleCopy}
      onKeyDown={(e) => e.key === 'Enter' && handleCopy()}
      tabIndex={0}
      role="button"
      {...props}
    >
      {text}
      <Icon
        name={copied ? IconName.checkmark : IconName.copy}
        className="h-4 w-4"
      />
    </div>
  )
}
