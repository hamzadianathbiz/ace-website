import Image from 'next/image'
import factoryImage from '@/public/assets/web/factory.png'
import CallCta from '@/components/CallCta'

/*
  The two halves of the business, on one section. What used to be a separate
  "What We Build" accordion now sits inside Deployment, since what we build
  is what deployment delivers — it was never really its own service.
*/
const ADVISORY = {
  num: '01',
  title: 'Advisory',
  body: 'We advise on tooling, governance and AI opportunity. No more second-guessing models or burning through your token limits. Frontier AI technology is useless without the right direction.',
}

const DEPLOYMENT = {
  num: '02',
  title: 'Deployment',
  body: 'We deploy AI agents, agentic workflows and knowledge layers into your organisation. Fully built and managed for you while maintaining industry-standard security. Let the pros build your AI advantage.',
}

/* What deployment actually puts in the building. */
const BUILDS = [
  {
    title: 'Organisational Company Brain',
    body: 'Every document, deal, decision and conversation the firm has produced, held in one layer that answers questions in plain language.',
  },
  {
    title: 'AI Agents',
    body: 'Software that does the work rather than assisting with it. Screening against your criteria, watching performance, preparing what a partner would otherwise build by hand.',
  },
  {
    title: 'Agentic Workflows',
    body: 'Whole processes wired end to end, where each step hands to the next without someone moving a file between them.',
  },
  {
    title: 'AI-Native Custom Software',
    body: 'Where nothing off the shelf fits the way your firm operates, we build it — designed around your process rather than the other way round.',
  },
]

export default function Services() {
  return (
    <section id="services" className="scroll-mt-24 px-4 py-4 md:px-6">
      <div className="on-dark relative overflow-hidden rounded-2xl bg-ace-black">
        <Image
          src={factoryImage}
          alt=""
          fill
          placeholder="blur"
          sizes="(max-width: 1128px) 100vw, 1128px"
          className="object-cover"
        />
        {/*
          Tint plus a light blur. There is no card behind the copy any more,
          so the photograph itself has to stop competing with it — softening
          the detail and dropping the sunset's brightness is what buys the
          headlines their contrast. backdrop-blur rather than a blur on the
          image, which would feather the card's own edges.
        */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[3px]" />

        <div className="relative flex flex-col gap-10 px-6 py-16 text-white md:gap-16 md:px-14 md:py-24">
          <span className="label text-white">Services</span>
          {/* No card surface — the copy sits straight on the photograph, so
              the column gap is what separates the two halves. The columns
              run to different lengths now that the build list sits under
              Deployment, so they are top-aligned rather than stretched. */}
          <div className="flex flex-col gap-12 md:flex-row md:items-start md:gap-16">
            <div className="flex flex-1 flex-col gap-6">
              <div className="flex flex-col gap-4">
                <span className="ordinal">{ADVISORY.num}</span>
                <h2 className="display-lg">{ADVISORY.title}</h2>
                <p className="max-w-[420px] text-base leading-[1.6] text-white/85 md:text-[18px]">
                  {ADVISORY.body}
                </p>
              </div>
              <div className="pt-2">
                <CallCta variant="on-film" />
              </div>
            </div>

            <div className="flex flex-1 flex-col gap-6">
              <div className="flex flex-col gap-4">
                <span className="ordinal">{DEPLOYMENT.num}</span>
                <h2 className="display-lg">{DEPLOYMENT.title}</h2>
                <p className="max-w-[420px] text-base leading-[1.6] text-white/85 md:text-[18px]">
                  {DEPLOYMENT.body}
                </p>
              </div>

              {/* The old What We Build accordion, flattened. A disclosure
                  widget earns its keep on a page of six items; on four, in
                  a column, it is just a click between the reader and the
                  answer. */}
              <ul className="flex flex-col">
                {BUILDS.map((build) => (
                  <li key={build.title} className="border-t border-white/15 py-4 first:border-t-0">
                    <h3 className="display-sm">{build.title}</h3>
                    <p className="mt-2 text-[15px] leading-[1.6] text-white/70">{build.body}</p>
                  </li>
                ))}
              </ul>

              <div className="pt-2">
                <CallCta variant="on-film" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
