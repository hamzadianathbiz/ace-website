import type { Metadata } from 'next'
import Header from '@/components/Header'
import PartnerProgram from '@/components/PartnerProgram'
import Footer from '@/components/Footer'
import CallCta from '@/components/CallCta'

export const metadata: Metadata = {
  title: 'Partner Program — ACE',
  description:
    'Introduce ACE to firms in your network and earn from every client you originate, for the life of that client.',
}

export default function Partners() {
  return (
    <>
      <Header />
      {/* Centred lead, on the same 810px measure and type treatment as the
          home page's hero and mission blocks. */}
      <section className="gutter pb-12 pt-8 md:pb-16 md:pt-14">
        <div className="mx-auto flex w-full max-w-[810px] flex-col items-center gap-8">
          <span className="label">Partner Program</span>
          <h1 className="display-xl text-center text-black">
            A Network With Economics Inside It
          </h1>
          <p className="mx-auto max-w-[716px] text-center text-[16px] leading-[1.7] tracking-[-0.017em] text-[#1C1A1A]/70 md:text-[18px]">
            A small group of senior private capital operators who open doors for
            ACE, and earn from every client they originate for as long as that
            client stays. Not a referral scheme with a fee attached.
          </p>
          <CallCta label="Become a Partner" />
        </div>
      </section>
      <PartnerProgram />
      <Footer />
    </>
  )
}
