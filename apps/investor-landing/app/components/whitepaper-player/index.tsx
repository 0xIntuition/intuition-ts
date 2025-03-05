import '@vidstack/react/player/styles/default/theme.css'
import '@vidstack/react/player/styles/default/layouts/audio.css'
import '@vidstack/react/player/styles/default/layouts/video.css'

import {
  MediaAnnouncer,
  MediaPlayer,
  MediaProvider,
  Poster,
} from '@vidstack/react'
import {
  DefaultAudioLayout,
  defaultLayoutIcons,
} from '@vidstack/react/player/layouts/default'

export function WhitepaperPlayer() {
  return (
    <div className="sm:w-[50vw] w-[90vw] max-w-[600px]">
      <MediaPlayer
        src="assets/whitepaper-podcast.wav"
        viewType="audio"
        streamType="on-demand"
        logLevel="warn"
        crossOrigin
        playsInline
        title="What is Intuition?"
      >
        <MediaProvider>
          <Poster className="vds-poster" />
        </MediaProvider>
        <DefaultAudioLayout
          className="px-6"
          icons={defaultLayoutIcons}
          colorScheme="dark"
        />
        <MediaAnnouncer />
      </MediaPlayer>
    </div>
  )
}
