import type { Metadata } from 'next'
import LegalDocument, { type LegalSection } from '@/components/LegalDocument'
import { EMAIL } from '@/lib/links'

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Terms governing access to and use of the ACE website.',
  alternates: { canonical: '/legal/terms' },
  openGraph: {
    title: 'Terms & Conditions — ACE',
    description: 'Terms governing access to and use of the ACE website.',
    url: '/legal/terms',
    siteName: 'ACE — AI Deployment Co.',
    type: 'website',
    images: ['/assets/web/hero-cityscape-poster.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms & Conditions — ACE',
    description: 'Terms governing access to and use of the ACE website.',
    images: ['/assets/web/hero-cityscape-poster.jpg'],
  },
}

const EFFECTIVE_DATE = '3 August 2026'

const SECTIONS: LegalSection[] = [
  {
    id: 'acceptance',
    title: 'About ACE and acceptance of these terms',
    blocks: [
      {
        type: 'paragraph',
        content: (
          <>
            This website is operated by ACE — AI Deployment Co. (“ACE”, “we”, “us” or “our”),
            located at 1/1 Bore Bank Road, 560046, Bangalore, India. These Terms &amp;
            Conditions govern your access to and use of this website and its content.
          </>
        ),
      },
      {
        type: 'paragraph',
        content: (
          <>
            By accessing or using the website, you agree to these terms. If you use the website
            for an organisation, you confirm that you have authority to bind that organisation.
            If you do not agree, do not use the website.
          </>
        ),
      },
    ],
  },
  {
    id: 'eligibility',
    title: 'Eligibility and authority',
    blocks: [
      {
        type: 'paragraph',
        content: (
          <>
            You must be at least 18 years old and legally capable of entering a binding agreement
            to use this website. You may not use it if applicable law prohibits you from doing so.
          </>
        ),
      },
    ],
  },
  {
    id: 'website-purpose',
    title: 'Website purpose and no professional advice',
    blocks: [
      {
        type: 'paragraph',
        content: (
          <>
            The website describes ACE’s AI advisory, deployment and partner-program activities.
            Its content is general information only. It is not investment, financial, legal, tax,
            accounting, regulatory, cybersecurity or other professional advice, and it is not a
            recommendation concerning any investment, transaction, model, vendor or technology.
          </>
        ),
      },
      {
        type: 'paragraph',
        content: (
          <>
            You are responsible for obtaining appropriate professional advice and conducting your
            own assessment before acting on website content. Examples, case studies and performance
            statements are contextual and do not guarantee future results.
          </>
        ),
      },
    ],
  },
  {
    id: 'engagements',
    title: 'Enquiries and client engagements',
    blocks: [
      {
        type: 'paragraph',
        content: (
          <>
            A discovery-call booking, email, waitlist submission or other enquiry does not create
            a client, advisory, fiduciary, employment, partnership or agency relationship and does
            not oblige ACE to provide services.
          </>
        ),
      },
      {
        type: 'paragraph',
        content: (
          <>
            Paid work begins only under a written agreement accepted by ACE and the client. That
            agreement, including any proposal, statement of work or service schedule incorporated
            into it, governs the engagement. If it conflicts with these website terms, the signed
            client agreement controls for that engagement.
          </>
        ),
      },
    ],
  },
  {
    id: 'partner-program',
    title: 'Partner Program',
    blocks: [
      {
        type: 'paragraph',
        content: (
          <>
            Joining a Partner Program waitlist does not guarantee admission, compensation,
            exclusivity or access to an opportunity. Participation is invitation-only and subject
            to separate written partner terms. Unless ACE expressly authorises it in writing, you
            may not represent that you act for ACE or can bind ACE.
          </>
        ),
      },
    ],
  },
  {
    id: 'acceptable-use',
    title: 'Acceptable use',
    blocks: [
      {
        type: 'paragraph',
        content: <>You agree not to use the website to:</>,
      },
      {
        type: 'list',
        items: [
          <>violate any law, regulation, third-party right or contractual obligation;</>,
          <>introduce malware, interfere with availability, bypass security or probe for vulnerabilities without written permission;</>,
          <>impersonate another person, misstate an affiliation or submit information you have no right to provide;</>,
          <>copy, scrape or systematically extract website content for resale, model training or a competing commercial service;</>,
          <>use automated requests in a way that burdens the website or prevents others from using it; or</>,
          <>attempt to reverse engineer or misuse any website component.</>,
        ],
      },
    ],
  },
  {
    id: 'intellectual-property',
    title: 'Intellectual property',
    blocks: [
      {
        type: 'paragraph',
        content: (
          <>
            The website, its design, copy, graphics, logos, case-study presentation and other
            content are owned by ACE or used under licence and are protected by applicable
            intellectual-property laws. ACE grants you a limited, revocable, non-exclusive and
            non-transferable licence to view the website for lawful personal use or internal
            business evaluation.
          </>
        ),
      },
      {
        type: 'paragraph',
        content: (
          <>
            No other right is granted. You may not reproduce, modify, publish, distribute, sell,
            license or commercially exploit website content without ACE’s prior written consent.
            “ACE” and associated marks may not be used in a way that suggests endorsement or
            affiliation without permission.
          </>
        ),
      },
    ],
  },
  {
    id: 'submissions',
    title: 'Submissions and confidentiality',
    blocks: [
      {
        type: 'paragraph',
        content: (
          <>
            Do not send confidential deal information, personal data about third parties, regulated
            data, credentials, source code or trade secrets through a general enquiry channel unless
            ACE has agreed in writing to receive it through an approved method.
          </>
        ),
      },
      {
        type: 'paragraph',
        content: (
          <>
            An unsolicited submission does not create a duty of confidentiality. ACE will handle
            personal information as described in its Privacy Policy, but confidentiality obligations
            for client or partner materials arise only from an applicable written agreement.
          </>
        ),
      },
    ],
  },
  {
    id: 'third-parties',
    title: 'Third-party services and links',
    blocks: [
      {
        type: 'paragraph',
        content: (
          <>
            The website links to services operated by others, including Cal.com, Tally and LinkedIn.
            Those services are governed by their own terms and privacy notices. ACE does not control
            their availability, security or content and is not responsible for their independent acts
            or omissions. A link does not imply endorsement of every statement or service on the
            linked site.
          </>
        ),
      },
    ],
  },
  {
    id: 'availability',
    title: 'Availability and changes to the website',
    blocks: [
      {
        type: 'paragraph',
        content: (
          <>
            ACE may change, suspend or discontinue any part of the website without notice. We do not
            guarantee uninterrupted access, error-free operation, permanent availability of content
            or compatibility with every device or browser. You are responsible for securing your own
            systems and maintaining appropriate backups.
          </>
        ),
      },
    ],
  },
  {
    id: 'disclaimers',
    title: 'Disclaimers',
    blocks: [
      {
        type: 'paragraph',
        content: (
          <>
            To the maximum extent permitted by law, the website and its content are provided “as is”
            and “as available”. ACE disclaims implied warranties of merchantability, fitness for a
            particular purpose, title, non-infringement, accuracy and reliability. Nothing in these
            terms limits a right or warranty that applicable law does not allow the parties to exclude.
          </>
        ),
      },
    ],
  },
  {
    id: 'liability',
    title: 'Limitation of liability',
    blocks: [
      {
        type: 'paragraph',
        content: (
          <>
            To the maximum extent permitted by law, ACE and its personnel will not be liable for any
            indirect, incidental, special, exemplary, punitive or consequential loss, or for loss of
            profit, revenue, opportunity, goodwill, data or business interruption, arising from or
            related to the website, linked services or reliance on website content.
          </>
        ),
      },
      {
        type: 'paragraph',
        content: (
          <>
            Nothing in these terms excludes or limits liability for fraud, wilful misconduct, death
            or personal injury caused by negligence, or any other liability that cannot lawfully be
            excluded or limited. Liability under a signed client agreement is governed by that
            agreement rather than this section.
          </>
        ),
      },
    ],
  },
  {
    id: 'indemnity',
    title: 'Responsibility for misuse',
    blocks: [
      {
        type: 'paragraph',
        content: (
          <>
            You will be responsible for losses, claims and reasonable costs incurred by ACE because
            of your unlawful use of the website, your material breach of these terms or your violation
            of another person’s rights, except to the extent the loss was caused by ACE.
          </>
        ),
      },
    ],
  },
  {
    id: 'law-disputes',
    title: 'Governing law and disputes',
    blocks: [
      {
        type: 'paragraph',
        content: (
          <>
            These terms are governed by the laws of India. Subject to any mandatory law that applies
            otherwise, the courts located in Bengaluru, Karnataka have exclusive jurisdiction over
            disputes concerning these terms or the website.
          </>
        ),
      },
      {
        type: 'paragraph',
        content: (
          <>
            Before starting formal proceedings, each party should give the other written notice of
            the dispute and allow 30 days for a good-faith attempt to resolve it, unless urgent
            injunctive relief is reasonably required.
          </>
        ),
      },
    ],
  },
  {
    id: 'general',
    title: 'Changes and general provisions',
    blocks: [
      {
        type: 'paragraph',
        content: (
          <>
            ACE may update these terms by publishing a revised version and changing the effective
            date. Changes apply prospectively from publication. Continued use after that date means
            you accept the revised terms.
          </>
        ),
      },
      {
        type: 'paragraph',
        content: (
          <>
            If a provision is held unenforceable, it will be limited to the minimum extent necessary
            and the remaining provisions will continue. A failure to enforce a provision is not a
            waiver. These terms do not create third-party beneficiary rights.
          </>
        ),
      },
    ],
  },
  {
    id: 'contact',
    title: 'Contact',
    blocks: [
      {
        type: 'paragraph',
        content: (
          <>
            Questions about these terms may be sent to <a href={`mailto:${EMAIL}`}>{EMAIL}</a> or by
            post to ACE — AI Deployment Co., 1/1 Bore Bank Road, 560046, Bangalore, India.
          </>
        ),
      },
    ],
  },
]

export default function TermsPage() {
  return (
    <LegalDocument
      eyebrow="Legal"
      title="Terms & Conditions"
      effectiveDate={EFFECTIVE_DATE}
      summary={
        <>
          These terms govern use of the ACE website. Any advisory or deployment engagement is
          governed separately by the written agreement signed for that work.
        </>
      }
      sections={SECTIONS}
    />
  )
}
