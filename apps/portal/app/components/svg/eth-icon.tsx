import React from 'react'

import { cn } from '@lib/utils/misc'

const EthIcon = React.forwardRef<
  HTMLOrSVGElement,
  React.HTMLAttributes<HTMLOrSVGElement>
>(({ className, ...props }) => (
  <svg
    width="8"
    height="12"
    viewBox="0 0 8 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn(className)}
    {...props}
  >
    <g opacity="0.6">
      <path
        d="M3.92522 8.02409L3.99896 8.09771L7.37521 6.10202L3.99896 0.5L3.92522 0.750655V8.02409Z"
        fill="currentColor"
      />
      <path
        d="M3.99898 8.09773V0.5L0.622726 6.10202L3.99898 8.09773Z"
        fill="currentColor"
      />
      <path
        d="M3.95744 11.3785L3.999 11.4999L7.37728 6.74219L3.99903 8.73688L3.95747 8.78754L3.95744 11.3785Z"
        fill="currentColor"
      />
      <path
        d="M0.622726 6.74219L3.99898 11.4999V8.73688L0.622726 6.74219Z"
        fill="currentColor"
      />
      <path
        d="M3.99895 4.56738V8.09764L7.37514 6.10197L3.99895 4.56738Z"
        fill="currentColor"
      />
      <path
        d="M3.99892 4.56738L0.622726 6.10195L3.99892 8.09761V4.56738Z"
        fill="currentColor"
      />
    </g>
  </svg>
))

EthIcon.displayName = 'EthIcon'
export default EthIcon
