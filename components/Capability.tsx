import Image from 'next/image'
import serveImage from '@/public/assets/web/who-we-serve.png'
import CallCta from '@/components/CallCta'

const CLIENTS = [
  { num: '01', label: 'Private Equity Funds' },
  { num: '02', label: 'Investment Banks' },
  { num: '03', label: 'M&A Boutiques' },
  { num: '04', label: 'Family Offices' },
  { num: '05', label: 'PE-Backed Portfolio Companies' },
]

export default function Capability() {
  return (
    <section
      id="verticals"
      className="section-y flex scroll-mt-24 flex-col gap-6 px-4 md:flex-row md:items-center md:gap-16 md:pl-gutter md:pr-2"
    >
      <div className="w-full flex flex-col gap-6 md:w-[449px]">
        {/* Eyebrow and heading both, as on the service sections — the red
            tick rides the eyebrow, so the heading does not repeat it. */}
        <span className="label">Verticals</span>
        <h2 className="display-lg">Verticals</h2>
        <p className="text-base leading-[1.6] text-ace-ink md:text-[18px]">
          Private equity funds, investment banks, M&amp;A boutiques, family
          offices and PE-backed portfolio companies. In the lower-mid and
          mid-market.
        </p>
        <p className="text-base leading-[1.6] text-ace-ink md:text-[18px]">
          A unique opportunity exists today where private capital firms can
          create asymmetric upside using frontier technology — without frontier
          level costs. This arbitrage of operational and technological
          breakthrough paves the way for record-breaking growth, creating new
          market leaders and setting higher industry standards.
        </p>
        <ul className="flex flex-col">
          {CLIENTS.map((client) => (
            <li
              key={client.num}
              className="flex items-baseline gap-4 border-t border-ace-line py-4 first:border-t-0"
            >
              <span className="ordinal">{client.num}</span>
              <span className="display-sm">{client.label}</span>
            </li>
          ))}
        </ul>
        <div className="pt-2">
          <CallCta variant="solid" />
        </div>
      </div>
      {/* The floating pill that sat here read as a toggle but did nothing.
          Removed rather than restyled. */}
      <div className="relative h-[300px] w-full overflow-hidden rounded-2xl md:h-[720px] md:w-[608px]">
        <Image
          src={serveImage}
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
