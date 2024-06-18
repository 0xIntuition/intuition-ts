import React from 'react'

import { cn } from '@lib/utils/misc'

const CheckCircleIcon = React.forwardRef<
  HTMLOrSVGElement,
  React.HTMLAttributes<HTMLOrSVGElement>
>(({ className, ...props }) => (
  <svg
    width="17"
    height="16"
    viewBox="0 0 17 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn(className)}
    {...props}
  >
    <path
      d="M5.4987 7.99967L7.4987 9.99967L11.4987 5.99967M15.1654 7.99967C15.1654 11.6816 12.1806 14.6663 8.4987 14.6663C4.8168 14.6663 1.83203 11.6816 1.83203 7.99967C1.83203 4.31778 4.8168 1.33301 8.4987 1.33301C12.1806 1.33301 15.1654 4.31778 15.1654 7.99967Z"
      stroke="#34C578"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
))

CheckCircleIcon.displayName = 'CheckCircleIcon'
export default CheckCircleIcon
