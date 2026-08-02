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
      className="flex scroll-mt-24 flex-col gap-8 px-4 py-0 md:flex-row md:items-center md:pr-2 md:pl-gutter"
    >
      <div className="w-full flex flex-col gap-6 md:w-[449px]">
        <span className="label">Verticals</span>
        <p className="text-base leading-[1.6] text-ace-ink md:text-[18px]">
          Private equity funds in the lower-mid and mid market, investment
          banks, M&amp;A boutiques, family offices, and the portfolio companies
          those funds already own.
        </p>
        <p className="text-base leading-[1.6] text-ace-ink md:text-[18px]">
          What they have in common is a firm running on partner memory,
          spreadsheets and hundred-page documents nobody can query. That
          fragmentation shows up as decision latency: the gap between a pattern
          emerging and the firm acting on it. The gap is a tax on returns, and
          closing it is what we are paid for.
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
      <div className="relative h-[300px] w-full overflow-hidden rounded-2xl md:h-[760px] md:w-[608px]">
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
