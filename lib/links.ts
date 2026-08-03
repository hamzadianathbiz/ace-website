/*
  Every outbound link on the site resolves from this file. One place to
  change when a URL moves, and nothing on the page is allowed to hardcode
  an href of its own.
*/

// Changing this one line changes every discovery-call button on the site.
export const DISCOVERY_CALL = 'https://cal.com/acedeployed/ace-discovery'

// Tally form. Registers interest in the Partner Program — the terms it
// quotes mirror projects/partner-program/ace-partner-program.md v1.0 in the
// ACE vault, so change the form when that document changes.
export const PARTNER_WAITLIST = 'https://tally.so/r/Xx75E4'

export const EMAIL = 'contact@acedeployed.com'
export const LINKEDIN = 'https://www.linkedin.com/in/hamzavc'

/*
  The marketing story is one page, so most of these are in-page anchors and
  the ids live on the sections themselves — keep the two in step. Company
  and Partners are their own routes.

  The anchors are absolute, not bare hashes, so they still resolve from
  /company and /partners rather than pointing at ids that only exist on the
  home page.
*/
export const SECTIONS = {
  services: '/#services',
  verticals: '/#verticals',
  company: '/company',
  caseStudies: '/company#case-studies',
  fulfillmentPartner: '/company#fulfillment-partner',
  ourStory: '/company#our-story',
  partners: '/partners',
} as const
