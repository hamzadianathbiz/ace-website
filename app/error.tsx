'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <>
      <Header />
      <main id="main-content" className="gutter flex min-h-[60svh] items-center py-20 md:py-28">
        <div className="mx-auto flex w-full max-w-[810px] flex-col items-start gap-6">
          <span className="label">Error</span>
          <h1 className="display-xl text-balance">This page could not be loaded</h1>
          <p className="max-w-[620px] text-[16px] leading-[1.7] text-ace-ink md:text-[18px]">
            Please try again. If the problem continues, return to the homepage or contact ACE.
          </p>
          <button type="button" onClick={reset} className="pill">
            <span>Try again</span>
            <span aria-hidden>→</span>
          </button>
        </div>
      </main>
      <Footer />
    </>
  )
}
