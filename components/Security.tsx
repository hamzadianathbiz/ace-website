import Image from 'next/image'
import complianceImage from '@/public/assets/web/compliance.png'

/*
  Two renderings of the same four standards.

  From md up: the supplied artwork, below the statement rather than beside
  it. It is a 3:1 letterbox and in a side column it would come down to about
  170px tall with the labels unreadable. Its background is transparent, so it
  sits straight on the page ground with no card around it.

  Below md: the artwork fitted to a phone is ~110px tall, which puts "COMING
  SOON" at roughly 6px — present but illegible. Sideways scrolling fixed the
  legibility and cost a swipe to reach SOC 2, which is worse. So the phone
  gets the same four standards as real markup instead: same information, same
  order, no swipe, and it scales with the reader's own text size.
*/
const STANDARDS = [
  { name: 'GDPR', status: 'Ready' },
  { name: 'CCPA', status: 'Ready' },
  { name: 'ISO 27001', status: 'Coming soon' },
  { name: 'SOC 2', status: 'Auditing' },
]

export default function Security() {
  return (
    <section className="gutter section-y">
      <div className="flex flex-col gap-8 md:gap-10">
        <div className="flex flex-col gap-4 md:max-w-[560px]">
          <span className="label">Security</span>
          <p className="display-md">
            GDPR and CCPA ready. Data handling, access control and retention
            built to the standards private capital firms are already held to.
          </p>
        </div>

        <ul className="grid grid-cols-2 gap-3 md:hidden">
          {STANDARDS.map((standard) => (
            <li
              key={standard.name}
              className="flex flex-col gap-1 rounded-xl border border-ace-line bg-ace-sand px-4 py-3"
            >
              <span className="font-display text-[17px] leading-none text-ace-black">
                {standard.name}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[.08em] text-ace-red">
                {standard.status}
              </span>
            </li>
          ))}
        </ul>

        <Image
          src={complianceImage}
          alt="GDPR ready. CCPA ready. ISO 27001 coming soon. SOC 2 auditing."
          sizes="(max-width: 1128px) 100vw, 1128px"
          className="hidden h-auto w-full md:block"
        />
      </div>
    </section>
  )
}
