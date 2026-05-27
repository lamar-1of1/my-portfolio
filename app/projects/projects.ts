export interface ProjectItem {
  id: number
  tag: string
  projectStatus: string
  title: string
  subtitle: string
  image: string
  year: string
}

export const cardData: ProjectItem[] = [
  {
    id: 1,
    tag: 'BRAND',
    projectStatus: 'New',
    year: '2025',
    title: 'Adapting strategy in uncertain markets',
    subtitle:
      'How businesses can stay agile and make smarter decisions amid global shifts. A deep dive into resilient frameworks.',
    image:
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop',
  },
  {
    id: 2,
    tag: 'STRATEGY',
    projectStatus: 'New',
    year: '2025',
    title: 'Designing teams for modern growth',
    subtitle:
      'How structure and collaboration fuel performance in high-growth organizations. Rethinking the modern workspace.',
    image:
      'https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=2671&auto=format&fit=crop',
  },
  {
    id: 3,
    tag: 'MANAGEMENT',
    projectStatus: 'In Progress',
    year: '2024',
    title: 'The power of data-driven consulting',
    subtitle:
      'Why data is reshaping how consulting firms deliver value over time. Leveraging analytics for actionable insights.',
    image:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2664&auto=format&fit=crop',
  },
  {
    id: 4,
    tag: 'BRAND',
    projectStatus: 'In Progress',
    year: '2024',
    title: 'The future of client relationships',
    subtitle:
      'Building lasting trust and loyalty in an increasingly digital-first world. The human element in automated systems.',
    image:
      'https://images.unsplash.com/photo-1502809737437-1d85c70dd2ca?q=80&w=2670&auto=format&fit=crop',
  },
  {
    id: 5,
    tag: 'SUSTAINABILITY',
    projectStatus: 'In Progress',
    year: '2023',
    title: 'Sustainable consulting for lasting impact',
    subtitle:
      'Integrating ESG principles into core business strategies for long-term success and environmental stewardship.',
    image:
      'https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?q=80&w=2670&auto=format&fit=crop',
  },
  {
    id: 6,
    tag: 'ANALYTICS',
    projectStatus: 'In Progress',
    year: '2023',
    title: 'Navigating change with strategic foresight',
    subtitle:
      'Anticipating market trends to stay ahead of the curve and drive innovation in competitive landscapes.',
    image:
      'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=2670&auto=format&fit=crop',
  },
]
