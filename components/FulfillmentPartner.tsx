import Image from 'next/image'
import aszLogo from '@/public/assets/web/asz-technologies.png'

/*
  The wordmark is transparent, so it sits straight on the cream with no
  plate behind it. It sits under the heading, ahead of the copy that names
  the partner. Rendered at 180px against a 342px source, which leaves
  enough pixels for a retina screen.
*/

/*
  Paragraph one is Hamza's own copy, unchanged. Two and three were added to
  give the partnership more than a single sentence of substance: who ASZ
  actually is, and how the two firms divide the work.

  ASZ's founding year, base and discipline are from its LinkedIn company
  profile (founded 2008, Bangalore, 51–200 staff, IT services and IT
  consulting). The operating model is per the business plan — ACE as general
  contractor, ASZ as the build crew, client never contracting ASZ directly.
  Deliberately no engineer headcount beyond the 42 already stated: the vault
  carries three different numbers for the bench and only one belongs in
  public.
*/
const PARAGRAPHS = [
  'We have partnered with ASZ Technologies who boast a team of 42 experienced developers and who have experience working with household names like Patek Philippe, Pfizer and NUS. ACE leverages the technical knowledge and domain expertise of ASZ to deploy enterprise grade services to our clientele.',
  'ASZ has been building custom software since 2008, out of Bangalore, across application development, systems integration and IT consulting for multinational clients. That is a different discipline to the one most AI firms are staffed for — long-lived production systems, integration into estates that already exist, and delivery against fixed dates. It is also the discipline that separates a working demo from infrastructure a firm can run on.',
  'The division of labour is deliberate. ACE holds the client relationship, the diagnosis, the architecture and the quality bar. ASZ supplies engineering capacity, drawn per build rather than carried as fixed headcount. Clients contract ACE and only ACE — the bench sits behind us, working to our method and under our review. It means a deployment can scale from a single agent to a full platform without us hiring against it, and without a client absorbing the risk of a firm learning to build as it goes.',
]
export default function FulfillmentPartner() {
  return (
    <section id="fulfillment-partner" className="gutter section-y scroll-mt-24">
      <div className="flex max-w-[720px] flex-col gap-6">
        <span className="label">Fulfillment Partner</span>
        <h2 className="display-lg">Fulfillment Partner</h2>
        <Image
          src={aszLogo}
          alt="ASZ Technologies"
          sizes="180px"
          className="h-auto w-[150px] md:w-[180px]"
        />
        {PARAGRAPHS.map((paragraph) => (
          <p
            key={paragraph.slice(0, 40)}
            className="text-base leading-[1.7] text-ace-ink md:text-[18px]"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  )
}
