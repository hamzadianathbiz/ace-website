'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import { registerScroller } from '@/lib/scroll-lock'

/*
  Eased wheel scrolling. The page keeps moving for a beat after the wheel
  stops rather than snapping to a halt, which is the "slow and smooth" feel.

  syncTouch puts the same easing on a finger drag. It is off by default in
  Lenis, and for good reason — a phone already has its own momentum, and
  taking that over from JS can feel a beat behind the finger. Hamza asked
  for the effect on mobile, so it is on, with the touch response left at 1
  so a drag still tracks roughly a finger's worth of movement.

  Under prefers-reduced-motion nothing is instantiated at all, so the
  browser's own scrolling is untouched. Note that a phone with Reduce Motion
  switched on in accessibility settings will therefore scroll natively, by
  design. The hero separately provides a short, opacity-only branded opening
  instead of its full spatial sequence.

  anchors: true hands in-page links to Lenis, so the nav's #services and
  #verticals ease across instead of jumping while Lenis fights them.
*/
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      // Slower than the 1.2 default — this is the "slow" part of the ask.
      duration: 1.5,
      // easeOutExpo: leaves quickly and spends the rest settling.
      easing: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: true,
      touchMultiplier: 1,
      anchors: true,
      // Lenis drives its own rAF loop, so there is none to wire up here.
      autoRaf: true,
    })

    // The hero intro needs to hold the page still while it plays.
    registerScroller(lenis)

    return () => {
      registerScroller(null)
      lenis.destroy()
    }
  }, [])

  return null
}
