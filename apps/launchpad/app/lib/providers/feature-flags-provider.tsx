import { createContext, useContext } from 'react'

import { FeatureFlags } from '@server/env'

interface FeatureFlagsContextType {
  featureFlags: FeatureFlags
}

const FeatureFlagsContext = createContext<FeatureFlagsContextType | undefined>(
  undefined,
)

export function useFeatureFlags() {
  const context = useContext(FeatureFlagsContext)
  if (!context) {
    throw new Error(
      'useFeatureFlags must be used within a FeatureFlagsProvider',
    )
  }
  return context
}

interface FeatureFlagsProviderProps {
  children: React.ReactNode
  featureFlags: FeatureFlags
}

export function FeatureFlagsProvider({
  children,
  featureFlags,
}: FeatureFlagsProviderProps) {
  return (
    <FeatureFlagsContext.Provider value={{ featureFlags }}>
      {children}
    </FeatureFlagsContext.Provider>
  )
}
