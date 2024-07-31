import React from 'react'

interface FullPageLayoutProps {
  children: React.ReactNode
}

const FullPageLayout: React.FC<FullPageLayoutProps> = ({ children }) => {
  return <div className="flex flex-col items-center">{children}</div>
}

export default FullPageLayout
