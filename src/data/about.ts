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
  bio: "I build small, sharp tools and train models to do things I'd otherwise do by hand. Most of what's on this desktop started as a personal annoyance and ended as a weekend that got out of control.",
  stack: ['PyTorch', 'Python', 'TypeScript', 'React'],
  since: '2021',
  status: 'available',
}
