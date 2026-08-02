/*
  Its own route, so the eyebrow-plus-heading pair from the Verticals section
  carries the page's h1. Single column, left aligned.
*/
export default function Company() {
  return (
    <section className="gutter section-y">
      <div className="flex max-w-[720px] flex-col gap-6">
        <span className="label">Company</span>
        <h1 className="display-lg">Company</h1>
        <p className="text-base leading-[1.7] text-ace-ink md:text-[18px]">
          ACE is an AI advisory and deployment firm for lower-mid and mid-market
          private capital enterprise. We work with institutions as enablers to
          the future of the financial and operational industry.{' '}
          <span className="text-ace-red">Accelerating Company Excellence.</span>
        </p>
      </div>
    </section>
  )
}
