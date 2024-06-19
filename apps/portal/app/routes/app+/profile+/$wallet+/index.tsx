import { useState } from 'react'

import { SegmentedControl, SegmentedControlItem } from '@0xintuition/1ui'

import { userProfileRouteOptions } from '@lib/utils/constants'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

export async function loader() {
  return json({
    message: 'hack the planet',
  })
}

export default function ProfileOverview() {
  const { message } = useLoaderData<typeof loader>()
  const [selectedTab, setSelectedTab] = useState(
    userProfileRouteOptions[0].value,
  )

  return (
    <div className="m-8 flex flex-col items-center gap-4">
      <SegmentedControl>
        {userProfileRouteOptions.map((option, index) => (
          <SegmentedControlItem
            key={index}
            isActive={selectedTab === option.value}
            onClick={() => setSelectedTab(option.value)}
          >
            {option.label}
          </SegmentedControlItem>
        ))}
      </SegmentedControl>
      )<div className="flex flex-col">Profile Overview Route</div>
      <div>{message}</div>
    </div>
  )
}
