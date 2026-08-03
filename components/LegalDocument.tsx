import type { ReactNode } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export type LegalBlock =
  | { type: 'paragraph'; content: ReactNode }
  | { type: 'list'; items: ReactNode[] }

export type LegalSection = {
  id: string
  title: string
  blocks: LegalBlock[]
}

type LegalDocumentProps = {
  eyebrow: string
  title: string
  summary: ReactNode
  effectiveDate: string
  sections: LegalSection[]
}

function SectionLinks({ sections }: { sections: LegalSection[] }) {
  return (
    <ol className="flex flex-col gap-3">
      {sections.map((section, index) => (
        <li key={section.id}>
          <a
            href={`#${section.id}`}
            className="group grid grid-cols-[2.75rem_1fr] gap-2 text-[12px] leading-[1.4] text-ace-muted transition-colors duration-200 hover:text-ace-black"
          >
            <span className="font-display text-[14px] text-ace-red">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span>{section.title}</span>
          </a>
        </li>
      ))}
    </ol>
  )
}

export default function LegalDocument({
  eyebrow,
  title,
  summary,
  effectiveDate,
  sections,
}: LegalDocumentProps) {
  return (
    <>
      <Header />
      <main id="main-content" className="gutter pb-20 pt-8 md:pb-28 md:pt-14">
        <header className="mx-auto grid w-full max-w-[1128px] gap-8 border-b border-ace-line pb-10 md:grid-cols-[1fr_1fr] md:gap-16 md:pb-14">
          <div className="flex flex-col gap-5">
            <span className="label">{eyebrow}</span>
            <h1 className="display-xl max-w-[620px] text-balance text-black">{title}</h1>
          </div>

          <div className="flex max-w-[620px] flex-col justify-end gap-6 md:justify-self-end">
            <p className="text-pretty text-[16px] leading-[1.7] tracking-[-0.017em] text-[#1C1A1A]/70 md:text-[18px]">
              {summary}
            </p>
            <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-ace-muted md:text-[12px]">
              Effective {effectiveDate}
            </p>
          </div>
        </header>

        <div className="mx-auto mt-8 w-full max-w-[1128px] md:mt-14 lg:grid lg:grid-cols-[240px_minmax(0,720px)] lg:gap-20">
          <details className="mb-10 border-y border-ace-line py-4 lg:hidden">
            <summary className="cursor-pointer font-mono text-[11px] uppercase tracking-[0.08em] text-ace-black">
              On this page
            </summary>
            <nav aria-label={`${title} sections`} className="mt-5">
              <SectionLinks sections={sections} />
            </nav>
          </details>

          <aside className="hidden lg:block">
            <nav
              aria-label={`${title} sections`}
              className="sticky top-8 border-t border-ace-line pt-5"
            >
              <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.08em] text-ace-muted">
                On this page
              </p>
              <SectionLinks sections={sections} />
            </nav>
          </aside>

          <article className="min-w-0">
            {sections.map((section, index) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-24 border-t border-ace-line py-9 first:border-t-0 first:pt-0 md:scroll-mt-28 md:py-12 lg:scroll-mt-8"
              >
                <div className="grid grid-cols-[2.75rem_1fr] gap-2 md:grid-cols-[3.5rem_1fr] md:gap-4">
                  <span className="font-display text-[16px] text-ace-red md:text-[18px]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h2 className="display-sm text-balance text-black">{section.title}</h2>
                    <div className="mt-5 flex flex-col gap-4 text-[15px] leading-[1.75] text-ace-ink md:text-[16px] [&_a]:underline [&_a]:decoration-ace-red/40 [&_a]:underline-offset-4 [&_a]:transition-colors [&_a]:duration-200 hover:[&_a]:text-ace-red">
                      {section.blocks.map((block, blockIndex) =>
                        block.type === 'paragraph' ? (
                          <p key={blockIndex} className="text-pretty">
                            {block.content}
                          </p>
                        ) : (
                          <ul key={blockIndex} className="flex flex-col gap-3">
                            {block.items.map((item, itemIndex) => (
                              <li key={itemIndex} className="grid grid-cols-[0.5rem_1fr] gap-3">
                                <span className="mt-[0.7em] h-1.5 w-1.5 bg-ace-red" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </article>
        </div>
      </main>
      <Footer />
    </>
  )
}
