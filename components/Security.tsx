import Image from 'next/image'
import complianceImage from '@/public/assets/web/compliance.png'

/*
  The badge strip is supplied artwork, sitting below the statement rather
  than beside it: it is a 3:1 letterbox, and in a side column it would have
  come down to about 170px tall with the labels too small to read.
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

        <div className="overflow-hidden rounded-2xl border border-ace-line">
          <Image
            src={complianceImage}
            alt="GDPR ready. CCPA ready. ISO 27001 coming soon. SOC 2 auditing."
            placeholder="blur"
            sizes="(max-width: 1128px) 100vw, 1128px"
            className="h-auto w-full"
          />
        </div>
      </div>
    </section>
  )
}
