/*
  Every outbound link on the site resolves from this file. One place to
  change when a URL moves, and nothing on the page is allowed to hardcode
  an href of its own.
*/

// Changing this one line changes every discovery-call button on the site.
export const DISCOVERY_CALL = 'https://cal.com/acedeployed/ace-discovery'

export const EMAIL = 'hamza@acedeployed.com'
export const LINKEDIN = 'https://www.linkedin.com/in/hamzavc'

/*
  The marketing story is one page, so most of these are in-page anchors and
  the ids live on the sections themselves — keep the two in step. Partners
  is its own route: it speaks to a different audience than the rest.

  The anchors are absolute, not bare hashes, so they still resolve from
  /partners rather than pointing at ids that only exist on the home page.
*/
export const SECTIONS = {
  approach: '/#approach',
  clients: '/#who-we-serve',
  build: '/#what-we-build',
  company: '/#company',
  partners: '/partners',
} as const
