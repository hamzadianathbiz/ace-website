import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Mission from '@/components/Mission'
import FeatureTiles from '@/components/FeatureTiles'
import Capability from '@/components/Capability'
import EditorialTopic from '@/components/EditorialTopic'
import Accordion from '@/components/Accordion'
import Company from '@/components/Company'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Mission />
      <FeatureTiles />
      <Capability />
      <EditorialTopic />
      <Accordion />
      <Company />
      <Footer />
    </>
  )
}
