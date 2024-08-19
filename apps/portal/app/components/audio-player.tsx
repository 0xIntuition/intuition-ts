import React, { useEffect, useRef, useState } from 'react'

import {
  Button,
  ButtonSize,
  ButtonVariant,
  Icon,
  IconName,
} from '@0xintuition/1ui'

interface AudioPlayerProps {
  audioSrc: string
}

function AudioPlayer({ audioSrc }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    audioRef.current = new Audio(audioSrc)
    return () => {
      audioRef.current?.pause()
    }
  }, [audioSrc])

  const playPause = () => {
    if (isPlaying) {
      audioRef.current?.pause()
    } else {
      audioRef.current?.play()
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <div>
      <Button
        variant={ButtonVariant.primary}
        size={ButtonSize.icon}
        onClick={playPause}
        className="p-1.5"
      >
        <Icon
          name={isPlaying ? IconName.pause : IconName.play}
          className="h-4 w-4 text-black"
        />
      </Button>
    </div>
  )
}

export default AudioPlayer
