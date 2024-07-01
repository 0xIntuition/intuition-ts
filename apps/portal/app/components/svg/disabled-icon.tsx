import React from 'react'

import { cn } from '@lib/utils/misc'

const DisabledIcon = React.forwardRef<
  HTMLOrSVGElement,
  React.HTMLAttributes<HTMLOrSVGElement>
>(({ className, ...props }) => (
  <svg
    width="74"
    height="74"
    viewBox="0 0 74 74"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn(className)}
    {...props}
  >
    <path
      d="M37 67.8334C54.0288 67.8334 67.8334 54.0289 67.8334 37.0001C67.8334 19.9713 54.0288 6.16675 37 6.16675C19.9712 6.16675 6.16669 19.9713 6.16669 37.0001C6.16669 54.0289 19.9712 67.8334 37 67.8334Z"
      stroke="currentColor"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15.2008 15.2009L58.7991 58.7993"
      stroke="currentColor"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
))

DisabledIcon.displayName = 'DisabledIcon'
export default DisabledIcon
