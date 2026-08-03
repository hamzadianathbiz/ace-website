import type { Metadata } from 'next'
import LegalDocument, { type LegalSection } from '@/components/LegalDocument'
import { EMAIL } from '@/lib/links'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How ACE collects, uses, shares and protects personal information.',
  alternates: { canonical: '/legal/privacy' },
}

const EFFECTIVE_DATE = '3 August 2026'

const SECTIONS: LegalSection[] = [
  {
    id: 'scope',
    title: 'Scope and responsible organisation',
    blocks: [
      {
        type: 'paragraph',
        content: (
          <>
            This Privacy Policy explains how ACE — AI Deployment Co. (“ACE”, “we”, “us” or “our”)
            handles personal information when you visit this website, contact us, book a discovery
            call, join a partner waitlist or otherwise interact with ACE before a separate client or
            partner agreement applies.
          </>
        ),
      },
      {
        type: 'paragraph',
        content: (
          <>
            ACE is the organisation responsible for the personal information described in this
            policy. Our address is 1/1 Bore Bank Road, 560046, Bangalore, India. Client projects may
            involve additional data-processing terms specific to that engagement.
          </>
        ),
      },
    ],
  },
  {
    id: 'information-collected',
    title: 'Information we collect',
    blocks: [
      {
        type: 'paragraph',
        content: <>Depending on how you interact with ACE, we may collect:</>,
      },
      {
        type: 'list',
        items: [
          <><strong>Contact and professional information:</strong> name, work email, telephone number, company, job title, professional profile and location.</>,
          <><strong>Enquiry and scheduling information:</strong> meeting preferences, calendar details you choose to provide, service interests and discovery-call notes.</>,
          <><strong>Partner information:</strong> waitlist responses, network or referral context and information relevant to assessing program fit.</>,
          <><strong>Communications:</strong> emails, messages, attachments, feedback and records of our correspondence.</>,
          <><strong>Technical information:</strong> internet protocol address, browser and device type, referring page, requested pages, timestamps and security or diagnostic logs generated when the website is delivered.</>,
          <><strong>Relationship records:</strong> proposals, consents, preferences and administrative records created if an enquiry progresses.</>,
        ],
      },
      {
        type: 'paragraph',
        content: (
          <>
            Please do not submit special-category or sensitive personal information, confidential
            deal materials, credentials or personal information about another person through a
            general website, scheduling or waitlist channel unless ACE has expressly requested it
            through an approved method.
          </>
        ),
      },
    ],
  },
  {
    id: 'sources',
    title: 'How we receive information',
    blocks: [
      {
        type: 'list',
        items: [
          <>directly from you when you email, message, schedule a call or submit a form;</>,
          <>from Cal.com when you book a discovery call and from Tally when you submit the Partner Program form;</>,
          <>from professional networks, referrals, public business sources or your organisation where relevant to a legitimate business enquiry; and</>,
          <>automatically from Vercel and related website infrastructure when it processes requests, protects the service and produces technical logs.</>,
        ],
      },
    ],
  },
  {
    id: 'use',
    title: 'How we use information',
    blocks: [
      {
        type: 'list',
        items: [
          <>responding to enquiries, scheduling calls and communicating with you;</>,
          <>evaluating potential advisory, deployment, partnership or referral relationships;</>,
          <>preparing proposals and taking steps requested before entering a contract;</>,
          <>operating, securing, diagnosing and improving the website and our business processes;</>,
          <>maintaining business records, managing relationships and protecting legal rights;</>,
          <>complying with law, lawful requests and regulatory or professional obligations; and</>,
          <>sending relevant business communications where permitted, with an opportunity to opt out of non-essential marketing.</>,
        ],
      },
      {
        type: 'paragraph',
        content: (
          <>
            ACE does not use website enquiry data to make solely automated decisions that produce
            legal or similarly significant effects about you.
          </>
        ),
      },
    ],
  },
  {
    id: 'lawful-bases',
    title: 'Lawful bases',
    blocks: [
      {
        type: 'paragraph',
        content: (
          <>
            Where a law requires a lawful basis, ACE relies on one or more of the following: your
            consent; taking steps at your request before a contract or performing a contract;
            compliance with a legal obligation; and legitimate interests in responding to business
            enquiries, developing relationships, operating securely and protecting our rights. We
            balance legitimate interests against your rights and expectations.
          </>
        ),
      },
      {
        type: 'paragraph',
        content: (
          <>
            Where processing depends on consent, you may withdraw it at any time. Withdrawal does
            not affect processing already carried out lawfully and may prevent us from providing the
            requested interaction.
          </>
        ),
      },
    ],
  },
  {
    id: 'cookies',
    title: 'Cookies and similar technologies',
    blocks: [
      {
        type: 'paragraph',
        content: (
          <>
            As of the effective date, ACE does not intentionally deploy advertising cookies,
            cross-site behavioural tracking or a first-party analytics SDK on this website. The
            website’s hosting and security infrastructure may process standard request data and use
            mechanisms that are strictly necessary to deliver and protect the service.
          </>
        ),
      },
      {
        type: 'paragraph',
        content: (
          <>
            Cal.com, Tally and LinkedIn are separate websites and may use cookies or similar
            technologies under their own notices when you follow a link to them. If ACE later adds
            non-essential analytics or advertising technologies to this website, we will update this
            policy and provide consent controls where required.
          </>
        ),
      },
    ],
  },
  {
    id: 'sharing',
    title: 'When we share information',
    blocks: [
      {
        type: 'paragraph',
        content: <>ACE may disclose personal information only as reasonably necessary to:</>,
      },
      {
        type: 'list',
        items: [
          <>hosting, scheduling, form, communications, security and professional-service providers acting for ACE;</>,
          <>personnel, contractors or delivery partners who need the information for an authorised ACE purpose and are subject to appropriate duties;</>,
          <>professional advisers, insurers, auditors and prospective transaction parties under suitable confidentiality arrangements;</>,
          <>courts, regulators, law enforcement or other parties where disclosure is required by law or reasonably necessary to protect rights, safety and security; and</>,
          <>a successor or prospective successor in a merger, financing, reorganisation or transfer of all or part of the business, subject to appropriate safeguards.</>,
        ],
      },
      {
        type: 'paragraph',
        content: (
          <>
            ACE does not sell personal information or share it for cross-context behavioural
            advertising. We do not allow service providers to use information received from ACE for
            their own unrelated marketing.
          </>
        ),
      },
    ],
  },
  {
    id: 'third-party-services',
    title: 'Third-party services',
    blocks: [
      {
        type: 'paragraph',
        content: (
          <>
            This website is hosted by Vercel. Discovery-call bookings are handled through Cal.com,
            Partner Program submissions through Tally, and professional-network links through
            LinkedIn. Their independent processing is described in the{' '}
            <a href="https://vercel.com/legal/privacy-notice" target="_blank" rel="noopener noreferrer">Vercel Privacy Notice</a>,{' '}
            <a href="https://cal.com/privacy" target="_blank" rel="noopener noreferrer">Cal.com Privacy Policy</a>,{' '}
            <a href="https://tally.so/help/privacy-policy" target="_blank" rel="noopener noreferrer">Tally Privacy Notice</a> and{' '}
            <a href="https://www.linkedin.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">LinkedIn Privacy Policy</a>.
          </>
        ),
      },
      {
        type: 'paragraph',
        content: (
          <>
            When ACE receives a booking or form response from a provider, ACE processes the received
            information for the purposes in this policy. You should direct requests about information
            retained independently in a provider’s own account or systems to that provider as well.
          </>
        ),
      },
    ],
  },
  {
    id: 'international-transfers',
    title: 'International transfers',
    blocks: [
      {
        type: 'paragraph',
        content: (
          <>
            ACE operates from India and uses providers that may process information in other
            countries. Those countries may have data-protection rules different from the rules where
            you live. Where required, ACE uses contractual protections, adequacy decisions or another
            lawful transfer mechanism and limits transfers to what is necessary for the stated purpose.
          </>
        ),
      },
    ],
  },
  {
    id: 'retention',
    title: 'How long we keep information',
    blocks: [
      {
        type: 'paragraph',
        content: (
          <>
            ACE keeps personal information only as long as reasonably necessary for the purpose for
            which it was collected, including follow-up on an enquiry, administration of a business
            relationship, security, dispute resolution and compliance with legal obligations.
          </>
        ),
      },
      {
        type: 'paragraph',
        content: (
          <>
            We generally retain inactive enquiry and waitlist records for up to 24 months after the
            last meaningful interaction unless you ask us to delete them sooner or an active
            relationship, legal requirement or claim requires longer retention. Contract, tax and
            transaction records are retained for the statutory period applicable to the record.
            Hosting and security logs follow the provider’s operational retention schedule.
          </>
        ),
      },
    ],
  },
  {
    id: 'security',
    title: 'Security',
    blocks: [
      {
        type: 'paragraph',
        content: (
          <>
            ACE uses reasonable administrative, technical and organisational safeguards appropriate
            to the nature of the information and the risks involved. No website, transmission or
            storage system is completely secure, so we cannot guarantee absolute security. If you
            believe information sent to ACE has been compromised, contact us promptly.
          </>
        ),
      },
    ],
  },
  {
    id: 'rights',
    title: 'Your choices and privacy rights',
    blocks: [
      {
        type: 'paragraph',
        content: (
          <>
            Depending on where you live and the law that applies, you may have rights to request
            access to or a copy of personal information, correction, deletion, restriction,
            portability, withdrawal of consent, objection to certain processing, and information
            about how data is used and disclosed. You may also have a right to complain to a
            competent data-protection authority and, under applicable Indian law, use a grievance
            process or nominate another person to exercise specified rights in the event of death or
            incapacity.
          </>
        ),
      },
      {
        type: 'paragraph',
        content: (
          <>
            Send a request to <a href={`mailto:${EMAIL}`}>{EMAIL}</a>. State the right you wish to
            exercise and provide enough information for us to identify the relevant records. ACE may
            verify your identity, seek clarification, protect the rights of others and retain
            information where law permits or requires. We will not discriminate against you for
            exercising a privacy right.
          </>
        ),
      },
      {
        type: 'paragraph',
        content: (
          <>
            You can opt out of non-essential marketing at any time by using the unsubscribe method in
            the message or contacting us. Service or relationship communications may continue where
            necessary.
          </>
        ),
      },
    ],
  },
  {
    id: 'regional-disclosures',
    title: 'Regional disclosures',
    blocks: [
      {
        type: 'paragraph',
        content: (
          <>
            For California residents, the categories described in “Information we collect” are the
            categories ACE may have collected and disclosed for operational business purposes during
            the preceding 12 months. ACE has not sold those categories or shared them for cross-context
            behavioural advertising. Where the California Consumer Privacy Act applies, residents may
            request to know, access, correct or delete covered information and may exercise applicable
            rights concerning sensitive information without discriminatory treatment.
          </>
        ),
      },
      {
        type: 'paragraph',
        content: (
          <>
            For individuals in the European Economic Area or United Kingdom, applicable rights may
            include access, rectification, erasure, restriction, objection and portability, as well as
            withdrawal of consent and a complaint to the supervisory authority where you live or work.
          </>
        ),
      },
    ],
  },
  {
    id: 'children',
    title: 'Children',
    blocks: [
      {
        type: 'paragraph',
        content: (
          <>
            The website and ACE’s business services are intended for adults acting in a professional
            capacity and are not directed to children. We do not knowingly collect personal
            information from anyone under 18 through this website. Contact us if you believe a child
            has provided information so we can review and delete it where appropriate.
          </>
        ),
      },
    ],
  },
  {
    id: 'changes',
    title: 'Changes to this policy',
    blocks: [
      {
        type: 'paragraph',
        content: (
          <>
            ACE may update this policy to reflect changes in the website, providers, business
            practices or law. We will publish the revised policy here and change the effective date.
            If a change materially affects how we use information already collected, we will provide
            any additional notice or choice required by applicable law.
          </>
        ),
      },
    ],
  },
  {
    id: 'contact',
    title: 'Privacy and grievance contact',
    blocks: [
      {
        type: 'paragraph',
        content: (
          <>
            Privacy questions, rights requests and grievances may be sent to{' '}
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a> or by post to: Privacy and Grievance Contact,
            ACE — AI Deployment Co., 1/1 Bore Bank Road, 560046, Bangalore, India.
          </>
        ),
      },
      {
        type: 'paragraph',
        content: (
          <>
            Please describe your concern and the response you are seeking. We will acknowledge and
            address it within the period required by applicable law. You may also complain to the
            data-protection or privacy regulator with authority in your jurisdiction.
          </>
        ),
      },
    ],
  },
]

export default function PrivacyPage() {
  return (
    <LegalDocument
      eyebrow="Legal"
      title="Privacy Policy"
      effectiveDate={EFFECTIVE_DATE}
      summary={
        <>
          This policy explains what ACE collects through its website and business-enquiry channels,
          why we use it, who receives it and the choices available to you.
        </>
      }
      sections={SECTIONS}
    />
  )
}
