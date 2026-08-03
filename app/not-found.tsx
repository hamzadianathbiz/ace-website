import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Page not found',
  description: 'The requested page could not be found.',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main-content" className="gutter flex min-h-[60svh] items-center py-20 md:py-28">
        <div className="mx-auto flex w-full max-w-[810px] flex-col items-start gap-6">
          <span className="label">404</span>
          <h1 className="display-xl text-balance">Page not found</h1>
          <p className="max-w-[620px] text-[16px] leading-[1.7] text-ace-ink md:text-[18px]">
            The page may have moved, or the address may be incorrect.
          </p>
          <Link href="/" className="pill">
            <span>Return home</span>
            <span aria-hidden>→</span>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
