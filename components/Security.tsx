import Image from 'next/image'
import complianceImage from '@/public/assets/web/compliance.png'

/*
  The badge strip is supplied artwork, sitting below the statement rather
  than beside it: it is a 3:1 letterbox, and in a side column it would have
  come down to about 170px tall with the labels too small to read.

  Its background is transparent, so it sits straight on the page ground with
  no card or border around it — a box here would be drawn around empty space
  rather than around the artwork.
*/
export default function Security() {
  return (
    <section className="gutter section-y">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-4 md:max-w-[560px]">
          <span className="label">Security</span>
          <p className="display-md">
            GDPR and CCPA ready. Data handling, access control and retention
            built to the standards private capital firms are already held to.
          </p>
        </div>

        {/*
          The strip is 3:1. Fitted to a phone it comes out ~110px tall and
          "COMING SOON" lands at about 6px — there, but unreadable. Holding a
          floor width and letting it scroll inside its own box keeps the
          labels legible instead. Above that width the floor never binds, so
          desktop is untouched.
        */}
        <div className="overflow-x-auto">
          <Image
            src={complianceImage}
            alt="GDPR ready. CCPA ready. ISO 27001 coming soon. SOC 2 auditing."
            sizes="(max-width: 1128px) 100vw, 1128px"
            className="h-auto w-full min-w-[640px]"
          />
        </div>
      </div>
    </section>
  )
}
