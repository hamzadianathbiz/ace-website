import type { Metadata, Viewport } from 'next'
import { IBM_Plex_Mono, Schibsted_Grotesk, Cardo } from 'next/font/google'
import 'lenis/dist/lenis.css'
import './globals.css'
import SmoothScroll from '@/components/SmoothScroll'

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
  The one serif on the page — hero headline, the statement paragraphs, tile
  and section titles. Cardo came in with the hero spec and now carries all
  of it; Cormorant Garamond used to hold the rest and having two serifs on
  one page was a mismatch.
*/
/*
  400 carries everything on the page. 700 is loaded for one thing only —
  the intro lockup's line, which is set bold on purpose. Cardo ships both
  cuts, so this is the real 700 rather than a browser-synthesised one; do
  not reach for font-bold elsewhere without deciding it belongs there.
*/
const display = Cardo({
  subsets: ['latin'],
  weight: ['400', '700'],
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
      <head>
        {/*
          Arriving at a section — /#services, /#verticals — is not arriving
          at the site, so the intro does not play. On a client-side
          navigation Hero settles itself on mount and this never matters.
          It matters on a hard load of a deep link: the server cannot see a
          hash, so its HTML is the full-bleed opening, and without this the
          page would paint full-screen and then snap into the card.

          Set before first paint, read and cleared by Hero on mount — see
          the note there for why it cannot be left on the element.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `if(location.hash)document.documentElement.dataset.deepLink="1"`,
          }}
        />
      </head>
      <body className="bg-ace-cream font-sans text-ace-black">
        <SmoothScroll />
        {children}
      </body>
    </html>
  )
}
