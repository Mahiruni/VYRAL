import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'VYRAL — Make work people notice.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#f4f3ee', color: '#111113', padding: '64px 72px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
        <div style={{ width: 58, height: 58, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#111113', color: '#fff', fontSize: 30, fontWeight: 800 }}>ϟ</div>
        <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: '-1.8px' }}>VYRAL</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 930 }}>
        <div style={{ fontSize: 76, lineHeight: 0.95, fontWeight: 600, letterSpacing: '-4px' }}>Make work people <span style={{ color: '#ff3d55' }}>notice.</span></div>
        <div style={{ marginTop: 28, fontSize: 25, lineHeight: 1.35, color: '#68686d' }}>Find the right idea. Make it sharper. Learn what deserves another shot.</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, letterSpacing: '2px', textTransform: 'uppercase', color: '#888880' }}>
        <span>Creator growth, without the noise.</span><span>vyral</span>
      </div>
    </div>,
    { ...size },
  )
}
