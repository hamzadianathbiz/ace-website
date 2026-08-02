'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import { registerScroller } from '@/lib/scroll-lock'

/*
  Eased wheel scrolling. The page keeps moving for a beat after the wheel
  stops rather than snapping to a halt, which is the "slow and smooth" feel.

  Two deliberate limits:

  - Touch is left alone. syncTouch defaults off and stays off: phones and
    trackpad-less tablets already scroll with their own momentum, and
    driving that from JS is what makes smooth-scroll sites feel laggy and
    detached on a phone. Desktop gets the easing, mobile keeps native.
  - Under prefers-reduced-motion nothing is instantiated at all, so the
    browser's own scrolling is untouched.

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
