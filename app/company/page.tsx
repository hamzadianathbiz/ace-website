import type { Metadata } from 'next'
import Header from '@/components/Header'
import Company from '@/components/Company'
import EditorialTopic from '@/components/EditorialTopic'
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
      <Company />
      {/* Same Thesis block the home page carries — rendered on both routes
          on purpose, not by accident. */}
      <EditorialTopic />
      <Footer />
    </>
  )
}
