import CallCta from '@/components/CallCta'

/*
  Set like the hero block: centred, on the same 810px measure, Cardo at
  display scale with the hero's tracking. The label sits above rather than
  off to the left, so the section reads as one centred column.
*/
export default function Mission() {
  return (
    <section id="approach" className="gutter section-y scroll-mt-24">
      <div className="mx-auto flex w-full max-w-[810px] flex-col items-center gap-8">
        <span className="label">Mission</span>
        <p className="display-lg text-center text-black">
          ACE advises and deploys AI inside private capital firms. Consultants
          leave a report. Software vendors leave a dashboard. We leave working
          infrastructure, installed in the firm and owned by the firm.
        </p>
        <CallCta variant="solid" />
      </div>
    </section>
  )
}
