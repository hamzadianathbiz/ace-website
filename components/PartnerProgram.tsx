import CallCta from '@/components/CallCta'

/*
  Terms mirror projects/partner-program/ace-partner-program.md v1.0 in the
  ACE vault. That document is the source of truth — if the program changes
  there, change it here.

  The lead (label, heading, opening paragraph) lives on the /partners page
  itself so the route gets a real h1. This is the black card beneath it.
*/
const PILLARS = [
  {
    num: '01',
    title: 'The Economics',
    body: '30% of everything ACE collects in a client’s first month, then 10% to 20% of collected revenue every month for as long as that client stays. No cap and no expiry. The ongoing rate is set by how involved you choose to be.',
  },
  {
    num: '02',
    title: 'The Network',
    body: 'Partners reach each other directly, see deals moving across the network, and strike partner-to-partner deals with no fee and no intermediary. The model it is built on produces roughly 45% of the deal flow at a $1B New York credit fund.',
  },
  {
    num: '03',
    title: 'What You Receive',
    body: 'A personal AI stack built for you free of charge, a monthly closed-door briefing on what is actually being deployed inside private capital firms, and an introduction kit that makes an intro a five-minute job.',
  },
]

export default function PartnerProgram() {
  return (
    <section className="px-4 py-4 md:px-6">
      <div className="on-dark mx-auto flex max-w-[1128px] flex-col gap-10 rounded-2xl bg-ace-black px-6 py-14 text-white md:gap-16 md:px-14 md:py-20">
        <div className="flex flex-col gap-10 md:flex-row md:gap-12">
          {PILLARS.map((pillar) => (
            <div key={pillar.num} className="flex flex-1 flex-col gap-4 border-t border-white/20 pt-6">
              <span className="font-mono text-[11px] tracking-[.08em] text-ace-red md:text-[12px]">
                {pillar.num}
              </span>
              <h2 className="display-sm">{pillar.title}</h2>
              <p className="text-[15px] leading-[1.6] text-white/70 md:text-base">{pillar.body}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-[11px] uppercase tracking-[.08em] text-white/50 md:text-[12px]">
            Capped at roughly ten partners. Founding cohort forming.
          </p>
          <CallCta variant="on-film" label="Become a Partner" />
        </div>
      </div>
    </section>
  )
}
