import { useState } from 'react'

import { sliceString } from '@lib/utils/misc'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckIcon, Fingerprint } from 'lucide-react'

interface IdentityIdProps {
  identity_id: string
  full_id?: string
}

/**
 * The IdentityID component displays an identity's unique identifier with an option to copy to clipboard.
 * It takes an identity ID as a string and provides a clickable element to copy the ID to the clipboard.
 */
export function IdentityID({ identity_id, full_id }: IdentityIdProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(full_id ? full_id : identity_id)
    if (!copied) {
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
      }, 2000)
    }
  }

  return (
    <div
      tabIndex={0}
      role="button"
      className="group flex cursor-pointer items-center gap-1 text-xxs text-primary-500 transition-all duration-300 hover:brightness-200"
      onClick={handleCopy}
      onKeyDown={(e) => {
        if (e.key === 'Enter') handleCopy()
      }}
    >
      {sliceString(identity_id, 20, 4, 18)}{' '}
      <AnimatePresence mode="wait">
        {!copied ? (
          <motion.div
            key="identityIcon"
            className="h-4 w-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Fingerprint className="h-4 w-4" />
          </motion.div>
        ) : (
          <motion.div
            key="checkIcon"
            className="h-4 w-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CheckIcon className="h-4 w-4 text-success" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
