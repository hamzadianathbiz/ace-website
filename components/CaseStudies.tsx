/*
  Three engagements, one paragraph each, largest first. Numbers are the red
  ordinal that every other numbered list on the site uses; the client line is
  mono, like every other small uppercase element.

  Every client is anonymised — described by size, geography and mandate, never
  by name. Sourcing, so these stay checkable internally:
  - 01 Dubai fund — the Atlas build. Module list, seeding counts and sector
    spread are from the live app.
  - 02 $450M buyout fund — the case study document, at the 7-month mark of a
    14-month engagement.
  - 03 UK family office — the 2026-07-06 impact block, counted on live systems
    only. Named in an earlier revision; the name, the holding company and the
    exit that identified him have all been removed.

  No figure here is rounded up from its source, and none is projected.
*/
type CaseStudy = { num: string; client: string; headline: string; body: string }

const CASE_STUDIES: CaseStudy[] = [
  {
    num: '01',
    client: '$4.5 Billion AUM PE Firm, Dubai',
    headline: 'An operating system for the whole investment function',
    body: 'A Dubai-headquartered private equity firm with roughly $4.5B under management. Origination, diligence, portfolio and LP reporting each ran on their own tools, so the analysis a deal team does by hand was done again every time it was needed. We built a single connected surface across the firm’s investment activity: twelve modules running from pipeline CRM and deal scoring through due diligence, financial DD and a knowledge bank, into NDA, CIM and IC memo generation, and out to the portfolio dashboard and LP reporting. The analysis is generated from the deal record rather than assembled beside it — deal scores carry the fit breakdown behind them instead of a black-box number, DCF and LBO models run from WACC out to IRR and MOIC, and diligence checklists, risk registers and QoE reports come off the data room. Every generated artefact lands in an audit log: who, what, when, and from which inputs. It was delivered as a working, navigable product seeded with sixteen of the firm’s own holdings and twenty-one live GCC and India pipeline deals — each with KPIs, value drivers and an exit-readiness score, across healthcare, education, F&B, consumer, mobility, logistics and e-commerce — so the team evaluated it against deals they already knew rather than a demo dataset.',
  },
  {
    num: '02',
    client: '$450M Buyout Fund',
    headline: 'Rebuilding a fund’s institutional memory',
    body: 'A lower-middle-market buyout fund managing $450M across eleven portfolio companies in industrial and business services. The constraint was not strategy — it was knowledge fragmentation. Every deal was treated as an isolated episode, portfolio data ran 30 to 45 days behind, and exit preparation was rebuilt from scratch each time. We built six connected systems across the deal lifecycle, from deal intelligence and an investment-committee memory layer through to a portfolio performance data model and an exit narrative builder. At the seven-month mark of a fourteen-month engagement: IC preparation down 47%, the monthly reporting cycle compressed from eleven days to three, problem detection down from 45–60 days to 12–18, and buyer diligence questions at exit down from an average of 380 to 150.',
  },
  {
    num: '03',
    client: 'UK Family Office — Acquisitions & Private Credit',
    headline: 'Taking the principal out of his own critical path',
    body: 'A single-family office running acquisitions, private credit and property, built around one principal who had exited his operating business. He was the constraint: sourcing, diligence and portfolio oversight all ran through him personally. We deployed nine systems against that — an off-market dealflow agent that emails targets inside his buy-box every morning; a bridging-finance engine that rescans millions of company filings weekly and returns roughly 5,000 qualified leads; a financial diligence agent now live on an active acquisition; and a company brain giving instant recall across every document, call and deal. Measured in July on live systems only, the engagement had returned 350 hours — a pace of around 890 hours a year, or £64,080 of analyst and advisory work at UK market rates.',
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
