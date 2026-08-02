/*
  Deliberately empty for now — Hamza is choosing which engagements go here.
  Add entries to CASE_STUDIES and they render; the heading is already in
  place and the nav already points at this anchor.
*/
type CaseStudy = { client: string; headline: string; body: string }

const CASE_STUDIES: CaseStudy[] = []

export default function CaseStudies() {
  return (
    <section id="case-studies" className="gutter section-y scroll-mt-24">
      <div className="flex max-w-[720px] flex-col gap-6">
        <span className="label">Case Studies</span>
        {/* h1 rather than h2: with the Company block gone this is the first
            heading on the route, and the page would otherwise have none. */}
        <h1 className="display-lg">Case Studies</h1>
        {CASE_STUDIES.map((study) => (
          <div key={study.client} className="flex flex-col gap-2 border-t border-ace-line pt-6">
            <span className="ordinal">{study.client}</span>
            <h3 className="display-sm">{study.headline}</h3>
            <p className="text-base leading-[1.7] text-ace-ink md:text-[18px]">{study.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
