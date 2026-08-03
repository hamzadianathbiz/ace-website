'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronDown, Menu, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import aceLogomark from '@/public/assets/web/ace-logomark.png'
import { DISCOVERY_CALL, SECTIONS } from '@/lib/links'
import { lockScroll, unlockScroll } from '@/lib/scroll-lock'

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
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const headerBarRef = useRef<HTMLDivElement>(null)
  // Which item's children are showing in the mobile menu. One at a time.
  const [openSection, setOpenSection] = useState<string | null>(null)

  /*
    The menu is a full-screen surface on a phone, so the document beneath it
    should not keep moving. Lock both native scrolling and Lenis, and let
    Escape dismiss the menu for hardware-keyboard users.
  */
  useEffect(() => {
    if (!menuOpen) return

    const scrollY = window.scrollY
    const previousBodyStyles = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
    }
    const previouslyFocused = document.activeElement as HTMLElement | null
    const backgroundRegions = [
      document.querySelector<HTMLElement>('a[href="#main-content"]'),
      headerBarRef.current,
      document.querySelector<HTMLElement>('main'),
      document.querySelector<HTMLElement>('footer'),
    ].filter((region): region is HTMLElement => Boolean(region))
    const previousInert = backgroundRegions.map((region) => region.inert)
    backgroundRegions.forEach((region) => {
      region.inert = true
    })
    const focusFrame = window.requestAnimationFrame(() => closeButtonRef.current?.focus())
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        return
      }
      if (event.key !== 'Tab') return

      const focusable = menuRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )
      if (!focusable?.length) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.width = '100%'
    lockScroll()
    window.addEventListener('keydown', handleKeydown)

    return () => {
      document.body.style.overflow = previousBodyStyles.overflow
      document.body.style.position = previousBodyStyles.position
      document.body.style.top = previousBodyStyles.top
      document.body.style.width = previousBodyStyles.width
      window.scrollTo(0, scrollY)
      unlockScroll()
      window.cancelAnimationFrame(focusFrame)
      window.removeEventListener('keydown', handleKeydown)
      backgroundRegions.forEach((region, index) => {
        region.inert = previousInert[index]
      })
      if (previouslyFocused && document.contains(previouslyFocused)) previouslyFocused.focus()
    }
  }, [menuOpen])

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1024px)')
    const closeAtDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setMenuOpen(false)
    }
    desktop.addEventListener('change', closeAtDesktop)
    return () => desktop.removeEventListener('change', closeAtDesktop)
  }, [])

  return (
    <header className="sticky top-0 z-40 bg-ace-cream lg:static">
      {/*
        Two layouts, because the nav only exists at lg and up.

        lg+: three columns. The logo and the CTA are different widths, so
        space-between pushed the nav off centre by half that difference;
        equal 1fr rails either side of an auto-width nav centre it properly.

        Below lg the nav is display:none, which takes it out of the grid
        entirely — the actions then auto-place into the middle column and the
        burger sits in the centre of the bar. So below lg this is a plain
        flex row instead: logo left, burger hard right.
      */}
      <div
        ref={headerBarRef}
        className="mx-auto flex h-[72px] w-full max-w-[1128px] items-center justify-between px-4 md:h-[100px] md:px-6 lg:grid lg:grid-cols-[1fr_auto_1fr]"
      >
        {/* justify-self-start: in the grid the link would otherwise stretch
            across the whole 1fr rail and turn dead space into a click
            target. Harmless in the flex row below lg. */}
        <Link
          href="/"
          aria-label="ACE — AI Deployment Co."
          className="flex min-h-11 min-w-11 items-center justify-self-start"
        >
          <Image
            src={aceLogomark}
            alt=""
            sizes="(max-width: 767px) 76px, 101px"
            className="h-9 w-auto md:h-12"
          />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-10 lg:flex">
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
            className="hidden rounded-xl border border-black/[0.08] bg-[#959595]/10 px-6 py-3 text-[16px] text-black transition-colors duration-200 hover:bg-[#959595]/20 active:scale-[.98] md:inline-flex"
          >
            Book a Discovery Call
          </Link>
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMenuOpen(true)}
            className="flex h-11 w-11 touch-manipulation items-center justify-center rounded-full border border-black/10 text-black transition-transform duration-200 active:scale-95 lg:hidden"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        ref={menuRef}
        id="mobile-navigation"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
        className="fixed inset-0 z-50 flex h-[100dvh] flex-col justify-between overscroll-contain bg-ace-cream px-6 py-8 transition-all duration-500 ease-in-out lg:hidden"
        style={{
          transform: menuOpen ? 'scaleY(1)' : 'scaleY(0)',
          transformOrigin: 'top',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
        }}
      >
        <div className="flex justify-end">
          <button
            ref={closeButtonRef}
            type="button"
            onClick={() => setMenuOpen(false)}
            className="flex h-11 w-11 touch-manipulation items-center justify-center rounded-full border border-black/10 text-black transition-transform duration-200 active:scale-95"
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* min-h-0 lets the scroll actually engage inside a flex column. The
            menu grew sub-items, and on a short phone the list can now be
            taller than the space between the close button and the CTA. */}
        <nav aria-label="Mobile" className="flex min-h-0 flex-1 flex-col justify-center gap-6 overflow-y-auto py-4">
          {NAV.map((item) => (
            <div key={item.label} className="flex flex-col gap-3">
              {/*
                Only an item that actually has children gets a chevron, and
                there it is a real control: it opens the list rather than
                following the link. Everything else is a plain link with
                nothing beside it, since an arrow that does nothing just
                reads as a broken affordance.
              */}
              <div className="flex items-center justify-between gap-4">
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex min-h-11 touch-manipulation items-center text-[28px] text-black/70 transition-colors duration-300 hover:text-black"
                >
                  {item.label}
                </Link>
                {item.children && (
                  <button
                    type="button"
                    onClick={() => setOpenSection(openSection === item.label ? null : item.label)}
                    aria-expanded={openSection === item.label}
                    aria-controls="mobile-company-sections"
                    aria-label={`${openSection === item.label ? 'Hide' : 'Show'} ${item.label} sections`}
                    className="flex h-11 w-11 flex-none touch-manipulation items-center justify-center text-black/60 transition-colors duration-200 hover:text-black active:scale-95"
                  >
                    <ChevronDown
                      aria-hidden
                      className={`h-6 w-6 transition-transform duration-300 ${
                        openSection === item.label ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                )}
              </div>
              {item.children && openSection === item.label && (
                <div id="mobile-company-sections" className="flex flex-col gap-3 pl-4">
                  {item.children.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex min-h-11 touch-manipulation items-center text-[18px] text-black/60 transition-colors duration-200 hover:text-black"
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
          className="flex min-h-14 w-full touch-manipulation items-center justify-center rounded-xl bg-black py-4 text-[16px] font-medium text-white transition-transform duration-200 active:scale-[.98]"
        >
          Book a Discovery Call
        </Link>
      </div>
    </header>
  )
}
