import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Brank.AI — AI Brand Monitoring & Visibility Platform';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
          padding: '60px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '32px',
          }}
        >
          <div
            style={{
              fontSize: '72px',
              fontWeight: 800,
              background: 'linear-gradient(90deg, #ffffff 0%, #a78bfa 100%)',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Brank.AI
          </div>
        </div>

        <div
          style={{
            fontSize: '36px',
            fontWeight: 600,
            color: '#ffffff',
            textAlign: 'center',
            marginBottom: '24px',
            maxWidth: '900px',
            lineHeight: 1.3,
          }}
        >
          AI Brand Monitoring & Visibility Platform
        </div>

        <div
          style={{
            fontSize: '22px',
            color: '#94a3b8',
            textAlign: 'center',
            maxWidth: '800px',
            lineHeight: 1.5,
          }}
        >
          Track how ChatGPT, Gemini, Perplexity, and Grok mention, rank, and recommend your brand
        </div>

        <div
          style={{
            display: 'flex',
            gap: '16px',
            marginTop: '40px',
          }}
        >
          {['ChatGPT', 'Gemini', 'Perplexity', 'Grok', 'Claude'].map(
            (name) => (
              <div
                key={name}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '20px',
                  padding: '8px 20px',
                  color: '#e2e8f0',
                  fontSize: '16px',
                  fontWeight: 500,
                }}
              >
                {name}
              </div>
            )
          )}
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: '30px',
            color: '#64748b',
            fontSize: '16px',
          }}
        >
          www.brank.ai
        </div>
      </div>
    ),
    { ...size }
  );
}
