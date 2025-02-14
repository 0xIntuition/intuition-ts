import { cn } from '@0xintuition/1ui'

interface LevelIndicatorGraphicProps {
  className?: string
  level?: number
}

export function LevelIndicatorGraphic({
  className,
}: LevelIndicatorGraphicProps) {
  // const fillPercentage = Math.min((level / 20) * 100, 100)

  return (
    <svg
      width="195"
      height="200"
      viewBox="0 0 195 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
    >
      <g filter="url(#filter0_i_18008_32356)">
        <path
          d="M55 138.25L95 175.75L65 132.25L34.5 109.75L55 138.25Z"
          fill="black"
        />
      </g>
      <path
        d="M36.7644 112.042L64.6359 132.603L91.9443 172.2L55.3775 137.919L36.7644 112.042Z"
        stroke="#D4D4D4"
        strokeOpacity="0.2"
      />
      <g filter="url(#filter1_i_18008_32356)">
        <path
          d="M139.5 138.25L99.5 175.75L129.5 132.25L160 109.75L139.5 138.25Z"
          fill="black"
        />
      </g>
      <path
        d="M157.736 112.042L129.864 132.603L102.556 172.2L139.123 137.919L157.736 112.042Z"
        stroke="#D4D4D4"
        strokeOpacity="0.2"
      />
      <g filter="url(#filter2_i_18008_32356)">
        <path
          d="M97.5 139.25L34 92.75L68 131.75L97.5 174.75V139.25Z"
          fill="black"
        />
      </g>
      <path
        d="M68.4123 131.467L68.3959 131.443L68.3769 131.421L37.3286 95.8072L97 139.504V173.137L68.4123 131.467Z"
        stroke="#D4D4D4"
        strokeOpacity="0.2"
      />
      <g filter="url(#filter3_i_18008_32356)">
        <path
          d="M96.5 139.25L160 92.75L126 131.75L96.5 174.75V139.25Z"
          fill="black"
        />
      </g>
      <path
        d="M125.588 131.467L125.604 131.443L125.623 131.421L156.671 95.8072L97 139.504V173.137L125.588 131.467Z"
        stroke="#D4D4D4"
        strokeOpacity="0.2"
      />
      <g filter="url(#filter4_di_18008_32356)">
        <path
          d="M40.5 77.25L97.5 20.25L154.5 77.25L97.5 134.25L40.5 77.25Z"
          fill="black"
        />
        <path
          d="M41.2071 77.25L97.5 20.9571L153.793 77.25L97.5 133.543L41.2071 77.25Z"
          stroke="#D4D4D4"
          strokeOpacity="0.2"
        />
      </g>
      <g filter="url(#filter5_di_18008_32356)">
        <path
          d="M97.5 138.25L106.5 130.25H126.5L97.5 175.75L67.5 130.25H88.5L97.5 138.25Z"
          fill="black"
        />
        <path
          d="M97.1678 138.624L97.5 138.919L97.8322 138.624L106.69 130.75H125.588L97.4929 174.831L68.4286 130.75H88.3099L97.1678 138.624Z"
          stroke="#D4D4D4"
          strokeOpacity="0.2"
        />
      </g>
      <defs>
        <filter
          id="filter0_i_18008_32356"
          x="34.5"
          y="109.75"
          width="60.5"
          height="82"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="16" />
          <feGaussianBlur stdDeviation="8" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_18008_32356"
          />
        </filter>
        <filter
          id="filter1_i_18008_32356"
          x="99.5"
          y="109.75"
          width="60.5"
          height="82"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="16" />
          <feGaussianBlur stdDeviation="8" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_18008_32356"
          />
        </filter>
        <filter
          id="filter2_i_18008_32356"
          x="34"
          y="92.75"
          width="63.5"
          height="98"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="16" />
          <feGaussianBlur stdDeviation="8" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_18008_32356"
          />
        </filter>
        <filter
          id="filter3_i_18008_32356"
          x="96.5"
          y="92.75"
          width="63.5"
          height="98"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="16" />
          <feGaussianBlur stdDeviation="8" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_18008_32356"
          />
        </filter>
        <filter
          id="filter4_di_18008_32356"
          x="0.5"
          y="0.25"
          width="194"
          height="194"
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
          <feOffset dy="20" />
          <feGaussianBlur stdDeviation="20" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.75 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_18008_32356"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_18008_32356"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="-16" />
          <feGaussianBlur stdDeviation="16" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect2_innerShadow_18008_32356"
          />
        </filter>
        <filter
          id="filter5_di_18008_32356"
          x="47.5"
          y="114.25"
          width="99"
          height="85.5"
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
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="10" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_18008_32356"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_18008_32356"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="16" />
          <feGaussianBlur stdDeviation="8" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect2_innerShadow_18008_32356"
          />
        </filter>
      </defs>
      {/* <defs>
        <clipPath id="graphicShape">
          <path d="M55 138.25L95 175.75L65 132.25L34.5 109.75L55 138.25Z" />
          <path d="M139.5 138.25L99.5 175.75L129.5 132.25L160 109.75L139.5 138.25Z" />
          <path d="M97.5 139.25L34 92.75L68 131.75L97.5 174.75V139.25Z" />
          <path d="M96.5 139.25L160 92.75L126 131.75L96.5 174.75V139.25Z" />
          <path d="M40.5 77.25L97.5 20.25L154.5 77.25L97.5 134.25L40.5 77.25Z" />
          <path d="M97.5 138.25L106.5 130.25H126.5L97.5 175.75L67.5 130.25H88.5L97.5 138.25Z" />
        </clipPath>
        <linearGradient id="fillGradient" x1="0" x2="0" y1="1" y2="0">
          <stop offset={`${fillPercentage}%`} stopColor="currentColor" />
          <stop offset={`${fillPercentage}%`} stopColor="transparent" />
        </linearGradient>
        <filter id="levelBlur">
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs> */}

      {/* Background gradient rectangle */}
      <rect
        x="0"
        y="0"
        width="200"
        height="200"
        fill="url(#fillGradient)"
        clipPath="url(#graphicShape)"
        filter="url(#levelBlur)"
      />
    </svg>
  )
}
