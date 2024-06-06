// The Geotargetly service handles the redirects to this route so we don't need to do it with a loader

import { Button } from '@0xintuition/1ui'

import { SquareX } from 'lucide-react'

export default function Restricted() {
  return (
    <div className="mt-16 flex h-full w-full flex-col items-center">
      <div className="flex w-[92vw] max-w-[728px] flex-col p-16 max-w-xl gap-2.5">
        <div className="flex items-center text-secondary-foreground/70 gap-2">
          <SquareX />
          <span>Access Restricted</span>
        </div>
        <h2 className="text-white text-semibold text-3xl lg:text-4xl">
          Intuition is Not Available in Your Region
        </h2>
        <p className="text-secondary-foreground/40 text-lg font-medium leading-6">
          We&apos;re sorry, but Intuition is not available in your region at the
          moment. Please check back later or contact our support team for more
          information.
        </p>
        <p className="text-secondary-foreground/40 text-lg font-medium leading-6">
          In the meantime, join our Discord community to stay updated and
          connect with us!
        </p>
        <Button className="w-fit mt-3.5" variant="secondary">
          Join our Discord
        </Button>
      </div>
    </div>
  )
}
