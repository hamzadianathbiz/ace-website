import Link from 'next/link'
import { DISCOVERY_CALL } from '@/lib/links'

/*
  The one call-to-action on the site. Every section carries it, so it is a
  component rather than a repeated <Link> — the label and the destination
  change in one place.

  Passing href={null} renders the same pill with no destination, for a
  button that has nowhere to point yet.
*/
export default function CallCta({
  variant,
  label = 'Book a Discovery Call',
  href = DISCOVERY_CALL,
}: {
  // Which surface the button is sitting on. See `.pill` in globals.css.
  variant?: 'solid' | 'on-film'
  label?: string
  href?: string | null
}) {
  const className = variant ? `pill ${variant}` : 'pill'
  const content = (
    <>
      <span>{label}</span>
      <span aria-hidden>→</span>
    </>
  )

  if (href === null) {
    // A real <button> rather than a styled <span>: it stays keyboard
    // reachable and announces itself as a control, which is what it looks
    // like. It does nothing until it is given somewhere to go.
    return (
      <button type="button" className={className}>
        {content}
      </button>
    )
  }

  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  )
}
