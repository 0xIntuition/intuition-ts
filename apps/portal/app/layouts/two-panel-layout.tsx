// app/components/TwoPanelLayout.tsx
import React from 'react'

interface TwoPanelLayoutProps {
  leftPanel: React.ReactNode
  rightPanel: React.ReactNode
  children?: React.ReactNode
}

const TwoPanelLayout: React.FC<TwoPanelLayoutProps> = ({
  leftPanel,
  rightPanel,
  children,
}) => {
  return (
    <div className="w-full h-full flex flex-col">
      <main className="w-full flex flex-grow max-lg:flex-col">
        <div className="w-[400px] bg-primary/5 p-10 max-lg:self-center max-lg:w-full max-lg:p-6 rounded-br-xl">
          <div className="sticky top-10 max-lg:top-6">{leftPanel}</div>
        </div>
        <div className="flex-1 p-10 max-lg:p-6">{rightPanel}</div>
      </main>
      {children}
    </div>
  )
}

export default TwoPanelLayout
