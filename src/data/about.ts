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
  /** Display handle — the link target is githubUrl. */
  github: string
  githubUrl: string
  location: string
  resumeUrl: string
}

export const ABOUT: AboutContent = {
  role: 'ml engineer · open to collaborations',
  bio: 'Placeholder',
  stack: ['Placeholder', 'Placeholder'],
  since: '2021',
  status: 'available',
  email: 'pearson.ned.m@gmail.com',
  github: 'Ned-Pearson',
  githubUrl: 'https://github.com/Ned-Pearson',
  location: 'Melbourne, Australia',
  resumeUrl: resumePdf,
}
