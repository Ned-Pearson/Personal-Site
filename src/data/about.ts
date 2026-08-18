// Static content for the About Me window (General / Skills / Contact tabs).
// Placeholder copy — see Plan.md "Content status": replace before launch.

export interface AboutContent {
  role: string
  bio: string
  stack: string[]
  since: string
  status: string
}

export const ABOUT: AboutContent = {
  role: 'ml engineer · open to collaborations',
  bio: 'Placeholder',
  stack: ['Placeholder', 'Placeholder'],
  since: '2021',
  status: 'available',
}
