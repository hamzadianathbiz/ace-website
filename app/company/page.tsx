import type { Metadata } from 'next'
import Header from '@/components/Header'
import CaseStudies from '@/components/CaseStudies'
import FulfillmentPartner from '@/components/FulfillmentPartner'
import OurStory from '@/components/OurStory'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Company',
  description:
    'ACE is an AI advisory and deployment firm for lower-mid and mid-market private capital enterprises.',
  alternates: { canonical: '/company' },
  openGraph: {
    title: 'Company — ACE',
    description:
      'ACE is an AI advisory and deployment firm for lower-mid and mid-market private capital enterprises.',
    url: '/company',
    siteName: 'ACE — AI Deployment Co.',
    type: 'website',
    images: ['/assets/web/hero-cityscape-poster.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Company — ACE',
    description:
      'ACE is an AI advisory and deployment firm for lower-mid and mid-market private capital enterprises.',
    images: ['/assets/web/hero-cityscape-poster.jpg'],
  },
}

export default function CompanyPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <CaseStudies />
        <FulfillmentPartner />
        <OurStory />
      </main>
      <Footer />
    </>
  )
}
