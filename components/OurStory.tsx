/*
  Replaces the Thesis block on this route. Same eyebrow-plus-heading pair and
  the same left-aligned single column as the Company section above it, held
  to a 720px measure so a read this long stays comfortable.
*/
const PARAGRAPHS = [
  'ACE started as a vision to bring clarity and excellence to the private capital industry surrounding the biggest technological innovation of our time — Artificial Intelligence. Back in 2023, when OpenAI launched GPT 3.5 the world saw a technological leap in capability. This was the world’s first introduction to performance grade AI. Around this time our founder, Hamza, began experimenting with the new models extensively, and arrived at the conviction the firm was built on — soon businesses will be able to use this technology as a value creation lever.',
  'That conviction met an obsession with private equity, its structure and its model. We found that financial engineering is not as reliable as it used to be and operational value creation was starting to emerge as a large factor in buy-side and sell-side decisions.',
  'Once Anthropic came out with their models, the experiments moved into a real operating business — a family-owned bread manufacturing factory. We realised that there is immense value in building solutions internally with AI. These solutions kept getting better and cheaper with more usage by way of data collection and analysis. Around 2025 we began piloting that work with a few PE firms and investors, and eventually began onboarding clients.',
  'While spending time deep in the real world, building with AI, we were struck by the sheer uncertainty and ambiguity around AI that plagues enterprises in today’s time. Excess token expenditure, broken agents, complex AI systems that don’t work — these were common problems in the lower-mid and mid-market that nobody was willing to solve.',
]

export default function OurStory() {
  return (
    <section id="our-story" className="gutter section-y scroll-mt-24">
      <div className="flex max-w-[720px] flex-col gap-6">
        <span className="label">Our Story</span>
        <h2 className="display-lg">Our Story</h2>
        {PARAGRAPHS.map((paragraph) => (
          <p key={paragraph.slice(0, 40)} className="text-base leading-[1.7] text-ace-ink md:text-[18px]">
            {paragraph}
          </p>
        ))}
        {/* Last one is its own JSX rather than a string in the array above:
            it carries the brand line in red. */}
        <p className="text-base leading-[1.7] text-ace-ink md:text-[18px]">
          This led to the birth of ACE. We’re brutally focused on{' '}
          <span className="text-ace-red">Accelerating Company Excellence</span>{' '}
          with AI.
        </p>
      </div>
    </section>
  )
}
