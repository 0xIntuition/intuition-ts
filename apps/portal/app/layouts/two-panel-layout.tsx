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
        <div className="w-1/3">{leftPanel}</div>
        <div className="w-2/3">{rightPanel}</div>
      </main>
      {children}
    </div>
  )
}

export default TwoPanelLayout
