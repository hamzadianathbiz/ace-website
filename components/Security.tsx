import Image from 'next/image'
import complianceImage from '@/public/assets/web/compliance.png'
import complianceStacked from '@/public/assets/web/compliance-stacked.png'

/*
  The same four standards in two aspect ratios, both supplied artwork.

  From md up: the 3:1 strip, below the statement rather than beside it —
  in a side column it would come down to about 170px tall with the labels
  unreadable.

  Below md: the 2x2 version. The wide strip fitted to a phone puts "COMING
  SOON" at roughly 6px, and the sideways scroll that fixed the legibility
  hid SOC 2 behind a swipe. Stacked, it stays legible with nothing to swipe.

  Both are transparent, so they sit straight on the page ground with no card
  or border — a box would be drawn around empty space rather than artwork.
*/
export default function Security() {
  return (
    <section className="gutter section-y">
      <div className="flex flex-col gap-8 md:gap-10">
        <div className="flex flex-col gap-4 md:max-w-[560px]">
          <span className="label">Security</span>
          <p className="display-md">
            GDPR and CCPA ready. Data handling, access control and retention
            built to the standards private capital firms are already held to.
          </p>
        </div>

        <Image
          src={complianceStacked}
          alt="GDPR ready. CCPA ready. ISO 27001 coming soon. SOC 2 auditing."
          sizes="100vw"
          className="mx-auto h-auto w-full max-w-[380px] md:hidden"
        />

        <Image
          src={complianceImage}
          alt="GDPR ready. CCPA ready. ISO 27001 coming soon. SOC 2 auditing."
          sizes="(max-width: 1128px) 100vw, 1128px"
          className="hidden h-auto w-full md:block"
        />
      </div>
    </section>
  )
}
