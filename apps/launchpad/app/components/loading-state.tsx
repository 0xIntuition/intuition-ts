import React from 'react'

import LoadingLogo from './loading-logo'

interface LoadingStateProps {
  size?: number
  className?: string
  containerClassName?: string
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  size = 100,
  className = 'h-[400px]',
  containerClassName,
}) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className={containerClassName}>
        <LoadingLogo size={size} />
      </div>
    </div>
  )
}

export default LoadingState
