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
  services: string[]
  techStack: string[]
  overview: string
  myRole: string
  problems: string
  solutions: string
  outcome: string
  liveUrl: string
  githubUrl: string
}

export const cardData: ProjectItem[] = [
  {
    id: 1,
    slug: 'adapting-strategy-in-uncertain-markets',
    tag: 'Brand',
    projectStatus: 'New',
    year: '2025',
    client: 'Northstar Advisory',
    role: 'Product design, frontend development',
    industry: 'Brand strategy',
    timeline: '8 weeks',
    title: 'Adapting strategy in uncertain markets',
    subtitle:
      'How businesses can stay agile and make smarter decisions amid global shifts. A deep dive into resilient frameworks.',
    image:
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop',
    services: ['Strategy', 'Interface', 'Content', 'Frontend'],
    techStack: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion'],
    overview:
      'A focused digital narrative for a consulting team helping businesses make confident decisions in volatile markets. The page turns dense strategic thinking into a calm, editorial experience with clear hierarchy and fast routes to the strongest ideas.',
    myRole:
      'I shaped the information architecture, designed the page system, wrote key interface copy, and built the responsive frontend with motion details that support the reading flow.',
    problems:
      'The original story carried strong insight, but it was difficult to scan. Core messages competed for attention, important proof points were buried, and mobile users had too much text before reaching a clear action.',
    solutions:
      'I reduced the page into a smaller set of purposeful sections, added stronger visual pacing, created reusable content blocks, and designed interaction states that make the article feel polished without slowing it down.',
    outcome:
      'The finished experience makes the strategic offer easier to understand, gives the team a stronger project showcase, and creates a cleaner path from first impression to inquiry.',
    liveUrl: '/projects/adapting-strategy-in-uncertain-markets',
    githubUrl: 'https://github.com/',
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
    services: ['UX Design', 'Design System', 'Responsive UI', 'Content'],
    techStack: ['React', 'TypeScript', 'Design Systems', 'Figma'],
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
    services: ['Analytics UI', 'API Design', 'Accessibility', 'Frontend'],
    techStack: ['Next.js', 'Analytics UI', 'API Design', 'Accessibility'],
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
    services: ['Content Strategy', 'Responsive UI', 'Performance', 'Frontend'],
    techStack: ['React', 'Content Strategy', 'Responsive UI', 'Performance'],
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
    services: ['UX Design', 'ESG Content', 'Responsive UI', 'Frontend'],
    techStack: ['Next.js', 'React', 'Tailwind CSS', 'Accessibility'],
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
    services: ['Interface Design', 'Research Framing', 'Frontend', 'Motion'],
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
