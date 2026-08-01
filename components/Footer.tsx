import Link from 'next/link'
import CallCta from '@/components/CallCta'
import { DISCOVERY_CALL, EMAIL, LINKEDIN, SECTIONS } from '@/lib/links'

type FooterItem = { num: string; label: string; href: string; external?: boolean }
type FooterColumn = { title: string; items: FooterItem[] }

/*
  Two columns, not four. The retired columns pointed at /careers and
  /legal/* pages that do not exist — a 404 is worse than an absent link.
*/
const COLUMNS: FooterColumn[] = [
  {
    title: 'Site',
    items: [
      { num: '1.1', label: 'Who We Are', href: SECTIONS.whoWeAre },
      { num: '1.2', label: 'Who We Serve', href: SECTIONS.clients },
      { num: '1.3', label: 'What We Build', href: SECTIONS.build },
      { num: '1.4', label: 'Company', href: SECTIONS.company },
      { num: '1.5', label: 'Partner Program', href: SECTIONS.partners },
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
]

export default function Footer() {
  return (
    <footer className="on-dark gutter bg-ace-black pb-8 text-white md:pb-12">
      <div className="mx-auto max-w-[1440px] pt-[60px] font-mono text-[11px] uppercase tracking-[0.01em] leading-[1.3] md:pt-[82px] md:text-[12px]">
        <div className="mb-16 md:mb-24">
          <CallCta variant="on-film" />
        </div>

        <nav className="flex flex-col gap-10 md:flex-row">
          {COLUMNS.map((col) => (
            <ul key={col.title} className="flex flex-col gap-[0.8rem] pr-[0.8rem] md:w-[340px]">
              <li className="mb-2 text-ace-gray3">{col.title}</li>
              {col.items.map((item) => (
                <li key={item.num}>
                  <Link
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener' : undefined}
                    className="flex transition-opacity duration-200 hover:opacity-70"
                  >
                    <span className="w-[4.5em] flex-none text-left text-ace-gray3">{item.num}</span>
                    <span className="normal-case">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ))}
        </nav>

        <div className="mt-[4rem] flex flex-col gap-6 md:mt-[14rem] md:items-start md:justify-between">
          <div className="w-2/5">
            <img
              src="/assets/web/ace-logo-tagline-white.png"
              alt="ACE — AI Deployment Co."
              className="w-[200px] h-auto md:w-[320px]"
            />
          </div>
          <div className="flex w-auto items-baseline gap-2 md:w-2/5">
            <span className="w-[4.5em] flex-none text-ace-gray3">© 2026</span>
            <span>
              All rights reserved, ACE — AI Deployment Co.
              <br />
              Bangalore, India
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
