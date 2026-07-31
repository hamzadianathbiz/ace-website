import CallCta from '@/components/CallCta'

export default function EditorialTopic() {
  return (
    <section className="gutter section-y flex flex-col gap-8 md:flex-row md:gap-12">
      <span className="label flex-1 self-start">Thesis</span>
      <div className="w-full flex flex-col gap-8 md:w-[556px]">
        <p className="display-md">
          The era of financial engineering is over. Rates changed the leverage
          calculus, and buyers now pay premium multiples for three things:
          predictable growth, low execution risk, and processes that survive a
          change of ownership. The lower-mid market is the last segment of
          private capital without systematic access to the infrastructure that
          produces them.
        </p>
        <div>
          <CallCta variant="solid" />
        </div>
      </div>
    </section>
  )
}
