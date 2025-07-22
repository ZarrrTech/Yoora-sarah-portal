// src/app/apple-icon.tsx (Dynamic Apple icon)
import { ImageResponse } from 'next/og'

export const size = {
  width: 180,
  height: 180,
}

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: 'linear-gradient(90deg, #000 0%, #333 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          borderRadius: '20px',
        }}
      >
        YS
      </div>
    ),
    {
      ...size,
    }
  )
}
