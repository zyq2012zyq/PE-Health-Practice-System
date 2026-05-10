import { ImageResponse } from 'next/og'
import fs from 'fs'
import path from 'path'

// Route segment config
export const runtime = 'nodejs'

// Image metadata
export const size = {
  width: 180,
  height: 180,
}
export const contentType = 'image/png'

// Image generation
export default async function Icon() {
  // Read the logo file
  const logoPath = path.join(process.cwd(), 'public', 'logo.png')
  const logoData = fs.readFileSync(logoPath)
  const logoBase64 = logoData.toString('base64')
  const logoUrl = `data:image/png;base64,${logoBase64}`

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'white', // Apple icons usually have a background
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '20%', // Standard Apple icon radius
            overflow: 'hidden',
          }}
        >
          <img
            src={logoUrl}
            width="180"
            height="180"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    }
  )
}
