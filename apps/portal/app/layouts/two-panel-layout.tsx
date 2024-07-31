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
      <main className="w-full flex flex-grow px-7 gap-7">
        <div className="w-[320px]">{leftPanel}</div>
        <div className="flex-1">{rightPanel}</div>
      </main>
      {children}
    </div>
  )
}

export default TwoPanelLayout
