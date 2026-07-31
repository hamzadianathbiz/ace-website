'use client'

import { useState } from 'react'
import CallCta from '@/components/CallCta'

/* The six systems. This is the deployable surface area, not a service menu. */
const SYSTEMS = [
  {
    title: 'Deal Intelligence',
    body: 'Every deal the firm has ever looked at, structured at each stage and answerable in plain language.',
  },
  {
    title: 'IC Memory Layer',
    body: 'Investment committee decisions, concerns and discussion held as structured records instead of partner memory.',
  },
  {
    title: 'Diligence to Operating Plan',
    body: 'Diligence findings converted into a structured operating plan the week the deal closes, not the quarter after.',
  },
  {
    title: 'Portfolio Performance Model',
    body: 'One KPI schema across every portfolio company, with variance detection that runs whether or not anyone asks.',
  },
  {
    title: 'Knowledge Graph',
    body: 'Relationships and patterns across the full portfolio history, surfaced rather than rediscovered deal by deal.',
  },
  {
    title: 'Exit Narrative Builder',
    body: 'Exit readiness documented continuously, so preparation becomes retrieval instead of reconstruction.',
  },
]

export default function Accordion() {
  const [open, setOpen] = useState(0)

  return (
    <section
      id="what-we-build"
      className="flex scroll-mt-24 flex-col gap-8 px-4 py-[48px] md:flex-row md:items-center md:gap-[124px] md:pr-gutter md:pl-2"
    >
      <div className="w-full h-[300px] flex-none ph md:w-[608px] md:h-[608px]">
        Image placeholder
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
