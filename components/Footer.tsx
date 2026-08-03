import Image from 'next/image'
import Link from 'next/link'
import footerImage from '@/public/assets/web/footer-interior.png'
import aceLogoWhite from '@/public/assets/web/ace-logo-white.png'
import { DISCOVERY_CALL, EMAIL, LEGAL, LINKEDIN, SECTIONS } from '@/lib/links'

type FooterItem = { num: string; label: string; href: string; external?: boolean }
type FooterColumn = { title: string; items: FooterItem[] }

/*
  Three focused columns. Legal stays deliberately small: only the two
  documents visitors need, rather than a generic footer link farm.
*/
const COLUMNS: FooterColumn[] = [
  {
    title: 'Site',
    items: [
      { num: '1.1', label: 'Services', href: SECTIONS.services },
      { num: '1.2', label: 'Verticals', href: SECTIONS.verticals },
      { num: '1.3', label: 'Company', href: SECTIONS.company },
      { num: '1.4', label: 'Partner Program', href: SECTIONS.partners },
    ],
  },
  {
    title: 'Connect',
    items: [
      { num: '2.1', label: 'Book a Discovery Call', href: DISCOVERY_CALL },
      { num: '2.2', label: EMAIL, href: `mailto:${EMAIL}` },
      { num: '2.3', label: 'LinkedIn', href: LINKEDIN, external: true },
    ],
  },
  {
    title: 'Legal',
    items: [
      { num: '3.1', label: 'Terms & Conditions', href: LEGAL.terms },
      { num: '3.2', label: 'Privacy Policy', href: LEGAL.privacy },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="on-dark gutter relative overflow-hidden bg-ace-black pb-8 text-white md:pb-10">
      {/*
        The source is mostly unlit on the left with the window and sofa off
        to the right, which is why it works behind a footer: the text sits
        over the dark half and the picture reads in the space beside it.
        The mobile crop is shifted toward that visual subject while desktop
        keeps its existing right anchor.
      */}
      <Image
        src={footerImage}
        alt=""
        fill
        placeholder="blur"
        sizes="100vw"
        className="object-cover object-[88%_center] md:object-right"
      />
      <div className="absolute inset-0 bg-ace-black/85 md:bg-ace-black/70" />

      <div className="relative mx-auto max-w-[1440px] pt-11 font-mono text-[11px] uppercase tracking-[0.01em] leading-[1.3] md:pt-14 md:text-[12px]">
        <nav aria-label="Footer" className="flex flex-col gap-10 lg:grid lg:grid-cols-3 lg:gap-8">
          {COLUMNS.map((col) => (
            <ul key={col.title} className="flex flex-col gap-[0.8rem] pr-[0.8rem] lg:w-auto">
              <li className="mb-2 text-ace-gray3">{col.title}</li>
              {col.items.map((item) => (
                <li key={item.num}>
                  <Link
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener' : undefined}
                    className="flex min-h-11 touch-manipulation items-center transition-opacity duration-200 hover:opacity-70 md:min-h-0 md:items-start"
                  >
                    {/* Display face like every other number on the site. Sized
                        to the footer's own scale rather than the sections' —
                        "same font" is the typeface, not the size. */}
                    <span className="w-[4.5em] flex-none text-left font-display text-[13px] text-ace-red md:text-[14px]">
                      {item.num}
                    </span>
                    <span className="normal-case">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ))}
        </nav>

        {/* The 14rem gap that used to sit here made the footer taller than
            some of the sections above it. */}
        <div className="mt-12 flex flex-col gap-6 md:mt-16 md:items-start md:justify-between">
          <div className="w-2/5">
            <Image
              src={aceLogoWhite}
              alt="ACE"
              sizes="(max-width: 767px) 150px, 200px"
              className="w-[150px] h-auto md:w-[200px]"
            />
          </div>
          <div className="flex w-auto items-baseline gap-2 md:w-2/5">
            {/* Sits in the same left column as the ordinals above it, so it
                takes the same treatment. */}
            <span className="w-[4.5em] flex-none font-display text-[13px] text-ace-red md:text-[14px]">
              © 2026
            </span>
            <span>
              All rights reserved, ACE — AI Deployment Co.
              <br />
              1/1 Bore Bank Road, 560046, Bangalore, India
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
