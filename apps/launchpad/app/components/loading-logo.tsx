import React from 'react'

import { cn } from '@0xintuition/1ui'

interface LoadingLogoProps {
  size?: number
  className?: string
}

const LoadingLogo: React.FC<LoadingLogoProps> = ({ size = 300, className }) => {
  return (
    <div className={cn('animate-pulse-slow', className)}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 300 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="animate-spin-slow"
      >
        <g>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M160.133 0.342656C161.316 0.422794 162.196 1.46156 162.099 2.64387L161.591 8.82711C161.494 10.0094 160.457 10.8874 159.273 10.8086C139.849 9.51442 120.36 12.2998 102.063 18.995C83.0936 25.9362 65.8577 36.9143 51.5472 51.1704C37.2366 65.4264 26.1927 82.6202 19.179 101.563C12.4141 119.834 9.55422 139.312 10.7742 158.742C10.8485 159.926 9.96653 160.959 8.78386 161.052L2.59873 161.536C1.41605 161.629 0.380659 160.745 0.305042 159.561C-1.03277 138.616 2.03942 117.614 9.33229 97.9174C16.8739 77.5486 28.749 59.0606 44.1367 43.7316C59.5245 28.4025 78.0577 16.5981 98.4551 9.13438C118.18 1.91679 139.193 -1.07515 160.133 0.342656ZM239.534 32.3403C240.253 31.3963 240.071 30.0472 239.116 29.3424C219.597 14.9257 196.871 5.45943 172.889 1.75665C171.717 1.57563 170.631 2.3965 170.466 3.57137L169.608 9.71569C169.443 10.8906 170.263 11.9744 171.435 12.1567C193.634 15.6087 214.672 24.3715 232.757 37.6992C233.712 38.403 235.059 38.2215 235.777 37.2775L239.534 32.3403ZM282.833 219.68C282.282 220.731 280.976 221.117 279.934 220.551L274.481 217.59C273.439 217.024 273.054 215.721 273.604 214.67C288.233 186.71 292.96 154.593 286.973 123.567C280.985 92.5419 264.648 64.4899 240.665 43.9811C239.764 43.2101 239.636 41.8569 240.393 40.9436L244.352 36.167C245.109 35.2537 246.464 35.1262 247.367 35.8963C273.221 57.9579 290.834 88.1641 297.282 121.578C303.731 154.991 298.622 189.583 282.833 219.68ZM1.27663 169.528C1.12219 168.352 1.96743 167.285 3.14571 167.148L9.30789 166.428C10.4862 166.29 11.5512 167.134 11.7069 168.31C14.0852 186.273 19.9402 203.6 28.9445 219.324C29.534 220.353 29.1992 221.67 28.1789 222.276L22.8433 225.441C21.8231 226.047 20.5039 225.711 19.9132 224.682C10.1588 207.691 3.82726 188.953 1.27663 169.528ZM232.933 272.402C233.598 273.384 233.342 274.721 232.351 275.373C216.191 285.987 198.125 293.381 179.146 297.141C159.465 301.039 139.201 300.95 119.555 296.878C99.9087 292.805 81.279 284.833 64.7687 273.433C48.8478 262.439 35.2097 248.473 24.6004 232.31C23.9495 231.318 24.2461 229.99 25.247 229.353L30.4818 226.023C31.4828 225.387 32.809 225.683 33.461 226.674C43.3158 241.653 55.9698 254.597 70.7349 264.792C86.0895 275.395 103.415 282.809 121.686 286.596C139.957 290.383 158.802 290.467 177.106 286.841C194.707 283.354 211.464 276.506 226.461 266.679C227.453 266.029 228.787 266.284 229.453 267.266L232.933 272.402ZM277.015 229.794C277.646 228.789 277.323 227.467 276.31 226.85L271.01 223.626C269.996 223.009 268.676 223.332 268.044 224.336C259.058 238.605 247.559 251.128 234.105 261.295C233.159 262.01 232.949 263.353 233.65 264.31L237.314 269.317C238.014 270.274 239.359 270.484 240.306 269.769C254.871 258.787 267.311 245.24 277.015 229.794ZM257.757 150C257.757 209.512 209.512 257.757 150 257.757C90.4879 257.757 42.2437 209.512 42.2437 150C42.2437 90.4879 90.4879 42.2437 150 42.2437C209.512 42.2437 257.757 90.4879 257.757 150ZM280.668 150C280.668 222.166 222.166 280.668 150 280.668C77.8342 280.668 19.332 222.166 19.332 150C19.332 77.8342 77.8342 19.332 150 19.332C222.166 19.332 280.668 77.8342 280.668 150Z"
            className="fill-foreground/50 "
          />
        </g>
      </svg>
    </div>
  )
}

export default LoadingLogo
