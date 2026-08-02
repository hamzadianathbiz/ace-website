import Image from 'next/image'
import advisoryImage from '@/public/assets/web/city.png'
import CallCta from '@/components/CallCta'

/*
  First of the two service sections. Carries id="services" because that is
  where the nav's Services link lands — Advisory is the top of the pair.

  Text left, image right, the image running out to the right edge. Deployment
  mirrors it, so the two read as a pair rather than a repeat.
*/
export default function Advisory() {
  return (
    <section
      id="services"
      className="section-y flex scroll-mt-24 flex-col gap-8 px-4 md:flex-row md:items-center md:gap-16 md:pl-gutter md:pr-2"
    >
      <div className="flex w-full flex-col gap-6 md:w-[449px]">
        <span className="label">Services</span>
        {/* Ordinal, title and body are one group — the section eyebrow sits
            apart from them, at the wider gap. */}
        <div className="flex flex-col gap-4">
          <span className="ordinal">01</span>
          <h2 className="display-lg">Advisory</h2>
          <p className="text-base leading-[1.6] text-ace-ink md:text-[18px]">
            We advise on tooling, governance and AI opportunity. No more
            second-guessing models or burning through your token limits.
            Frontier AI technology is useless without the right direction.
          </p>
        </div>
        <div className="pt-2">
          <CallCta variant="solid" />
        </div>
      </div>
      <div className="relative h-[300px] w-full overflow-hidden rounded-2xl md:h-[600px] md:w-[608px]">
        {/* 16:9 source in a near-square frame, so it crops in from the sides.
            Pulled right of centre: the Gherkin sits about 78% across and was
            landing on the crop edge. At 65% the visible band runs roughly
            28-85%, which keeps St Paul's and brings the Gherkin well in. */}
        <Image
          src={advisoryImage}
          alt=""
          fill
          placeholder="blur"
          sizes="(max-width: 768px) 100vw, 608px"
          className="object-cover object-[65%_center]"
        />
      </div>
    </section>
  )
}
