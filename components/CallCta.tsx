import Link from 'next/link'
import { DISCOVERY_CALL } from '@/lib/links'

/*
  The one call-to-action on the site. Every section carries it, so it is a
  component rather than a repeated <Link> — the label and the destination
  change in one place.
*/
export default function CallCta({
  variant,
  label = 'Book a Discovery Call',
}: {
  // Which surface the button is sitting on. See `.pill` in globals.css.
  variant?: 'solid' | 'on-film'
  label?: string
}) {
  return (
    <Link href={DISCOVERY_CALL} className={variant ? `pill ${variant}` : 'pill'}>
      <span>{label}</span>
      <span aria-hidden>→</span>
    </Link>
  )
}
