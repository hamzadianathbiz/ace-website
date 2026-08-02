import Image from 'next/image'
import aszLogo from '@/public/assets/web/asz-technologies.png'

/*
  The wordmark is transparent, so it sits straight on the cream with no
  plate behind it. Rendered at 200px against a 342px source, which leaves
  enough pixels for a retina screen.
*/
export default function FulfillmentPartner() {
  return (
    <section id="fulfillment-partner" className="gutter section-y scroll-mt-24">
      <div className="flex max-w-[720px] flex-col gap-6">
        <span className="label">Fulfillment Partner</span>
        {/* Heading left, wordmark hard right on the same line. The heading is
            allowed to wrap and the logo is flex-none, so on a narrow screen
            the title takes two lines rather than the mark being squeezed. */}
        <div className="flex items-center justify-between gap-6">
          <h2 className="display-lg">Fulfillment Partner</h2>
          <Image
            src={aszLogo}
            alt="ASZ Technologies"
            sizes="180px"
            className="h-auto w-[120px] flex-none md:w-[180px]"
          />
        </div>
        <p className="text-base leading-[1.7] text-ace-ink md:text-[18px]">
          We have partnered with ASZ Technologies who boast a team of 42
          experienced developers and who have experience working with household
          names like Patek Philippe, Pfizer and NUS. ACE leverages the technical
          knowledge and domain expertise of ASZ to deploy enterprise grade
          services to our clientele.
        </p>
      </div>
    </section>
  )
}
