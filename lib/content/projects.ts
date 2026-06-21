export interface ProjectCredit {
  name: string
  url?: string
}

export interface ProjectItem {
  id: number
  slug: string
  tag: string
  projectStatus: string
  title: string
  subtitle: string
  image: string
  year: string
  client: string
  role: string
  industry: string
  timeline: string
  techStack: string[]
  overview: string
  myRole: string
  problems: string
  solutions: string
  outcome: string
  credits?: ProjectCredit[]
  liveUrl: string
  githubUrl: string
}

export const cardData: ProjectItem[] = [
  {
    id: 1,
    slug: 'st-joseph-unveiling-our-legacy',
    tag: 'Community',
    projectStatus: 'In Progress',
    year: '2026',
    client: 'District Emergency Organisation (DEO)',
    role: 'Web Coordinator & Coder',
    industry: 'Disaster Preparedness, Community Engagement, Cultural Preservation & Education',
    timeline: '22 weeks',
    title: 'St. Joseph: Unveiling Our Legacy',
    subtitle:
      '"Unveiling Our Legacy" is a community initiative led by the St. Joseph District Emergency Organisation (DEO).',
    image:
      'https://i.postimg.cc/C5mPcMwV/Screenshot-2026-06-16-224104.png',
    techStack: ['Next.js', 'React', 'Tailwind CSS', 'Supabase', 'TypeScript', 'Google Auth', 'Supabase Auth', 'AWS', 'Vercel', 'Resend', 'MapBox', 'Bunny.net'],
    overview:
      '"Unveiling Our Legacy" is a community initiative led by the St. Joseph District Emergency Organisation (DEO). We have mapped key landmarks across the parish, from the Parris Hill Mural to historic churches and natural wonders. ',
    myRole:
      'Web Design Coordinator and Coder. The communication of information to the client, in a non-technical way abstracting from all code and technology as well as overseeing user experience, scheduling meetings and managing the day-to-day operations of the website.',
    problems:
      'Performance degradation of the Virtual Map, especially on lower-end devices. Initially hard-coded the unique IDs of certain murals/sites which made it less manageable amongst the huge cluster of code in the file.',
    solutions:
      'For the improvement of performance of the Virtual Map, I used Supabase to create a database of the murals and sites, and then fetched the data from the database to populate the map. This way, we can easily manage the data without having to hard-code it into the codebase.',
    outcome:
      'The project is still in progress, but the majority of the website is live and the map is functional. We continue to receive positive feedback from the community and other stakeholders, and I am excited to continue working on this project.',
    liveUrl: 'https://st-joseph-legacy-project.vercel.app',
    githubUrl: 'https://github.com/',
    credits: [
      {
        name: 'Shaquon Hamilton',
        url: 'https://www.shaquonhamilton.com',
      },
    ],
  },
  {
    id: 2,
    slug: 'designing-teams-for-modern-growth',
    tag: 'Strategy',
    projectStatus: 'New',
    year: '2025',
    client: 'Growth Studio',
    role: 'UX direction, design system',
    industry: 'Team operations',
    timeline: '6 weeks',
    title: 'Designing teams for modern growth',
    subtitle:
      'How structure and collaboration fuel performance in high-growth organizations. Rethinking the modern workspace.',
    image:
      'https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=2671&auto=format&fit=crop',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Figma'],
    overview:
      'A responsive product story for a team operations concept built around clarity, collaboration, and modern growth. The project translates abstract organizational ideas into a practical, scannable web experience.',
    myRole:
      'I defined the section structure, designed reusable content patterns, established the interface rhythm, and prepared the experience for handoff across desktop and mobile.',
    problems:
      'The content needed to explain complex team systems without feeling corporate or heavy. The key challenge was balancing credibility, warmth, and enough detail for decision-makers.',
    solutions:
      'I introduced modular sections, concise supporting copy, prominent trust cues, and a restrained visual system that keeps the page readable while still feeling distinct.',
    outcome:
      'The final page gives the concept a clearer product shape, improves scanability, and creates a more confident foundation for future service pages.',
    liveUrl: '/projects/designing-teams-for-modern-growth',
    githubUrl: 'https://github.com/',
  },
  {
    id: 3,
    slug: 'the-power-of-data-driven-consulting',
    tag: 'Management',
    projectStatus: 'In Progress',
    year: '2024',
    client: 'Signal Partners',
    role: 'Product interface, data storytelling',
    industry: 'Analytics consulting',
    timeline: '10 weeks',
    title: 'The power of data-driven consulting',
    subtitle:
      'Why data is reshaping how consulting firms deliver value over time. Leveraging analytics for actionable insights.',
    image:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2664&auto=format&fit=crop',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'REST API'],
    overview:
      'A data-led consulting experience designed to make insight feel useful instead of overwhelming. The interface frames analytics as a practical decision tool through simple content modules and measured visual density.',
    myRole:
      'I worked across information design, component planning, responsive layout, and frontend implementation for the project narrative and supporting detail views.',
    problems:
      'The project needed to communicate sophistication without turning into a dashboard. Dense data language, unclear section priorities, and competing calls to action reduced confidence.',
    solutions:
      'I created a cleaner hierarchy for insights, built compact evidence blocks, and used accessible contrast and spacing so the page could carry detail while remaining readable.',
    outcome:
      'The work creates a stronger bridge between analytics and business value, giving the consulting offer a sharper and more credible presentation.',
    liveUrl: '/projects/the-power-of-data-driven-consulting',
    githubUrl: 'https://github.com/',
  },
  {
    id: 4,
    slug: 'the-future-of-client-relationships',
    tag: 'Brand',
    projectStatus: 'In Progress',
    year: '2024',
    client: 'Harbor CX',
    role: 'Frontend development, content strategy',
    industry: 'Client experience',
    timeline: '5 weeks',
    title: 'The future of client relationships',
    subtitle:
      'Building lasting trust and loyalty in an increasingly digital-first world. The human element in automated systems.',
    image:
      'https://images.unsplash.com/photo-1502809737437-1d85c70dd2ca?q=80&w=2670&auto=format&fit=crop',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    overview:
      'A client-facing web flow for a customer experience concept centered on trust, speed, and human connection. The page presents relationship-building as a clear product value rather than a soft brand claim.',
    myRole:
      'I designed the flow, refined the copy hierarchy, built the responsive UI, and tuned the interaction moments for a more direct browsing experience.',
    problems:
      'The original concept had several strong messages, but they lacked a clear order. The experience needed to feel premium while keeping conversion paths visible.',
    solutions:
      'I reorganized the narrative around trust signals, benefit-led sections, and cleaner action areas, then built the page with lightweight motion and tighter responsive behavior.',
    outcome:
      'The final direction gives the project a more persuasive structure and makes it easier for visitors to understand the value of the client relationship offer.',
    liveUrl: '/projects/the-future-of-client-relationships',
    githubUrl: 'https://github.com/',
  },
  {
    id: 5,
    slug: 'sustainable-consulting-for-lasting-impact',
    tag: 'Sustainability',
    projectStatus: 'In Progress',
    year: '2023',
    client: 'Evergreen Works',
    role: 'UX design, frontend support',
    industry: 'Sustainability',
    timeline: '7 weeks',
    title: 'Sustainable consulting for lasting impact',
    subtitle:
      'Integrating ESG principles into core business strategies for long-term success and environmental stewardship.',
    image:
      'https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?q=80&w=2670&auto=format&fit=crop',
    techStack: ['Next.js', 'React', 'Tailwind CSS', 'Vercel'],
    overview:
      'A sustainability-focused service page built to turn ESG priorities into a practical business story. The experience balances environmental credibility with clear commercial value.',
    myRole:
      'I structured the page, designed the responsive sections, and translated broad sustainability goals into concise interface content.',
    problems:
      'The subject matter risked feeling vague and generic. The page needed clearer proof, sharper language, and a stronger sense of action.',
    solutions:
      'I organized the content around outcomes, added focused detail blocks, and used a calm visual system that supports trust without becoming overly decorative.',
    outcome:
      'The result gives the sustainability offer a clearer voice and makes the impact story easier to understand across devices.',
    liveUrl: '/projects/sustainable-consulting-for-lasting-impact',
    githubUrl: 'https://github.com/',
  },
  {
    id: 6,
    slug: 'navigating-change-with-strategic-foresight',
    tag: 'Analytics',
    projectStatus: 'In Progress',
    year: '2023',
    client: 'Futureline Group',
    role: 'Interface design, frontend development',
    industry: 'Market intelligence',
    timeline: '9 weeks',
    title: 'Navigating change with strategic foresight',
    subtitle:
      'Anticipating market trends to stay ahead of the curve and drive innovation in competitive landscapes.',
    image:
      'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=2670&auto=format&fit=crop',
    techStack: ['React', 'TypeScript', 'Framer Motion', 'Tailwind CSS'],
    overview:
      'A strategic foresight project page designed to help visitors understand change signals, planning frameworks, and the value of anticipating market shifts before they become urgent.',
    myRole:
      'I designed the information flow, built the responsive frontend, and created visual patterns that make future-facing content feel grounded and actionable.',
    problems:
      'The concept involved a lot of abstract language. Visitors needed quicker orientation, clearer takeaways, and a more confident visual rhythm.',
    solutions:
      'I broke the story into plain-language sections, paired insights with concise evidence, and used restrained motion to guide attention through the page.',
    outcome:
      'The final page makes the foresight offer easier to evaluate and gives the project a stronger editorial presence.',
    liveUrl: '/projects/navigating-change-with-strategic-foresight',
    githubUrl: 'https://github.com/',
  },
]

export function getProjectBySlug(slug: string) {
  return cardData.find((project) => project.slug === slug)
}

export function getOtherProjects(slug: string, limit = 2) {
  return cardData.filter((project) => project.slug !== slug).slice(0, limit)
}
