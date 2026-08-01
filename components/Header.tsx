'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { DISCOVERY_CALL, SECTIONS } from '@/lib/links'

type NavItem = { label: string; href: string }

// One page, so these are in-page anchors. Ids live on the sections.
const NAV: NavItem[] = [
  { label: 'How We Work', href: SECTIONS.howWeWork },
  { label: 'Who We Serve', href: SECTIONS.clients },
  { label: 'What We Build', href: SECTIONS.build },
  { label: 'Company', href: SECTIONS.company },
  { label: 'Partners', href: SECTIONS.partners },
]

/*
  Per the hero spec: a plain bar in normal flow on the cream ground, not the
  floating dark glass pill this used to be. 100px tall with a 52px content
  row, held to the same 1128px measure as the hero card beneath it.
*/
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="bg-ace-cream">
      <div className="mx-auto flex h-[100px] w-full max-w-[1128px] items-center justify-between px-4 md:px-6">
        <Link href="/" aria-label="ACE — AI Deployment Co." className="flex items-center">
          {/* data-ace-logo: the hero intro measures this to know where to fly
              its white lockup to. Keep the attribute if the markup moves. */}
          <img
            data-ace-logo
            src="/assets/web/ace-logomark.png"
            alt=""
            className="h-10 w-auto md:h-12"
          />
        </Link>

        <nav className="hidden items-center gap-10 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-[16px] text-black/60 transition-colors duration-200 hover:text-black"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
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

        <nav className="flex flex-1 flex-col justify-center gap-6">
          {NAV.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between text-[28px] text-black/70 transition-colors duration-300 hover:text-black"
            >
              <span>{item.label}</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black/40">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </Link>
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
