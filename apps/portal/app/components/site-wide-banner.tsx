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
    bannerData.variant = 'info'
    bannerData.title = "Ongoing Incident with Quest 'Chapter 3: Language'"
    bannerData.message =
      "We are currently investigating an issue with quest 'Chapter 3: Language'.  We have removed the requirement to move on to quest 'Chapter 4: Expression'.  Please wait until this banner goes away to make a ticket if the issue persists."
  } else if (featureFlags.FF_INCIDENT_BANNER_ENABLED === 'true') {
    bannerData.variant = 'warning'
    bannerData.title =
      "We're currently doing maintenance on the Portal, degraded performance is expected."
    bannerData.message =
      'If you have any issues please wait until this banner goes away to make a ticket if the issue persists.  Thank you for your patience.'
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
