import CallCta from '@/components/CallCta'

/*
  Its own route since the section came off the home page — so the eyebrow is
  an h1 rather than a span, and the anchor id it used to carry is gone.
*/
export default function Company() {
  return (
    <section className="gutter section-y flex flex-col gap-10 md:flex-row md:items-center">
      <div className="flex flex-1 flex-col justify-between md:self-stretch">
        <h1 className="label">Company</h1>
        <img src="/assets/web/ace-logomark-alpha.png" alt="ACE logomark" className="w-[160px] mt-8 md:mt-0 md:w-[298px]" />
      </div>
      <div className="w-full flex flex-col gap-8 md:w-[497px]">
        <p className="text-base leading-[1.55] text-ace-ink md:text-[20px]">
          ACE is an AI advisory and deployment firm for lower-mid and mid-market
          private capital enterprise. We work with institutions as enablers to
          the future of the financial and operational industry.{' '}
          <span className="font-medium text-ace-black">
            Accelerating Company Excellence.
          </span>
        </p>
        <div>
          <CallCta variant="solid" />
        </div>
      </div>
    </section>
  )
}
