// Static content for the About Me window (General / Skills / Contact tabs).
// Placeholder copy — see Plan.md "Content status": replace before launch.

import resumePdf from '../assets/resume.pdf'

export interface AboutContent {
  role: string
  bio: string
  stack: string[]
  since: string
  status: string
  email: string
  github: string
  location: string
  resumeUrl: string
}

export const ABOUT: AboutContent = {
  role: 'ml engineer · open to collaborations',
  bio: 'Placeholder',
  stack: ['Placeholder', 'Placeholder'],
  since: '2021',
  status: 'available',
  email: 'Placeholder',
  github: 'Placeholder',
  location: 'Placeholder',
  resumeUrl: resumePdf,
}
