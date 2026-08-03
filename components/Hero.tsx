'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import heroImage from '@/public/assets/web/hero-mosaic.png'
import aceLogoWhite from '@/public/assets/web/ace-logo-white.png'
import CallCta from '@/components/CallCta'
import { lockScroll, unlockScroll } from '@/lib/scroll-lock'

/*
  Built to the supplied hero spec, which is expressed at a 1280px frame:
  76px side gutters, a 1128px image card at 16px radius, and an 810px
  centred content block beneath it. Those are held as proportions here so
  the layout holds above and below 1280 rather than only at it.

  Opening, in four beats: the image lands full-bleed over the whole viewport
  with the white ACE lockup and its line centred on it; it holds; the lockup
  fades out where it stands, with nothing else moving; and only once it has
  gone does the image shrink into the card. The two are sequential on
  purpose — the lockup gets the frame to itself on the way out. The copy
  rises in as the image is on its way down.

  This component is only ever rendered on the home page, which is what keeps
  the intro off /company and /partners. It is also skipped when the URL
  carries a hash, so the section anchors in the nav scroll straight to their
  section — see the deep-link effect below. The logo's bare `/` is what
  plays it.

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
  - The sequence is identical on every device and under Reduce Motion; see
    the note in the component for why.
*/

/*
  cover   — full-bleed, lockup fading in and holding
  fading  — lockup on its way out, image still full-bleed and still
  shrinking — lockup gone, image on its way into the card
*/
type Phase = 'cover' | 'fading' | 'shrinking' | 'settled'

/*
  How long the full-bleed frame holds before the lockup starts to leave,
  counted from the moment the image is on screen. The lockup's fade-in runs
  inside this window, so the still moment is hold minus logoIn.
*/
const DESKTOP_TIMING = {
  hold: 1300,
  shrink: 1300,
  logoIn: 700,
  logoOut: 1000,
  reveal: 900,
  revealDelays: [260, 440, 620],
} as const

/*
  A phone has farther to travel perceptually: portrait full-screen to a
  short 4:3 card. Give each beat more room and stagger the copy more gently,
  while preserving the desktop sequence and its exact timings above.
*/
const MOBILE_TIMING = {
  hold: 1550,
  shrink: 1850,
  logoIn: 850,
  logoOut: 1200,
  reveal: 1150,
  revealDelays: [360, 600, 840],
} as const

export default function Hero() {
  const cardRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const [phase, setPhase] = useState<Phase>('cover')
  const [target, setTarget] = useState<DOMRect | null>(null)
  const [isMobile, setIsMobile] = useState<boolean | null>(null)
  // The hold is counted from when the image is actually on screen, not from
  // mount. Otherwise the full-bleed moment — the whole point of the intro —
  // is spent looking at the blur placeholder while the file decodes.
  const [ready, setReady] = useState(false)

  /*
    Whether this visit is a deep link into a section. Read once at first
    render rather than inside an effect, because the scroll lock below has
    to know before it runs — it fires on the same mount pass and would
    otherwise hold the page still through the browser's jump to the anchor.

    A ref and not state: it never renders, so reading `window` here cannot
    put the client tree out of step with the server's.
  */
  const deepLink = useRef<boolean | null>(null)
  if (deepLink.current === null) {
    deepLink.current = typeof window !== 'undefined' && Boolean(window.location.hash)
  }

  /*
    Reduced Motion settles immediately. The matching CSS rule in globals.css
    pins the frame into its card before this effect runs, so there is no
    full-viewport flash or travel while React hydrates.
  */

  // Resolve the timing profile before the image-ready effect can start the
  // hold. Captured once because switching timings mid-intro on rotation or
  // resize would create a visible speed change.
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setReady(true)
        setPhase('settled')
        return
      }
      setIsMobile(window.matchMedia('(max-width: 767px)').matches)
    })
    return () => window.cancelAnimationFrame(frame)
  }, [])

  const timing = isMobile ? MOBILE_TIMING : DESKTOP_TIMING

  /*
    The intro is for arriving at the site, not for arriving at a section.
    Every in-page anchor is absolute — /#services, /#verticals — so clicking
    Services from /company lands here and would otherwise play the whole
    opening before scrolling down to the section that was asked for. A hash
    means the visitor asked for somewhere specific: settle immediately.

    The logo goes to bare `/`, so it keeps the intro, which is the one route
    back to it.

    The attribute is cleared rather than read and left: it is set once, on
    the initial document, and a later client-side navigation to `/` would
    otherwise still carry it and suppress an intro that should play.

    Runs before the effects below so `phase` has left 'cover' by the time
    the hold is considered.
  */
  useEffect(() => {
    delete document.documentElement.dataset.deepLink
    if (!deepLink.current) return
    const frame = window.requestAnimationFrame(() => setPhase('settled'))
    return () => window.cancelAnimationFrame(frame)
  }, [])

  /*
    A cached image can finish decoding before React hydrates, in which case
    onLoad never fires and the sequence sits waiting on the 3s bail below —
    which reads as no intro at all, then a late one out of nowhere. On a
    repeat visit that is every visit, so check the element directly on mount.
  */
  useEffect(() => {
    if (imgRef.current?.complete) setReady(true)
  }, [])

  // Never hold the page hostage to an image that is slow or never arrives.
  useEffect(() => {
    const bail = window.setTimeout(() => setReady(true), 3000)
    return () => window.clearTimeout(bail)
  }, [])

  // Beat one: hold the full-bleed frame, then start the lockup out.
  useEffect(() => {
    if (!ready || isMobile === null || phase !== 'cover') return
    const hold = window.setTimeout(() => setPhase('fading'), timing.hold)
    return () => window.clearTimeout(hold)
  }, [ready, isMobile, phase, timing.hold])

  // Beat two: once the lockup has gone, and not before, move the image.
  useEffect(() => {
    if (phase !== 'fading') return

    const gone = window.setTimeout(() => {
      const card = cardRef.current
      if (!card) return setPhase('settled')
      // Measured at the moment of transition rather than on mount: fonts
      // and the image itself can still be settling before this point, and
      // a stale rect would land the image slightly off its own box.
      setTarget(card.getBoundingClientRect())
      setPhase('shrinking')
    }, timing.logoOut)

    return () => window.clearTimeout(gone)
  }, [phase, timing.logoOut])

  // Hand the image back to the card once it has arrived, so it tracks the
  // card on scroll and resize instead of staying pinned to the viewport.
  useEffect(() => {
    if (phase !== 'shrinking') return
    const done = window.setTimeout(() => setPhase('settled'), timing.shrink)
    return () => window.clearTimeout(done)
  }, [phase, timing.shrink])

  useEffect(() => {
    // deepLink: nothing is playing, and locking even for the frame before
    // the phase settles can swallow the scroll to the requested section.
    if (phase === 'settled' || deepLink.current) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    // Smooth scrolling drives the page itself, so the overflow lock alone
    // does not hold it — see lib/scroll-lock.
    lockScroll()
    return () => {
      document.body.style.overflow = previous
      unlockScroll()
    }
  }, [phase])

  const settled = phase === 'settled'
  // The copy starts rising while the image is still on its way down, so the
  // two read as one movement rather than two events. Tied to the shrink
  // specifically, not to "past cover" — during the fade beat nothing but
  // the lockup should be moving.
  const revealed = phase === 'shrinking' || settled

  const frameStyle: React.CSSProperties = settled
    ? {}
    : {
        position: 'fixed',
        zIndex: 60,
        top: target ? target.top : 0,
        left: target ? target.left : 0,
        width: target ? target.width : '100vw',
        height: target ? target.height : '100dvh',
        borderRadius: target ? '1rem' : 0,
        transition: `top ${timing.shrink}ms, left ${timing.shrink}ms, width ${timing.shrink}ms, height ${timing.shrink}ms, border-radius ${timing.shrink}ms`,
        transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
        // These four are layout properties, so each frame of the shrink is a
        // reflow. Cheap enough on a desktop, tighter on a phone — the hint
        // lets the browser prepare for it rather than discover it.
        willChange: 'top, left, width, height',
      }

  const rise = `transition-[opacity,transform] ease-calm ${
    revealed ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
  }`

  /*
    The lockup fades up once the image is actually on screen, holds, then
    fades back out as the frame starts to shrink. It never moves — opacity
    is the whole animation, which is what keeps it calm. The fade out is
    shorter than the shrink, so the card lands on a clean frame.
  */
  const introVisible = phase === 'cover' && ready
  const introStyle: React.CSSProperties = {
    opacity: introVisible ? 1 : 0,
    transition: `opacity ${introVisible ? timing.logoIn : timing.logoOut}ms ease-in-out`,
  }

  return (
    // From md up the hero is a fixed-height column sized to the viewport
    // minus the 100px header, so the headline, subhead and CTA are all above
    // the fold without scrolling. The card takes whatever height is left
    // rather than holding its aspect ratio — on a 900px-tall screen that is
    // a wide band, on a tall one it caps at the spec's 643px. Mobile keeps
    // the aspect ratio: the card is already short enough there that the copy
    // fits on its own.
    <section className="hero-section bg-ace-cream pb-8 pt-4 md:flex md:h-[calc(100svh-100px)] md:min-h-[620px] md:flex-col md:pb-8 md:pt-5">
      <noscript>
        {/* Without JS the phase never advances, so pin the image into its
            card, drop the lockup that would otherwise sit there forever,
            and let the page behave normally. */}
        <style>{`.hero-frame{position:absolute!important;inset:0!important;width:auto!important;height:auto!important;border-radius:1rem!important;z-index:auto!important}.hero-intro-logo{display:none!important}`}</style>
      </noscript>

      {/* Sits above the full-bleed frame. Mounted for the two beats it is
          part of and dropped the moment the shrink begins, by which point
          it has already faded to nothing. Lockup and line fade as one block
          rather than separately — they read as a single mark. */}
      {(phase === 'cover' || phase === 'fading') && (
        <div
          className="hero-intro-logo pointer-events-none fixed inset-0 z-[70] flex flex-col items-center justify-center gap-7 px-6"
          style={introStyle}
        >
          <Image
            src={aceLogoWhite}
            alt=""
            priority
            sizes="(max-width: 645px) 62vw, 400px"
            className="w-[min(400px,62vw)]"
          />
          {/* The site's display face, at display scale. Cardo ships a real
              700, so bold here is the cut rather than a synthesised one. */}
          <p className="display-lg max-w-[620px] text-center font-bold text-white">
            Accelerating Company Excellence
          </p>
        </div>
      )}

      <div className="mx-auto w-full max-w-[1128px] px-4 md:flex md:min-h-0 md:flex-1 md:flex-col md:px-6">
        {/* Card. min-h-0 is what lets flex-1 actually shrink it — without it
            a flex item will not go below its content size. It keeps its box
            for the whole sequence; only .hero-frame moves. */}
        {/* 4:3 on a phone rather than the desktop card's 1128/643: that ratio
            on a 375px screen is a 195px letterbox strip with no presence.
            From md up the height comes from the flex column instead. */}
        <div
          ref={cardRef}
          className="hero-card-shell relative aspect-[4/3] w-full md:aspect-auto md:max-h-[643px] md:min-h-[260px] md:flex-1"
        >
          <div
            className="hero-frame absolute inset-0 overflow-hidden rounded-2xl"
            style={frameStyle}
          >
            {/*
              Statically imported rather than referenced by path: that is
              what lets Next generate the blur placeholder at build time, so
              the frame fills with the image's own colours while the full
              file decodes. next/image re-encodes and sizes the 3.7MB source
              at the edge, and priority marks it as the LCP element.
            */}
            <Image
              ref={imgRef}
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
        <div className="hero-copy mx-auto mt-8 flex w-full max-w-[810px] flex-none flex-col items-center gap-5 md:mt-8 md:gap-6">
          {/* text-balance evens the line lengths rather than filling each
              line before breaking — on a centred block that is the whole
              difference between a tidy stack and a ragged one. */}
          <h1
            className={`hero-heading display-xl text-balance text-center text-black ${rise}`}
            style={{
              transitionDuration: `${timing.reveal}ms`,
              transitionDelay: `${timing.revealDelays[0]}ms`,
            }}
          >
            AI For The Private Capital Industry
          </h1>

          <p
            className={`hero-subhead mx-auto max-w-[680px] text-balance text-center text-[16px] leading-[1.7] tracking-[-0.017em] text-[#1C1A1A]/70 md:text-[18px] ${rise}`}
            style={{
              transitionDuration: `${timing.reveal}ms`,
              transitionDelay: `${timing.revealDelays[1]}ms`,
            }}
          >
            AI Advisory &amp; Deployment For Private Equity Funds, Investment
            Banks, M&amp;A Boutiques, Family Offices, and PE-Backed Portfolio
            Companies.
          </p>

          <div
            className={rise}
            style={{
              transitionDuration: `${timing.reveal}ms`,
              transitionDelay: `${timing.revealDelays[2]}ms`,
            }}
          >
            <CallCta />
          </div>
        </div>
      </div>
    </section>
  )
}
