/*
  Three engagements, one paragraph each. Numbers are the red ordinal that
  every other numbered list on the site uses; the client line is mono, like
  every other small uppercase element.

  Sourcing, so these stay checkable:
  - 01 Rakesh Thakrar — named. Figures are the 2026-07-06 impact block,
    counted on live systems only.
  - 02 $450M buyout fund — the case study document, at the 7-month mark of a
    14-month engagement. Unnamed, as it is in the source.
  - 03 Dubai fund — anonymised at Hamza's instruction. Module and seeding
    counts are from the live build.

  No figure here is rounded up from its source, and none is projected.
*/
type CaseStudy = { num: string; client: string; headline: string; body: string }

const CASE_STUDIES: CaseStudy[] = [
  {
    num: '01',
    client: 'Rakesh Thakrar — RT74 Limited',
    headline: 'Taking the principal out of his own critical path',
    body: 'Rakesh exited a £50M recruitment business and now runs acquisitions, private credit and property through RT74. The constraint was him — sourcing, diligence and portfolio oversight all ran through one person. We deployed nine systems against that: an off-market dealflow agent that emails targets inside his buy-box every morning; BRIDGER, a bridging-finance engine that rescans millions of filings weekly and returns roughly 5,000 qualified leads; a financial diligence agent now live on an active acquisition; and a company brain giving instant recall across every document, call and deal. Measured in July on live systems only, the engagement had returned 350 hours — a pace of around 890 hours a year, or £64,080 of analyst and advisory work at UK market rates. Against the retainer, a 3.6x return.',
  },
  {
    num: '02',
    client: '$450M buyout fund',
    headline: 'Rebuilding a fund’s institutional memory',
    body: 'A lower-middle-market buyout fund managing $450M across eleven portfolio companies in industrial and business services. The constraint was not strategy — it was knowledge fragmentation. Every deal was treated as an isolated episode, portfolio data ran 30 to 45 days behind, and exit preparation was rebuilt from scratch each time. We built six connected systems across the deal lifecycle, from deal intelligence and an investment-committee memory layer through to a portfolio performance data model and an exit narrative builder. At the seven-month mark of a fourteen-month engagement: IC preparation down 47%, the monthly reporting cycle compressed from eleven days to three, problem detection down from 45–60 days to 12–18, and buyer diligence questions at exit down from an average of 380 to 150.',
  },
  {
    num: '03',
    client: 'Anonymous — $4.5B AUM, Dubai',
    headline: 'One operating layer for the whole investment function',
    body: 'A Dubai-headquartered private equity firm managing $4.5B, engaged as a pilot. We built a single operating layer across the firm’s investment activity — twelve modules spanning pipeline, portfolio monitoring, diligence and reporting, seeded with sixteen portfolio companies and twenty-one live pipeline deals. The pilot existed to prove one thing: that deal flow, portfolio performance and institutional knowledge can live in one system partners actually use, rather than three that nobody updates.',
  },
]

export default function CaseStudies() {
  return (
    <section id="case-studies" className="gutter section-y scroll-mt-24">
      <div className="flex max-w-[720px] flex-col gap-6">
        <span className="label">Case Studies</span>
        {/* h1 rather than h2: with the Company block gone this is the first
            heading on the route, and the page would otherwise have none. */}
        <h1 className="display-lg">Case Studies</h1>

        {/* Its own column, so the rule between entries is not fighting the
            24px gap that separates the eyebrow, heading and first item. */}
        <div className="mt-2 flex flex-col gap-10">
          {CASE_STUDIES.map((study) => (
            <article key={study.num} className="flex flex-col gap-2 border-t border-ace-line pt-6">
              <div className="flex items-center gap-3">
                <span className="ordinal">{study.num}</span>
                <span className="font-mono text-[11px] uppercase tracking-[.08em] text-ace-muted md:text-[12px]">
                  {study.client}
                </span>
              </div>
              <h2 className="display-sm">{study.headline}</h2>
              <p className="mt-1 text-base leading-[1.7] text-ace-ink md:text-[18px]">
                {study.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
