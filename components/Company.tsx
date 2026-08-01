import CallCta from '@/components/CallCta'

export default function Company() {
  return (
    <section
      id="company"
      className="gutter section-y flex scroll-mt-24 flex-col gap-10 md:flex-row md:items-center"
    >
      <div className="flex flex-1 flex-col justify-between md:self-stretch">
        <span className="label">Company</span>
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
