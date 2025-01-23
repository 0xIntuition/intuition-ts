'use client'

import { CurveVisualizer } from './components/curve-visualizer'

// This may be unused

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-10">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-bold">Bonding Curves</h1>
            <p className="text-muted-foreground">
              Upload and visualize your custom bonding curve implementations
            </p>
          </div>
          <CurveVisualizer />
        </div>
      </div>
    </div>
  )
}
