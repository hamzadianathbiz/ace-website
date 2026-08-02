/*
  Badges are drawn here rather than dropped in as image files. There is no
  official CCPA mark at all, and the GDPR ones in circulation are third-party
  artwork with their own licence terms — a shield we draw ourselves carries
  no such baggage, and costs no extra request.
*/
const STANDARDS = [
  { name: 'GDPR', detail: 'EU General Data Protection Regulation' },
  { name: 'CCPA', detail: 'California Consumer Privacy Act' },
]

function Shield() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="h-7 w-7 flex-none text-ace-red"
    >
      <path d="M12 2.5 4.5 5.5v6c0 4.5 3.1 8.4 7.5 10 4.4-1.6 7.5-5.5 7.5-10v-6L12 2.5Z" />
      <path d="m8.8 12 2.3 2.3 4.1-4.6" />
    </svg>
  )
}

export default function Security() {
  return (
    <section className="gutter section-y">
      <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between md:gap-16">
        <div className="flex flex-col gap-4 md:max-w-[560px]">
          <span className="label">Security</span>
          <p className="display-md">
            GDPR and CCPA ready. Data handling, access control and retention
            built to the standards private capital firms are already held to.
          </p>
        </div>

        <ul className="flex flex-none flex-col gap-4 sm:flex-row">
          {STANDARDS.map((standard) => (
            <li
              key={standard.name}
              className="flex items-center gap-4 rounded-2xl border border-ace-line bg-ace-sand px-6 py-5"
            >
              <Shield />
              <div>
                <div className="font-display text-[22px] leading-none text-ace-black">
                  {standard.name}
                </div>
                <div className="mt-2 font-mono text-[10px] uppercase tracking-[.08em] text-ace-muted">
                  Ready
                </div>
              </div>
              {/* The full name is worth having for anyone reading with a
                  screen reader, but it would crowd the badge on screen. */}
              <span className="sr-only">{standard.detail}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
