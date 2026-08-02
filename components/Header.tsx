'use client'

import { useState } from 'react'
import { ChevronDown, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { DISCOVERY_CALL, SECTIONS } from '@/lib/links'

type NavItem = { label: string; href: string; children?: NavItem[] }

// Mostly in-page anchors. Ids live on the sections — keep the two in step.
const NAV: NavItem[] = [
  { label: 'Services', href: SECTIONS.services },
  { label: 'Verticals', href: SECTIONS.verticals },
  {
    label: 'Company',
    href: SECTIONS.company,
    // Page order, so the menu reads the way the route scrolls.
    children: [
      { label: 'Case Studies', href: SECTIONS.caseStudies },
      { label: 'Fulfillment Partner', href: SECTIONS.fulfillmentPartner },
      { label: 'Our Story', href: SECTIONS.ourStory },
    ],
  },
  { label: 'Partners', href: SECTIONS.partners },
]

const NAV_LINK =
  'text-[16px] text-black/60 transition-colors duration-200 hover:text-black'

/*
  Per the hero spec: a plain bar in normal flow on the cream ground, not the
  floating dark glass pill this used to be. 100px tall with a 52px content
  row, held to the same 1128px measure as the hero card beneath it.
*/
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="bg-ace-cream">
      {/*
        Three columns rather than justify-between: the logo and the CTA are
        different widths, so space-between pushed the nav off centre by half
        that difference. Equal 1fr rails on either side of an auto-width nav
        centre it against the bar itself.
      */}
      <div className="mx-auto grid h-[100px] w-full max-w-[1128px] grid-cols-[1fr_auto_1fr] items-center px-4 md:px-6">
        {/* justify-self-start: otherwise the link stretches across the whole
            1fr rail and turns dead space into a click target. */}
        <Link
          href="/"
          aria-label="ACE — AI Deployment Co."
          className="flex items-center justify-self-start"
        >
          <img src="/assets/web/ace-logomark.png" alt="" className="h-10 w-auto md:h-12" />
        </Link>

        <nav className="hidden items-center gap-10 lg:flex">
          {NAV.map((item) =>
            item.children ? (
              <div key={item.label} className="group relative">
                <Link href={item.href} className={`flex items-center gap-1.5 ${NAV_LINK}`}>
                  {item.label}
                  <ChevronDown
                    aria-hidden
                    className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180"
                  />
                </Link>
                {/*
                  The pt-3 belongs to the panel, not the trigger: it is the
                  bridge the pointer crosses on its way down. As padding on a
                  child of .group it stays inside the hover area, so the menu
                  does not close in the gap between label and panel.

                  focus-within keeps it reachable by keyboard, where there is
                  no hover to speak of.
                */}
                <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 opacity-0 transition-[opacity,visibility] duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                  <div className="flex min-w-[190px] flex-col rounded-xl border border-black/[0.08] bg-ace-cream p-2 shadow-[0_11px_11px_rgba(0,0,0,0.09),0_3px_6px_rgba(0,0,0,0.1)]">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="whitespace-nowrap rounded-lg px-3 py-2 text-[15px] text-black/60 transition-colors duration-200 hover:bg-black/[0.04] hover:text-black"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link key={item.label} href={item.href} className={NAV_LINK}>
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center justify-end gap-4">
          <Link
            href={DISCOVERY_CALL}
            className="hidden rounded-xl border border-black/[0.08] bg-[#959595]/10 px-6 py-3 text-[16px] text-black transition-colors duration-200 hover:bg-[#959595]/20 md:inline-flex"
          >
            Book a Discovery Call
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-black lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        className="fixed inset-0 z-50 flex flex-col justify-between bg-ace-cream px-6 py-8 transition-all duration-500 ease-in-out lg:hidden"
        style={{
          transform: menuOpen ? 'scaleY(1)' : 'scaleY(0)',
          transformOrigin: 'top',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
        }}
      >
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-black"
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* min-h-0 lets the scroll actually engage inside a flex column. The
            menu grew sub-items, and on a short phone the list can now be
            taller than the space between the close button and the CTA. */}
        <nav className="flex min-h-0 flex-1 flex-col justify-center gap-6 overflow-y-auto py-4">
          {NAV.map((item) => (
            <div key={item.label} className="flex flex-col gap-3">
              <Link
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between text-[28px] text-black/70 transition-colors duration-300 hover:text-black"
              >
                <span>{item.label}</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black/40">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </Link>
              {/* There is no hover on a touch screen, so the children that
                  live in a dropdown on desktop are simply listed here. */}
              {item.children && (
                <div className="flex flex-col gap-3 pl-4">
                  {item.children.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      onClick={() => setMenuOpen(false)}
                      className="text-[18px] text-black/50 transition-colors duration-200 hover:text-black"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <Link
          href={DISCOVERY_CALL}
          onClick={() => setMenuOpen(false)}
          className="flex w-full items-center justify-center rounded-xl bg-black py-4 text-[16px] font-medium text-white"
        >
          Book a Discovery Call
        </Link>
      </div>
    </header>
  )
}
