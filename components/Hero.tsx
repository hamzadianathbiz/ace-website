'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import heroImage from '@/public/assets/web/hero-mosaic.png'
import CallCta from '@/components/CallCta'

/*
  Built to the supplied hero spec, which is expressed at a 1280px frame:
  76px side gutters, a 1128px image card at 16px radius, and an 810px
  centred content block beneath it. Those are held as proportions here so
  the layout holds above and below 1280 rather than only at it.

  Opening: the image lands full-bleed over the whole viewport with the white
  ACE lockup centred on it, holds, then shrinks into the card while the
  lockup flies up to the header and vanishes into the red logomark already
  sitting there. The copy rises in as the image is on its way down.

  This component is only ever rendered on the home page, which is what keeps
  the intro off /company and /partners.

  How it is wired:
  - The card div is always in flow and always reserves its box, so there is
    no reflow at any point in the sequence — only the image's own frame
    moves, and it moves from `position: fixed`.
  - `cover` is the server-rendered state, so the first paint is already
    full-bleed and there is no flash of the settled layout during hydration.
    The <noscript> rule below drops it back into the card for anyone
    without JS, who would otherwise be stuck on a full-screen image.
  - Scroll is locked until the image is home. Scrolling underneath a
    full-screen overlay just desynchronises the two.
  - Under prefers-reduced-motion the whole sequence is skipped on mount.
*/

type Phase = 'cover' | 'shrinking' | 'settled'

/** How long the full-bleed frame holds before it starts to shrink. */
const HOLD_MS = 900
/** The shrink itself. Long on purpose — this is the calm part. */
const SHRINK_MS = 1300

/** Where the centred lockup has to travel to land on the header logomark. */
type Flight = { dx: number; dy: number; scale: number }

export default function Hero() {
  const cardRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLImageElement>(null)
  const [phase, setPhase] = useState<Phase>('cover')
  const [target, setTarget] = useState<DOMRect | null>(null)
  const [flight, setFlight] = useState<Flight | null>(null)
  // The hold is counted from when the image is actually on screen, not from
  // mount. Otherwise the full-bleed moment — the whole point of the intro —
  // is spent looking at the blur placeholder while the file decodes.
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPhase('settled')
    }
  }, [])

  // Never hold the page hostage to an image that is slow or never arrives.
  useEffect(() => {
    const bail = window.setTimeout(() => setReady(true), 3000)
    return () => window.clearTimeout(bail)
  }, [])

  useEffect(() => {
    if (!ready || phase !== 'cover') return

    const hold = window.setTimeout(() => {
      const card = cardRef.current
      if (!card) return setPhase('settled')
      // Measured at the moment of transition rather than on mount: fonts
      // and the image itself can still be settling before this point, and
      // a stale rect would land the image slightly off its own box.
      setTarget(card.getBoundingClientRect())

      // Same reasoning for the lockup's flight path. The header logomark is
      // behind the full-bleed frame at this point, not hidden, so it still
      // measures — and both rects are viewport-relative, which is the frame
      // the fixed overlay lives in.
      const logo = logoRef.current
      const mark = document.querySelector('[data-ace-logo]')
      if (logo && mark) {
        const from = logo.getBoundingClientRect()
        const to = mark.getBoundingClientRect()
        if (from.width > 0 && to.width > 0) {
          setFlight({
            dx: to.left + to.width / 2 - (from.left + from.width / 2),
            dy: to.top + to.height / 2 - (from.top + from.height / 2),
            // Width, not height: matching the lockup's width to the mark's
            // is what makes it read as being swallowed by it.
            scale: to.width / from.width,
          })
        }
      }

      setPhase('shrinking')
    }, HOLD_MS)

    return () => window.clearTimeout(hold)
  }, [ready, phase])

  // Hand the image back to the card once it has arrived, so it tracks the
  // card on scroll and resize instead of staying pinned to the viewport.
  useEffect(() => {
    if (phase !== 'shrinking') return
    const done = window.setTimeout(() => setPhase('settled'), SHRINK_MS)
    return () => window.clearTimeout(done)
  }, [phase])

  useEffect(() => {
    if (phase === 'settled') return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [phase])

  const settled = phase === 'settled'
  // The copy starts rising while the image is still on its way down, so the
  // two read as one movement rather than two events.
  const revealed = phase !== 'cover'

  const frameStyle: React.CSSProperties = settled
    ? {}
    : {
        position: 'fixed',
        zIndex: 60,
        top: target ? target.top : 0,
        left: target ? target.left : 0,
        width: target ? target.width : '100vw',
        height: target ? target.height : '100vh',
        borderRadius: target ? '1rem' : 0,
        transition: `top ${SHRINK_MS}ms, left ${SHRINK_MS}ms, width ${SHRINK_MS}ms, height ${SHRINK_MS}ms, border-radius ${SHRINK_MS}ms`,
        transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
      }

  const rise = `transition-[opacity,transform] duration-[900ms] ease-calm ${
    revealed ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
  }`

  /*
    The lockup rides the same clock as the shrink, so the two read as one
    movement. Opacity is held for the first stretch and then dropped, which
    puts the fade at the end of the journey — it disappears into the mark
    rather than on the way there.
  */
  const logoStyle: React.CSSProperties = {
    transform: flight
      ? `translate(${flight.dx}px, ${flight.dy}px) scale(${flight.scale})`
      : 'translate(0px, 0px) scale(1)',
    opacity: flight ? 0 : 1,
    transition: `transform ${SHRINK_MS}ms cubic-bezier(0.22, 1, 0.36, 1), opacity ${Math.round(
      SHRINK_MS * 0.55,
    )}ms ease-in ${Math.round(SHRINK_MS * 0.45)}ms`,
  }

  return (
    // From md up the hero is a fixed-height column sized to the viewport
    // minus the 100px header, so the headline, subhead and CTA are all above
    // the fold without scrolling. The card takes whatever height is left
    // rather than holding its aspect ratio — on a 900px-tall screen that is
    // a wide band, on a tall one it caps at the spec's 643px. Mobile keeps
    // the aspect ratio: the card is already short enough there that the copy
    // fits on its own.
    <section className="bg-ace-cream pb-20 pt-5 md:flex md:h-[calc(100svh-100px)] md:min-h-[620px] md:flex-col md:pb-8">
      <noscript>
        {/* Without JS the phase never advances, so pin the image into its
            card, drop the lockup that would otherwise sit there forever,
            and let the page behave normally. */}
        <style>{`.hero-frame{position:absolute!important;inset:0!important;width:auto!important;height:auto!important;border-radius:1rem!important;z-index:auto!important}.hero-intro-logo{display:none!important}`}</style>
      </noscript>

      {/* Sits above the full-bleed frame, and unmounts once the intro is
          over so it can never intercept a click. */}
      {!settled && (
        <div className="hero-intro-logo pointer-events-none fixed inset-0 z-[70] flex items-center justify-center">
          <img
            ref={logoRef}
            src="/assets/web/ace-logo-white.png"
            alt=""
            className="w-[min(400px,62vw)]"
            style={logoStyle}
          />
        </div>
      )}

      <div className="mx-auto w-full max-w-[1128px] px-4 md:flex md:min-h-0 md:flex-1 md:flex-col md:px-6">
        {/* Card. min-h-0 is what lets flex-1 actually shrink it — without it
            a flex item will not go below its content size. It keeps its box
            for the whole sequence; only .hero-frame moves. */}
        <div
          ref={cardRef}
          className="relative aspect-[1128/643] w-full md:aspect-auto md:max-h-[643px] md:min-h-[260px] md:flex-1"
        >
          <div className="hero-frame absolute inset-0 overflow-hidden rounded-2xl" style={frameStyle}>
            {/*
              Statically imported rather than referenced by path: that is
              what lets Next generate the blur placeholder at build time, so
              the frame fills with the image's own colours while the full
              file decodes. next/image re-encodes and sizes the 3.7MB source
              at the edge, and priority marks it as the LCP element.
            */}
            <Image
              src={heroImage}
              alt=""
              fill
              priority
              placeholder="blur"
              sizes="100vw"
              onLoad={() => setReady(true)}
              // The card is a wide band, so cover crops top and bottom. Pulled
              // above centre to keep the sky and the tops of the towers in
              // frame rather than splitting the overflow evenly.
              className="object-cover object-[center_25%]"
            />
          </div>
        </div>

        {/* Content block — 810px wide, centred, 32px rhythm. */}
        <div className="mx-auto mt-12 flex w-full max-w-[810px] flex-none flex-col items-center gap-8 md:mt-8 md:gap-6">
          <h1 className={`display-xl text-center text-black ${rise}`} style={{ transitionDelay: '260ms' }}>
            AI For Lower-Mid and Mid-Market Private Capital
          </h1>

          <p
            className={`mx-auto max-w-[716px] text-center text-[16px] leading-[1.7] tracking-[-0.017em] text-[#1C1A1A]/70 md:text-[18px] ${rise}`}
            style={{ transitionDelay: '440ms' }}
          >
            Advisory and deployment for private equity funds, investment banks,
            M&amp;A boutiques, family offices, and the portfolio companies they
            own.
          </p>

          <div className={rise} style={{ transitionDelay: '620ms' }}>
            <CallCta />
          </div>
        </div>
      </div>
    </section>
  )
}
