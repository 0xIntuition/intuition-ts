import React from 'react'

import { cn } from '@lib/utils/misc'

const ClaimIcon = React.forwardRef<
  HTMLOrSVGElement,
  React.HTMLAttributes<HTMLOrSVGElement>
>(({ className, ...props }) => (
  <svg
    viewBox="0 0 10 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn(className)}
    {...props}
  >
    <g filter="url(#filter0_di_955_10729)">
      <path
        d="M6.93664 3.2469C6.68918 3.2469 6.48786 3.44849 6.48786 3.69628V5.38146V5.60615C6.48786 5.66821 6.43764 5.71849 6.37566 5.71849C6.31368 5.71849 6.26346 5.66821 6.26346 5.60615V5.38146V3.69628V2.12345C6.26346 1.87566 6.06214 1.67407 5.81468 1.67407C5.56722 1.67407 5.36589 1.87566 5.36589 2.12345V4.70739V5.38146C5.36589 5.44352 5.31567 5.4938 5.2537 5.4938C5.19172 5.4938 5.1415 5.44352 5.1415 5.38146V4.70739V2.12345V1.44938C5.1415 1.20159 4.94018 1 4.69271 1C4.44525 1 4.24393 1.20159 4.24393 1.44938V2.12345V4.70739V5.38146C4.24393 5.44352 4.19369 5.4938 4.13173 5.4938C4.06978 5.4938 4.01954 5.44352 4.01954 5.38146V4.70739V2.12345C4.01954 1.87566 3.81821 1.67407 3.57075 1.67407C3.32329 1.67407 3.12196 1.87566 3.12196 2.12345V3.02221V5.38146V5.60615C3.12196 5.66821 3.07172 5.71849 3.00977 5.71849C2.94781 5.71849 2.89757 5.66821 2.89757 5.60615V5.38146V3.02221C2.89757 2.77442 2.69625 2.57283 2.44879 2.57283C2.20133 2.57283 2 2.77442 2 3.02221V7.06663C2 8.55336 3.20795 9.76291 4.69271 9.76291C6.17748 9.76291 7.38543 8.55336 7.38543 7.06663V3.69628C7.38543 3.44849 7.1841 3.2469 6.93664 3.2469ZM4.69271 8.63946C4.0122 8.63946 3.45855 8.08509 3.45855 7.40367C3.45855 6.72225 4.0122 6.16787 4.69271 6.16787C5.37323 6.16787 5.92688 6.72225 5.92688 7.40367C5.92688 8.08509 5.37323 8.63946 4.69271 8.63946Z"
        fill="currentColor"
      />
    </g>
    <g filter="url(#filter1_di_955_10729)">
      <path
        d="M4.69263 6.39256C4.13584 6.39256 3.68286 6.84614 3.68286 7.40367C3.68286 7.96119 4.13584 8.41477 4.69263 8.41477C5.24942 8.41477 5.7024 7.96119 5.7024 7.40367C5.7024 6.84614 5.24942 6.39256 4.69263 6.39256Z"
        fill="currentColor"
      />
    </g>
    <defs>
      <filter
        id="filter0_di_955_10729"
        x="0"
        y="0"
        width="9.3855"
        height="12.7629"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_955_10729"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_955_10729"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="0.5" />
        <feGaussianBlur stdDeviation="0.5" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.48 0"
        />
        <feBlend
          mode="normal"
          in2="shape"
          result="effect2_innerShadow_955_10729"
        />
      </filter>
      <filter
        id="filter1_di_955_10729"
        x="1.68286"
        y="5.39256"
        width="6.01953"
        height="6.02222"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="1" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_955_10729"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_955_10729"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="0.5" />
        <feGaussianBlur stdDeviation="0.5" />
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.48 0"
        />
        <feBlend
          mode="normal"
          in2="shape"
          result="effect2_innerShadow_955_10729"
        />
      </filter>
    </defs>
  </svg>
))

ClaimIcon.displayName = 'ClaimIcon'
export default ClaimIcon
