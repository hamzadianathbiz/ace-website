'use client'

import { useEffect, useRef } from 'react'

export type DitherFieldProps = {
  /** Same-origin video. Cross-origin taints the canvas and getImageData throws. */
  src?: string
  className?: string
  /** Glyph colour. Squares are drawn on transparency, so the section behind shows through. */
  color?: string
  /** Grid cell in CSS px. Smaller = finer and more expensive. */
  cell?: number
  /**
   * Levels window in source-luma terms. Everything below `levelsLow` reads as
   * full coverage, everything above `levelsHigh` as none. With `invert` this is
   * how the subject gets separated from its background.
   */
  levelsLow?: number
  levelsHigh?: number
  /** Ink where the source is dark, i.e. a print halftone. */
  invert?: boolean
  /**
   * `contain` keeps the whole subject in frame. There is no letterbox penalty
   * here — the background is never drawn, so the padding is simply white.
   */
  fit?: 'cover' | 'contain'
  /**
   * Region of the source to use, normalised [x0, y0, x1, y1]. Crops away parts
   * of the frame that are dark enough to survive the levels cut but are not
   * the subject — foliage, shadow, a dark top edge.
   */
  srcRect?: [number, number, number, number]
  gamma?: number
  contrast?: number
  amp?: number
  /** Below this, the cell is skipped entirely — this is what keeps the background clean. */
  threshold?: number
  maxScale?: number
  playbackRate?: number
  /** How fast a cell chases its target value. 1 = no smoothing. */
  smoothing?: number
}

// The source is reduced to this before it is ever read. Anything larger is
// wasted work — the grid is coarser than this even at its finest.
const SAMPLE_W = 256
const SAMPLE_H = 144

const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n)

const DEBUG = false
const RUNS = { n: 0 }

/** Stand-in field so the renderer is tunable before real footage exists. */
const BLOBS = [
  { sx: 0.31, sy: 0.23, px: 0.0, py: 1.1, rx: 0.26, ry: 0.19, w: 1.0 },
  { sx: -0.19, sy: 0.37, px: 2.2, py: 0.4, rx: 0.21, ry: 0.24, w: 0.8 },
  { sx: 0.43, sy: -0.29, px: 4.1, py: 2.7, rx: 0.17, ry: 0.14, w: 0.6 },
]

function procedural(buf: Float32Array, t: number) {
  for (let y = 0; y < SAMPLE_H; y++) {
    const v = y / SAMPLE_H
    for (let x = 0; x < SAMPLE_W; x++) {
      const u = x / SAMPLE_W
      let acc = 0
      for (const b of BLOBS) {
        const bx = 0.5 + Math.cos(t * b.sx + b.px) * b.rx
        const by = 0.5 + Math.sin(t * b.sy + b.py) * b.ry
        const dx = u - bx
        const dy = (v - by) * 0.78
        acc += b.w / (dx * dx + dy * dy + 0.006)
      }
      buf[y * SAMPLE_W + x] = clamp01(acc * 0.006)
    }
  }
}

export default function DitherField({
  src,
  className = '',
  color = '#D60019',
  cell = 5,
  levelsLow = 0,
  levelsHigh = 1,
  invert = false,
  fit = 'cover',
  srcRect = [0, 0, 1, 1],
  gamma = 1.1,
  contrast = 1.35,
  amp = 1,
  threshold = 0.06,
  maxScale = 1.18,
  playbackRate = 0.5,
  smoothing = 0.35,
}: DitherFieldProps) {
  const hostRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Read tuning through a ref so changing a knob does not tear down the loop.
  const opts = useRef({
    color, cell, levelsLow, levelsHigh, invert, fit, srcRect,
    gamma, contrast, amp, threshold, maxScale, smoothing,
  })
  useEffect(() => {
    opts.current = {
      color, cell, levelsLow, levelsHigh, invert, fit, srcRect,
      gamma, contrast, amp, threshold, maxScale, smoothing,
    }
  }, [color, cell, levelsLow, levelsHigh, invert, fit, srcRect, gamma, contrast, amp, threshold, maxScale, smoothing])

  useEffect(() => {
    const host = hostRef.current
    const canvas = canvasRef.current
    if (!host || !canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    RUNS.n++
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const sampler = document.createElement('canvas')
    sampler.width = SAMPLE_W
    sampler.height = SAMPLE_H
    const sctx = sampler.getContext('2d', { willReadFrequently: true })

    const target = new Float32Array(SAMPLE_W * SAMPLE_H)
    const shown = new Float32Array(SAMPLE_W * SAMPLE_H)
    let seeded = false

    // iOS refuses to decode some detached video elements, so it lives in the
    // DOM but is never visible.
    let video: HTMLVideoElement | null = null
    let usingVideo = false
    let lastErr = ''

    if (src) {
      video = document.createElement('video')
      video.src = src
      video.muted = true
      video.loop = true
      video.playsInline = true
      video.preload = 'auto'
      video.setAttribute('playsinline', '')
      video.setAttribute('aria-hidden', 'true')
      video.style.cssText =
        'position:absolute;width:1px;height:1px;opacity:0;pointer-events:none;left:0;top:0'
      host.appendChild(video)
      video.defaultPlaybackRate = playbackRate
      video.playbackRate = playbackRate
      video.play().catch((e) => {
        lastErr = `play:${e.name}`
      })
      video.addEventListener('error', () => {
        usingVideo = false
        lastErr = `media:${video?.error?.code ?? '?'}`
      })
    }

    const readVideo = () => {
      if (!sctx || !video || video.readyState < 2) return
      let d: Uint8ClampedArray
      try {
        sctx.drawImage(video, 0, 0, SAMPLE_W, SAMPLE_H)
        d = sctx.getImageData(0, 0, SAMPLE_W, SAMPLE_H).data
      } catch (e) {
        lastErr = `read:${(e as Error).name}`
        return
      }
      for (let i = 0; i < target.length; i++) {
        const p = i * 4
        // Real luma — the footage is colour, so the red channel alone would
        // misread anything that is not already greyscale.
        target[i] = (0.2126 * d[p] + 0.7152 * d[p + 1] + 0.0722 * d[p + 2]) / 255
      }
      usingVideo = true
      // One frame is all reduced motion gets — stop decoding after it.
      if (still) video.pause()
    }

    let dpr = 1
    let w = 0
    let h = 0

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      const r = host.getBoundingClientRect()
      w = Math.max(1, Math.round(r.width * dpr))
      h = Math.max(1, Math.round(r.height * dpr))
      canvas.width = w
      canvas.height = h
      canvas.style.width = `${r.width}px`
      canvas.style.height = `${r.height}px`
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(host)

    const draw = () => {
      const o = opts.current
      const cellDev = Math.max(2, Math.round(o.cell * dpr))
      const cols = Math.ceil(w / cellDev)
      const rows = Math.ceil(h / cellDev)

      const [rx0, ry0, rx1, ry1] = o.srcRect
      const rw = rx1 - rx0
      const rh = ry1 - ry0
      const boxAspect = w / h
      // Aspect of the cropped region, not the whole frame.
      const srcAspect = (SAMPLE_W * rw) / (SAMPLE_H * rh)
      const contain = o.fit === 'contain'

      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = o.color

      // One path for every square, filled once. N fillRect calls at this grid
      // density is an order of magnitude slower.
      ctx.beginPath()

      for (let gy = 0; gy < rows; gy++) {
        const cy = gy * cellDev + cellDev / 2
        for (let gx = 0; gx < cols; gx++) {
          const cx = gx * cellDev + cellDev / 2

          let u = cx / w
          let v = cy / h
          if (contain ? boxAspect > srcAspect : boxAspect < srcAspect) {
            u = 0.5 + (u - 0.5) * (boxAspect / srcAspect)
          } else {
            v = 0.5 + (v - 0.5) * (srcAspect / boxAspect)
          }
          // Contain leaves the source's edges inside the box, so anything
          // outside is padding and must not clamp to the border pixel.
          if (contain && (u < 0 || u > 1 || v < 0 || v > 1)) continue

          const su = rx0 + clamp01(u) * rw
          const sv = ry0 + clamp01(v) * rh
          const sx = Math.min(SAMPLE_W - 1, (su * SAMPLE_W) | 0)
          const sy = Math.min(SAMPLE_H - 1, (sv * SAMPLE_H) | 0)

          let l = shown[sy * SAMPLE_W + sx]
          // Levels first — this is the cut that decides what counts as subject
          // and what is background to be dropped.
          const span = o.levelsHigh - o.levelsLow
          l = clamp01(span > 0 ? (l - o.levelsLow) / span : l)
          if (o.invert) l = 1 - l
          l = clamp01((l - 0.5) * o.contrast + 0.5)
          l = Math.pow(l, o.gamma) * o.amp

          if (l < o.threshold) continue

          const size = Math.round(Math.min(l, 1) * o.maxScale * cellDev)
          if (size < 1) continue

          ctx.rect(Math.round(cx - size / 2), Math.round(cy - size / 2), size, size)
        }
      }

      ctx.fill()

      if (DEBUG) {
        ctx.fillStyle = '#000'
        ctx.font = '16px monospace'
        ctx.fillText(
          `rs=${video?.readyState ?? -1} net=${video?.networkState ?? -1} ` +
            `paused=${video?.paused} t=${video?.currentTime.toFixed(2)} ` +
            `usingVideo=${usingVideo} still=${still} runs=${RUNS.n} ` +
            `inDom=${video ? document.contains(video) : '?'} err=${lastErr || 'none'}`,
          12,
          h - 24
        )
      }
    }

    let raf = 0
    let lastRead = -1e9
    const tick = (now: number) => {
      const o = opts.current

      // Sampled from the main loop rather than requestVideoFrameCallback: the
      // video is 1px at zero opacity, so it may never be presented for
      // composition, and an rVFC chain that misses its first frame never
      // re-arms. 30Hz is plenty for a clip playing at half speed.
      if (video && now - lastRead >= 33) {
        lastRead = now
        readVideo()
      }

      if (!usingVideo) procedural(target, still ? 0 : now / 1000)

      if (!seeded) {
        shown.set(target)
        seeded = true
      } else {
        const k = still ? 1 : o.smoothing
        for (let i = 0; i < shown.length; i++) shown[i] += (target[i] - shown[i]) * k
      }

      draw()
      // Under reduced motion, keep going only until a real frame has landed —
      // otherwise a slow-loading video freezes on the stand-in field forever.
      if (!still || !usingVideo) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      if (video) {
        video.pause()
        video.removeAttribute('src')
        video.load()
        video.remove()
      }
    }
  }, [src, playbackRate])

  return (
    // No positioning of its own — the caller owns that, and hardcoding
    // `relative` here silently beats an `absolute` passed in via className.
    <div ref={hostRef} className={className} aria-hidden>
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  )
}
