/*
  Its own route, so the eyebrow-plus-heading pair from the Verticals section
  carries the page's h1. Single column, left aligned.

  The Turing paragraphs are load-bearing history, not decoration — dates and
  claims are verifiable and should stay that way if the copy is edited:
  - Turing submitted the ACE design to the NPL in 1945; he left before it
    was built, and the reduced Pilot ACE first ran on 10 May 1950.
  - "Computing Machinery and Intelligence" ran in Mind in October 1950.
  - "Artificial intelligence" was coined in 1956, at Dartmouth — six years
    after the paper, which is the whole point of that sentence.

  No italics for the paper title: the body face is loaded in roman only, so
  an <em> here would be a browser-synthesised oblique.
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
        <p className="text-base leading-[1.7] text-ace-ink md:text-[18px]">
          The name is older than the firm. In 1945 Alan Turing submitted a
          design to Britain&rsquo;s National Physical Laboratory for the
          Automatic Computing Engine — the ACE. It was among the first complete
          designs for a stored-program computer: a machine you gave new work by
          changing its instructions rather than by rebuilding it. Turing left
          before it was finished, impatient with the pace. A reduced version,
          the Pilot ACE, ran its first program on 10 May 1950.
        </p>
        <p className="text-base leading-[1.7] text-ace-ink md:text-[18px]">
          That same year he published &ldquo;Computing Machinery and
          Intelligence&rdquo;. It opens by asking whether machines can think,
          judges the question too loose to settle, and replaces it with a test:
          put a person and a machine behind a screen and see whether anyone can
          tell which is which. If they cannot, the question has answered
          itself. Nobody called this artificial intelligence at the time — the
          term would not be coined for another six years. The idea came first,
          and the man who framed it had already designed the machine to run it
          on.
        </p>
        <p className="text-base leading-[1.7] text-ace-ink md:text-[18px]">
          We took the name on purpose. Turing&rsquo;s argument was that one
          general machine, properly instructed, beats a room full of
          purpose-built ones — the same argument we make to a firm choosing
          between buying another point solution and owning infrastructure of
          its own. His ACE was an Automatic Computing Engine. Ours is{' '}
          <span className="text-ace-red">Accelerating Company Excellence</span>.
          Eighty years on, the same bet: build the general thing, install it
          where the work happens, and let it compound.
        </p>
      </div>
    </section>
  )
}
