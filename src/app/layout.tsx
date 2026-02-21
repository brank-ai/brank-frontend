import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Script from 'next/script';
import { Toaster } from 'sonner';
import StyledComponentsRegistry from '@/lib/StyledComponentsRegistry';
import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.brank.ai'),
  title: {
    default: 'Brank.AI - Measure and improve how AI recommends your brand',
    template: '%s | Brank.AI',
  },
  description:
    'Track and improve how AI models like ChatGPT, Gemini, Perplexity, and Claude mention, rank, and recommend your brand. AI brand monitoring and visibility platform.',
  applicationName: 'Brank.AI',
  keywords: [
    'AI brand monitoring',
    'AI brand visibility',
    'LLM brand tracking',
    'ChatGPT brand recommendations',
    'AI search optimization',
    'brand AI presence',
    'AI SEO',
    'LLM optimization',
    'Gemini brand visibility',
    'Perplexity brand tracking',
    'AI brand analytics',
    'brand mention tracking',
    'AEO Indexing',
    'GEO Indexing',
    'AEO brand performance',
    'GEO brand performance',
    'AEO brand visibility',
    'GEO brand visibility',
  ],
  authors: [{ name: 'Brank.AI', url: 'https://www.brank.ai' }],
  creator: 'Brank.AI',
  publisher: 'Brank Inc',
  icons: {
    icon: '/images/brank-logo.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Brank.AI',
    title: 'Brank.AI - Measure and improve how AI recommends your brand',
    description:
      'Track and improve how AI models like ChatGPT, Gemini, Perplexity, and Claude mention, rank, and recommend your brand.',
    url: 'https://www.brank.ai',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@brank_ai',
    creator: '@brank_ai',
    title: 'Brank.AI - Measure and improve how AI recommends your brand',
    description:
      'Track and improve how AI models like ChatGPT, Gemini, Perplexity, and Claude mention, rank, and recommend your brand.',
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  alternates: {
    canonical: 'https://www.brank.ai',
  },
  other: {
    'theme-color': '#050505',
    // Google Search Console — replace with your verification code
    // 'google-site-verification': 'YOUR_GOOGLE_VERIFICATION_CODE',
    // Bing Webmaster Tools — replace with your verification code
    // 'msvalidate.01': 'YOUR_BING_VERIFICATION_CODE',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Brank.AI',
              url: 'https://www.brank.ai',
              logo: 'https://www.brank.ai/images/brank-logo.svg',
              description:
                'AI brand monitoring and visibility platform. Track how ChatGPT, Gemini, Perplexity, and Claude recommend your brand.',
              sameAs: ['https://x.com/brank_ai'],
              foundingDate: '2024',
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'customer support',
                url: 'https://www.brank.ai',
              },
            }),
          }}
        />

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-N3VJ78Z3SQ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-N3VJ78Z3SQ');
          `}
        </Script>

        {/* Microsoft Clarity */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "vks2nlc3t5");
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StyledComponentsRegistry>
          {children}
        </StyledComponentsRegistry>
        <Toaster
          theme="dark"
          position="top-center"
          toastOptions={{
            style: {
              background: '#1a1a1a',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#fff',
            },
          }}
        />
      </body>
    </html>
  );
}
