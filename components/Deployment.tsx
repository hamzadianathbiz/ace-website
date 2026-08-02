import Image from 'next/image'
import deploymentImage from '@/public/assets/web/factory.png'
import CallCta from '@/components/CallCta'

/*
  Second of the two service sections, mirroring Advisory: image left, text
  right. Text still comes first in the DOM — flex-row-reverse handles the
  visual swap, so reading order stays sensible.

  Same box as Advisory's. This source is all but square, so it fills the
  frame with next to nothing lost; Advisory's is 16:9 and crops in from the
  sides to suit. Matching boxes matter more than either filling its own.
*/
export default function Deployment() {
  return (
    <section className="section-y flex flex-col gap-8 px-4 md:flex-row-reverse md:items-center md:gap-16 md:pl-2 md:pr-gutter">
      <div className="flex w-full flex-col gap-6 md:w-[449px]">
        {/* No eyebrow here — the 02 against Advisory's 01 is what ties the
            two sections together, and a second "Services" would just repeat
            the one above. */}
        <div className="flex flex-col gap-4">
          <span className="ordinal">02</span>
          <h2 className="display-lg">Deployment</h2>
          <p className="text-base leading-[1.6] text-ace-ink md:text-[18px]">
            We deploy AI agents, agentic workflows and knowledge layers into
            your organisation. Fully built and managed for you while
            maintaining industry-standard security. Let the pros build your AI
            advantage.
          </p>
        </div>
        <div className="pt-2">
          <CallCta variant="solid" />
        </div>
      </div>
      <div className="relative h-[300px] w-full overflow-hidden rounded-2xl md:h-[600px] md:w-[608px]">
        <Image
          src={deploymentImage}
          alt=""
          fill
          placeholder="blur"
          sizes="(max-width: 768px) 100vw, 608px"
          className="object-cover"
        />
      </div>
    </section>
  )
}
