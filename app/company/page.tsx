import type { Metadata } from 'next'
import Header from '@/components/Header'
import CaseStudies from '@/components/CaseStudies'
import FulfillmentPartner from '@/components/FulfillmentPartner'
import OurStory from '@/components/OurStory'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Company — ACE',
  description:
    'ACE is an AI advisory and deployment firm for lower-mid and mid-market private capital enterprise.',
}

export default function CompanyPage() {
  return (
    <>
      <Header />
      <CaseStudies />
      <FulfillmentPartner />
      <OurStory />
      <Footer />
    </>
  )
}
