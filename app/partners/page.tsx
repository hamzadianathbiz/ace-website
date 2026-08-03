import type { Metadata } from 'next'
import Image from 'next/image'
import partnersImage from '@/public/assets/web/partners.png'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CallCta from '@/components/CallCta'
import { PARTNER_WAITLIST } from '@/lib/links'

export const metadata: Metadata = {
  title: 'Partner Program',
  description:
    'Introduce ACE to firms in your network and earn from every client you originate, for the life of that client.',
  alternates: { canonical: '/partners' },
  openGraph: {
    title: 'Partner Program — ACE',
    description:
      'Introduce ACE to firms in your network and earn from every client you originate, for the life of that client.',
    url: '/partners',
    siteName: 'ACE — AI Deployment Co.',
    type: 'website',
    images: ['/assets/web/hero-cityscape-poster.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Partner Program — ACE',
    description:
      'Introduce ACE to firms in your network and earn from every client you originate, for the life of that client.',
    images: ['/assets/web/hero-cityscape-poster.jpg'],
  },
}

export default function Partners() {
  return (
    <>
      <Header />
      <main id="main-content">
      {/* Centred lead, on the same 810px measure and type treatment as the
          home page's hero and mission blocks. */}
      <section className="gutter pb-12 pt-8 md:pb-16 md:pt-14">
        <div className="mx-auto flex w-full max-w-[810px] flex-col items-center gap-8">
          <span className="label">Partner Program</span>
          <h1 className="display-xl text-balance text-center text-black">
            We Stand On The Shoulders Of Giants
          </h1>
          <p className="mx-auto max-w-[716px] text-balance text-center text-[16px] leading-[1.7] tracking-[-0.017em] text-[#1C1A1A]/70 md:text-[18px]">
            Currently invite only, the Partner Program at ACE involves
            collaborating on deployment opportunities with veterans of the
            industry.
          </p>
          <CallCta label="Join The Waitlist" href={PARTNER_WAITLIST} />
        </div>
      </section>
      {/* A 4:3 source. On a phone the frame matches it, so nothing is lost
          and the figures stay big enough to read; a 16:9 crop there leaves a
          193px band of silhouettes. From md up it takes the wider frame and
          gives up the top and bottom eighth — the upper window panes and the
          foreground floor — leaving the skyline and the table. */}
      <section className="px-4 pb-4 md:px-6">
        <div className="relative mx-auto aspect-[4/3] w-full max-w-[1128px] overflow-hidden rounded-2xl md:aspect-[16/9]">
          <Image
            src={partnersImage}
            alt=""
            fill
            placeholder="blur"
            sizes="(max-width: 1128px) 100vw, 1128px"
            className="object-cover"
          />
        </div>
      </section>
      {/* PartnerProgram (the black pillars card) removed per Hamza — section
          is being reworked. Component left in place at
          components/PartnerProgram.tsx, just unrendered. */}
      </main>
      <Footer />
    </>
  )
}
