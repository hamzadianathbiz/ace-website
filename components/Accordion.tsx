'use client'

import { useState } from 'react'
import Image from 'next/image'
import buildImage from '@/public/assets/web/what-we-build.png'
import CallCta from '@/components/CallCta'

/*
  The four layers we deploy, stated as capability rather than product. The
  named systems that sit underneath these — deal intelligence, IC memory,
  portfolio models — are engagement-specific, so they belong in a scope of
  work rather than on the website.
*/
const SYSTEMS = [
  {
    title: 'Organisational Company Brain',
    body: 'Every document, deal, decision and conversation the firm has produced, held in one layer that answers questions in plain language. Partner memory becomes institutional memory, and it stops leaving when people do.',
  },
  {
    title: 'AI Agents',
    body: 'Software that does the work rather than assisting with it. Agents that screen against your criteria, watch portfolio performance, and prepare the material a partner would otherwise build by hand.',
  },
  {
    title: 'Agentic Workflows',
    body: 'Whole processes wired end to end, where each step hands to the next without someone moving a file between them. The work runs on its own and surfaces when it needs a decision.',
  },
  {
    title: 'AI-Native Custom Software',
    body: 'Where nothing off the shelf fits the way your firm actually operates, we build it. Internal tools designed around your process instead of your process bent around someone else’s product.',
  },
]

export default function Accordion() {
  const [open, setOpen] = useState(0)

  return (
    <section
      id="what-we-build"
      className="flex scroll-mt-24 flex-col gap-8 px-4 py-[48px] md:flex-row md:items-center md:gap-[124px] md:pr-gutter md:pl-2"
    >
      <div className="relative h-[300px] w-full flex-none overflow-hidden rounded-2xl md:h-[608px] md:w-[608px]">
        <Image
          src={buildImage}
          alt=""
          fill
          placeholder="blur"
          sizes="(max-width: 768px) 100vw, 608px"
          className="object-cover"
        />
      </div>
      <div className="w-full flex flex-col gap-8 md:w-[360px]">
        <span className="label">What We Build</span>
        <div>
          {SYSTEMS.map((system, i) => (
            <div className="acc-item" key={system.title}>
              <button
                type="button"
                // Clicking the open item closes it, so the panel can be empty.
                onClick={() => setOpen(open === i ? -1 : i)}
                aria-expanded={open === i}
                className="acc-head w-full text-left"
              >
                <span>{system.title}</span>
                <span className="icon" aria-hidden></span>
              </button>
              {open === i && <p>{system.body}</p>}
            </div>
          ))}
        </div>
        <div>
          <CallCta variant="solid" />
        </div>
      </div>
    </section>
  )
}
