import { useEffect, useRef, useState } from 'react'

import { useNavigate } from '@remix-run/react'

export default function Teleport() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const navigate = useNavigate()
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [videoChunk, setVideoChunk] = useState(0)

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.muted = false
      videoRef.current.play().catch((error) => {
        console.error('Error playing video:', error)
        setHasError(true)
      })
      setIsPlaying(true)
      requestFullscreen()
    }
  }

  const handleVideoEnd = () => {
    exitFullscreen()
    navigate('/app/profile')
  }

  const handleLoadedData = () => {
    setIsLoading(false)
  }

  const handleChunkLoaded = () => {
    setVideoChunk((prevChunk) => prevChunk + 1)
  }

  const requestFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen()
        setIsFullscreen(true)
      } else if (videoRef.current.webkitRequestFullscreen) {
        videoRef.current.webkitRequestFullscreen()
        setIsFullscreen(true)
      } else if (videoRef.current.msRequestFullscreen) {
        videoRef.current.msRequestFullscreen()
        setIsFullscreen(true)
      }
    }
  }

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen()
      setIsFullscreen(false)
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
      setIsFullscreen(false)
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen()
      setIsFullscreen(false)
    }
  }

  useEffect(() => {
    if (hasError) {
      setTimeout(() => {
        navigate('/app/profile')
      }, 1000) // Navigate to next page after 1 second if video fails to play
    }
  }, [hasError, navigate])

  useEffect(() => {
    if (isPlaying && videoRef.current && videoRef.current.paused) {
      setTimeout(() => {
        if (videoRef.current && videoRef.current.paused) {
          setHasError(true)
        }
      }, 2000) // Check if video is still paused after 2 seconds
    }
  }, [isPlaying])

  return (
    <div className="relative flex items-center justify-center h-screen overflow-hidden bg-black">
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-fit"
        loop={false} // Remove the loop attribute to allow the video to end
        playsInline
        controls={false} // Hide video controls
        poster="https://storage.googleapis.com/intuition-ts-assets-v1/video-poster.jpg" // Add an optional poster image
        preload="metadata" // Load only the metadata initially
        onEnded={handleVideoEnd} // Add an event handler for when the video ends
        onLoadedData={handleLoadedData} // Add an event handler for when the video data is loaded
        onLoadedMetadata={handleChunkLoaded} // Add an event handler for when the video metadata is loaded
      >
        <source
          src={`https://storage.googleapis.com/intuition-ts-assets-v1/relic_legendary_v2_compressed.mp4#t=${videoChunk}`}
          type="video/mp4"
        />
        <track
          kind="captions"
          srcLang="en"
          src="https://storage.googleapis.com/intuition-ts-assets-v1/relic_legendary_v2_captions.vtt"
        />
      </video>
      {isLoading && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-lg">
          Loading video...
        </div>
      )}
      {!isPlaying && !hasError && !isLoading && (
        <button
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 text-white py-4 px-8 rounded-lg font-bold text-lg hover:bg-gray-700"
          onClick={handlePlay}
        >
          Begin
        </button>
      )}
      {hasError && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-lg">
          Error playing video. Redirecting to next page...
        </div>
      )}
    </div>
  )
}
