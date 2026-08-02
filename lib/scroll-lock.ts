import type Lenis from 'lenis'

/*
  A handle on the Lenis instance for the one place that needs to freeze the
  page: the hero intro.

  Setting `body { overflow: hidden }` is enough to stop the browser, but not
  reliably enough to stop Lenis — it drives the scroll itself through
  window.scrollTo, so the honest way to hold it still is its own stop().
  Both are used together: the overflow lock covers the window before this
  module has an instance, or when smooth scrolling is off entirely.
*/
let instance: Lenis | null = null

export function registerScroller(lenis: Lenis | null) {
  instance = lenis
}

export function lockScroll() {
  instance?.stop()
}

export function unlockScroll() {
  instance?.start()
}
