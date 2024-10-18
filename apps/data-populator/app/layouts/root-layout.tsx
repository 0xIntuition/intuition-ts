import React from 'react'

interface RootLayoutProps {
  children: React.ReactNode
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <div className="h-screen flex">
      <div className="pb-6 flex-grow justify-center flex w-full md:pb-10">
        {children}
      </div>
    </div>
  )
}

export default RootLayout
