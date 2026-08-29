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
  role: 'ml engineer · open to collaborations',
  bio: 'Placeholder',
  stack: ['Python', 'TypeScript', 'React', 'PyTorch', 'AWS'],
  since: '2021',
  status: 'available',
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
