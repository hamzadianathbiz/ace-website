import CallCta from '@/components/CallCta'

/*
  Real measured figures from a single engagement, not blended averages across
  a client base — the attribution line below the block says so explicitly.
  Do not add a number here that cannot be traced to a specific engagement.
*/
const STATS = [
  { value: '47', unit: '%', caption: 'Less time preparing for investment committee' },
  { value: '3.6', unit: 'X', caption: 'Faster monthly reporting cycle' },
  { value: '61', unit: '%', caption: 'Fewer buyer diligence questions at exit' },
]

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
        <div className="stats">
          {STATS.map((stat) => (
            <div className="stat" key={stat.caption}>
              <div className="num">
                {stat.value}
                <sup>{stat.unit}</sup>
              </div>
              <div className="cap">{stat.caption}</div>
            </div>
          ))}
        </div>
        <p className="font-mono text-[11px] leading-[1.5] tracking-[.04em] text-ace-muted md:text-[12px]">
          Measured over a 14-month engagement with a $450M buyout fund. Named on
          request, with the client&rsquo;s permission.
        </p>
      </div>
    </section>
  )
}
