// Static content for the About Me window (General / Skills / Contact tabs).
// Placeholder copy — see Plan.md "Content status": replace before launch.

import resumePdf from '../assets/resume.pdf'

export interface SkillGroup {
  label: string
  items: string[]
}

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
  skills: SkillGroup[]
}

export const ABOUT: AboutContent = {
  role: 'Software Engineer · open to collaborations',
  bio: "Recent Computer Science grad from RMIT, still figuring out exactly what I want to specialise in. I like taking on projects that make me learn something new, whether that's wiring up a full-stack app or training a model on an interesting dataset. Right now I'm actively looking for my first full-time role, ideally one that keeps me learning.",
  stack: ['Python', 'TypeScript', 'React', 'PyTorch', 'AWS'],
  since: '2021',
  status: 'Looking for work',
  email: 'pearson.ned.m@gmail.com',
  github: 'Ned-Pearson',
  githubUrl: 'https://github.com/Ned-Pearson',
  location: 'Melbourne, Australia',
  resumeUrl: resumePdf,
  skills: [
    {
      label: 'Programming Languages',
      items: ['Python', 'Java', 'C++', 'JavaScript', 'TypeScript', 'SQL'],
    },
    {
      label: 'Data & Machine Learning',
      items: [
        'pandas',
        'NumPy',
        'scikit-learn',
        'PyTorch',
        'Exploratory Data Analysis',
        'Model Evaluation',
        'Data Augmentation',
        'CNNs',
        'Transfer Learning',
      ],
    },
    {
      label: 'Databases & Data Handling',
      items: ['SQL', 'MySQL', 'Firestore (NoSQL)', 'Data Validation & Quality Checks', 'Web Scraping', 'AI API Integration'],
    },
    {
      label: 'Visualisation',
      items: ['Matplotlib', 'Seaborn', 'Dashboards'],
    },
    {
      label: 'Web & Full Stack',
      items: ['React', 'Node.js', 'Express', 'HTML', 'CSS', 'REST APIs'],
    },
    {
      label: 'Cloud, Tools & Practices',
      items: ['AWS', 'Docker', 'Git', 'Agile/Scrum'],
    },
  ],
}
