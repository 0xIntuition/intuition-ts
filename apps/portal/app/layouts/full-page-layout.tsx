import React from 'react'

interface FullPageLayoutProps {
  children: React.ReactNode
}

const FullPageLayout: React.FC<FullPageLayoutProps> = ({ children }) => {
  return (
    <div className="w-full h-full flex flex-col items-center px-40">
      {children}
    </div>
  )
}

export default FullPageLayout
