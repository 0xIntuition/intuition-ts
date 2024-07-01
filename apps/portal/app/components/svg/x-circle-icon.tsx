import React from 'react'

import { cn } from '@lib/utils/misc'

const XCircleIcon = React.forwardRef<
  HTMLOrSVGElement,
  React.HTMLAttributes<HTMLOrSVGElement>
>(({ className, ...props }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn(className)}
    {...props}
  >
    <g clipPath="url(#clip0_3514_18687)">
      <path
        d="M10.0007 6.00016L6.00065 10.0002M6.00065 6.00016L10.0007 10.0002M14.6673 8.00016C14.6673 11.6821 11.6826 14.6668 8.00065 14.6668C4.31875 14.6668 1.33398 11.6821 1.33398 8.00016C1.33398 4.31826 4.31875 1.3335 8.00065 1.3335C11.6826 1.3335 14.6673 4.31826 14.6673 8.00016Z"
        stroke="#DD5352"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_3514_18687">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
))

XCircleIcon.displayName = 'XCircleIcon'
export default XCircleIcon
