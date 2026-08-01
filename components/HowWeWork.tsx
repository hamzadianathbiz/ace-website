import Image from 'next/image'
import factoryImage from '@/public/assets/web/factory.png'
import CallCta from '@/components/CallCta'

/*
  Replaces the old Mission section and the old Advise/Deploy feature tiles
  in one move: this is now the first section after the hero, and it carries
  the two-halves-of-the-business copy that used to live in FeatureTiles.
*/
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

export default function HowWeWork() {
  return (
    <section id="who-we-are" className="scroll-mt-24 px-4 py-4 md:px-6">
      <div className="on-dark relative overflow-hidden rounded-2xl bg-ace-black">
        <Image
          src={factoryImage}
          alt=""
          fill
          placeholder="blur"
          sizes="(max-width: 1128px) 100vw, 1128px"
          className="object-cover"
        />
        {/* The sunset half of the source is light enough to wash out white
            text, so the tint runs stronger than a typical dark-card overlay. */}
        <div className="absolute inset-0 bg-black/55" />

        <div className="relative flex flex-col gap-8 px-6 py-14 text-white md:px-14 md:py-20">
          <span className="label text-white">How We Work</span>
          <div className="flex flex-col gap-4 md:flex-row">
            {TILES.map((tile) => (
              <div
                key={tile.num}
                className="flex min-h-[280px] flex-1 flex-col justify-end gap-6 rounded-2xl border border-white/15 bg-white/10 p-8 backdrop-blur-md md:min-h-[420px] md:p-12"
              >
                <div className="flex flex-col gap-4">
                  <span className="font-mono text-[11px] tracking-[.08em] text-ace-red md:text-[12px]">
                    {tile.num}
                  </span>
                  <h2 className="display-lg">{tile.title}</h2>
                  <p className="max-w-[420px] text-base leading-[1.6] text-white/75 md:text-[18px]">
                    {tile.body}
                  </p>
                </div>
                <div>
                  <CallCta variant="on-film" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
