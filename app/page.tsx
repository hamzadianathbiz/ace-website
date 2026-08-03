import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Advisory from '@/components/Advisory'
import Deployment from '@/components/Deployment'
import Capability from '@/components/Capability'
import Security from '@/components/Security'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <Advisory />
        <Deployment />
        <Capability />
        <Security />
      </main>
      <Footer />
    </>
  )
}
