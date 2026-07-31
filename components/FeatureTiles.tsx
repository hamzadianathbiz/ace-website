import CallCta from '@/components/CallCta'

/* The two halves of the business, one tile each. */
const TILES = [
  {
    num: '01',
    title: 'Advise',
    body: 'Where AI actually pays inside your firm, and where it does not. We map the workflow, score it against the work that moves returns, and tell you what is worth building before anyone writes code.',
  },
  {
    num: '02',
    title: 'Deploy',
    body: 'The system gets built, installed in the workflow your team already uses, and handed over. No pilot that never ships, no dependency on us to keep it running.',
  },
]

export default function FeatureTiles() {
  return (
    <section className="flex flex-col gap-4 px-4 py-4 md:flex-row md:px-6">
      {TILES.map((tile) => (
        // flex-1 is column-axis on mobile and would collapse h-[300px] to zero.
        <div
          key={tile.num}
          className="flex min-h-[300px] flex-col justify-end gap-6 rounded-2xl bg-ace-sand p-8 md:min-h-[604px] md:flex-1 md:p-12"
        >
          <div className="flex flex-col gap-4">
            <span className="font-mono text-[11px] tracking-[.08em] text-ace-red md:text-[12px]">
              {tile.num}
            </span>
            <h2 className="display-lg">
              {tile.title}
            </h2>
            <p className="max-w-[420px] text-base leading-[1.6] text-ace-ink md:text-[18px]">
              {tile.body}
            </p>
          </div>
          <div>
            <CallCta />
          </div>
        </div>
      ))}
    </section>
  )
}
