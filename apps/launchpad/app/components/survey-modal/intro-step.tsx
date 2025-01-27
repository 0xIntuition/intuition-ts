import { useState } from 'react'

import { Button, Text } from '@0xintuition/1ui'

interface IntroStepProps {
  onNext: () => void
}

const VIDEO_URL =
  'https://res.cloudinary.com/dfpwy9nyv/video/upload/v1724139604/Portal%20Assets/intro-carousel/carousel-5.mp4'
// Generate a thumbnail at 1 second with exact video dimensions and crop
const THUMBNAIL_URL = VIDEO_URL.replace(
  '/upload/',
  '/upload/so_1,c_fill,g_center,w_1920,h_1080,q_auto/',
)

export function IntroStep({ onNext }: IntroStepProps) {
  const [videoError, setVideoError] = useState(false)

  return (
    <div className="flex flex-col overflow-hidden rounded-t-lg">
      <div className="w-full aspect-video relative bg-black">
        <video
          controls
          poster={THUMBNAIL_URL}
          className="absolute inset-0 w-full h-full object-cover"
          onError={() => setVideoError(true)}
          playsInline
        >
          <source src={VIDEO_URL} type="video/mp4" />
          <track kind="captions" srcLang="en" label="English" />
        </video>
      </div>
      <div className="flex flex-col gap-6 p-8">
        {videoError && (
          <Text variant="body" className="text-red-500">
            Error loading video. Please try again later.
          </Text>
        )}
        <Text variant="body" className="text-center">
          I&apos;m baby bitters meh lo-fi neutra brunch. Gatekeep pug literally,
          gentrify artisan PBR&B cliche VHS flexitarian mustache kogi meggings
          sartorial. Everyday carry messenger bag mixtape, 90&apos;s kitsch hot
          chicken 3 wolf
        </Text>
        <div className="flex justify-end">
          <Button variant="secondary" onClick={onNext}>
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
