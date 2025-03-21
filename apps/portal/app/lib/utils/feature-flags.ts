/**
 * Feature flags for Portal-specific functionality
 */

export const FEATURE_FLAGS = {
  SOCIAL_LINKING:
    typeof window !== 'undefined'
      ? window.ENV?.ENABLE_SOCIAL_LINKING === 'true'
      : import.meta.env.VITE_ENABLE_SOCIAL_LINKING === 'true',
} as const

export type FeatureFlag = keyof typeof FEATURE_FLAGS

/**
 * Check if a feature flag is enabled
 */
export function isFeatureEnabled(flag: FeatureFlag): boolean {
  return FEATURE_FLAGS[flag]
}

/**
 * Get all enabled features
 */
export function getEnabledFeatures(): FeatureFlag[] {
  return Object.entries(FEATURE_FLAGS)
    .filter(([, enabled]) => enabled)
    .map(([flag]) => flag as FeatureFlag)
}
