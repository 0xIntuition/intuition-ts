// ./app/utils/createOGImage.server.tsx
import React from 'react'

import { Resvg } from '@resvg/resvg-js'
import type { SatoriOptions } from 'satori'
import satori from 'satori'

const fontGeistMedium = (baseUrl: string) =>
  fetch(new URL(`${baseUrl}/fonts/Geist-Medium.otf`)).then((res) =>
    res.arrayBuffer(),
  )
// const fontGeistRegular = (baseUrl: string) =>
//   fetch(new URL(`${baseUrl}/fonts/Geist-Regular.otf`)).then((res) =>
//     res.arrayBuffer()
//   )

//   const fontGeistSemiBold = (baseUrl: string) =>
//     fetch(new URL(`${baseUrl}/fonts/Geist-SemiBold.otf`)).then((res) =>
//       res.arrayBuffer()
//     )

export async function createOGImage(title: string, requestUrl: string) {
  const fontData = await fontGeistMedium(requestUrl)

  const options: SatoriOptions = {
    width: 600,
    height: 400,
    fonts: [
      {
        name: 'Geist',
        data: fontData,
        style: 'normal',
      },
    ],
  }

  const svg = await satori(
    <div
      style={{
        width: options.width,
        height: options.height,
        background: 'black',
        color: 'white',
        fontFamily: 'Geist',
        fontSize: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div>{title}</div>
    </div>,
    options,
  )

  // Convert the SVG to PNG with "resvg"
  const resvg = new Resvg(svg)
  const pngData = resvg.render()
  return pngData.asPng()
}
