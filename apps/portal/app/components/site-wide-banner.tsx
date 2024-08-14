import { Banner } from '@0xintuition/1ui'

import { featureFlagsSchema } from '@server/env'
import { z } from 'zod'

const SiteWideBanner = ({
  featureFlags,
}: {
  featureFlags: z.infer<typeof featureFlagsSchema>
}) => {
  const bannerData = { variant: '', title: '', message: '' }

  if (featureFlags.FF_GENERIC_BANNER_ENABLED === 'true') {
    console.log('FF_GENERIC_BANNER_ENABLED')
    bannerData.variant = 'info'
    bannerData.title = 'Scheduled Maintenance'
    bannerData.message =
      'Intuition will be temporarily unavailable during scheduled maintenance. We’ll be back online shortly — thanks for your patience!'
  } else if (featureFlags.FF_INCIDENT_BANNER_ENABLED === 'true') {
    console.log('FF_INCIDENT_BANNER_ENABLED')
    bannerData.variant = 'warning'
    bannerData.title = 'Ongoing Incident'
    bannerData.message =
      'Intuition is currently investigating an incident. We’ll be back online shortly — thanks for your patience!'
  } else {
    return null
  }

  return (
    <Banner
      className="m-6 w-auto"
      variant={bannerData.variant}
      title={bannerData.title}
      message={bannerData.message}
    />
  )
}

export default SiteWideBanner
