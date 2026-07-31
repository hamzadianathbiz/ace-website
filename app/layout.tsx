import type { Metadata, Viewport } from 'next'
import { IBM_Plex_Mono, Schibsted_Grotesk, Cardo } from 'next/font/google'
import './globals.css'

/*
  Body font, sitewide — every piece of text on the page that is not a
  display headline or the mono labels. Schibsted Grotesk is a contemporary
  neo-grotesque, the free face closest in spirit to Neue Haas Grotesk,
  whose only cuts on hand are trial-license and so cannot ship. To swap in
  licensed NHG later: drop the .otf files in app/fonts/ and replace this
  block with next/font/local. Nothing else on the site changes.
*/
const sans = Schibsted_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-mono',
})

/*
  The one serif on the page — hero headline, the statement paragraphs, the
  stat numbers. Cardo came in with the hero spec and now carries all of it;
  Cormorant Garamond used to hold the rest and having two serifs on one page
  was a mismatch.
*/
const display = Cardo({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  variable: '--font-display',
})

const DESCRIPTION =
  'AI for lower-mid and mid-market private capital.'

export const metadata: Metadata = {
  // The live production alias. Update when a custom domain is attached —
  // Open Graph and canonical URLs are resolved against this.
  metadataBase: new URL('https://ace-website-liard.vercel.app'),
  title: {
    default: 'ACE — AI Deployment Co.',
    template: '%s — ACE',
  },
  description: DESCRIPTION,
  openGraph: {
    title: 'ACE — AI Deployment Co.',
    description: DESCRIPTION,
    siteName: 'ACE — AI Deployment Co.',
    type: 'website',
    images: [{ url: '/assets/web/ace-logo-tagline.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ACE — AI Deployment Co.',
    description: DESCRIPTION,
    images: ['/assets/web/ace-logo-tagline.png'],
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} ${display.variable}`}>
      <body className="bg-ace-cream font-sans text-ace-black">{children}</body>
    </html>
  )
}
