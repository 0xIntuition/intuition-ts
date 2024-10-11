import React from 'react'

interface FullPageLayoutProps {
  children: React.ReactNode
}

const FullPageLayout: React.FC<FullPageLayoutProps> = ({ children }) => {
  return (
    <div className="max-w-7xl h-full flex grow flex-col items-center p-10 max-lg:p-6">
      {children}
    </div>
  )
}

export default FullPageLayout
