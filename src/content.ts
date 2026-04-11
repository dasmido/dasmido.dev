export type Service = {
  title: string
  description: string
}

export type Project = {
  name: string
  type: string
  year: string
}

export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  category: string
  readTime: string
  publishedAt: string
  content: string[]
}

export const services: Service[] = [
  {
    title: 'Brand Strategy',
    description:
      'Positioning, messaging, and voice systems that make your work recognizable.',
  },
  {
    title: 'Creative Direction',
    description:
      'Visual concepts, launch art direction, and design guidance for product and content.',
  },
  {
    title: 'Digital Experience',
    description:
      'Modern websites and interactions built for speed, clarity, and conversion.',
  },
]

export const projects: Project[] = [
  {
    name: 'Northline Studio',
    type: 'Identity + Website',
    year: '2026',
  },
  {
    name: 'Halcyon Labs',
    type: 'Product Launch',
    year: '2025',
  },
  {
    name: 'Aster Travel',
    type: 'Campaign System',
    year: '2025',
  },
]

export const blogPosts: BlogPost[] = [
  {
    slug: 'building-a-personal-brand-that-converts',
    title: 'Building a Personal Brand That Converts',
    excerpt:
      'A practical framework for turning your personal brand into a trust engine that brings quality leads.',
    category: 'Brand Strategy',
    readTime: '6 min read',
    publishedAt: 'Apr 2, 2026',
    content: [
      'A personal brand is not just a logo, a color palette, or a clever headline. It is the repeated experience people have when they interact with your work online.',
      'Start with clarity. Define who you help, what problem you solve, and why your approach is different. If this is not obvious in five seconds, your visitors leave before they understand your value.',
      'Then build consistency. Use the same visual language, tone of voice, and offer structure across your homepage, case studies, and social content. Consistency reduces friction and increases trust.',
      'Finally, make conversion easy. Every page should guide the reader to one action: book a call, send an email, or request a proposal. Clear direction is what turns attention into opportunities.',
    ],
  },
  {
    slug: 'designing-portfolios-for-high-value-clients',
    title: 'Designing Portfolios for High-Value Clients',
    excerpt:
      'How to structure your portfolio so serious clients instantly see depth, process, and outcomes.',
    category: 'Portfolio',
    readTime: '5 min read',
    publishedAt: 'Mar 21, 2026',
    content: [
      'Most portfolios focus on visuals only. High-value clients care about outcomes and decision-making. Show both.',
      'Lead each project with context: what the business challenge was, what constraints existed, and what needed to change. Then show your process and the final solution.',
      'Use numbers where possible. Metrics like conversion lift, engagement increase, or faster onboarding make your work easier to evaluate and compare.',
      'Keep each case study tight, but never vague. Specific stories are what separate premium portfolios from generic galleries.',
    ],
  },
  {
    slug: 'the-minimal-website-checklist-for-founders',
    title: 'The Minimal Website Checklist for Founders',
    excerpt:
      'A no-fluff checklist to launch a clean, credible website that looks premium and performs fast.',
    category: 'Web Design',
    readTime: '4 min read',
    publishedAt: 'Mar 9, 2026',
    content: [
      'If you are launching fast, focus on essentials: clear headline, concise positioning, proof, and one primary call-to-action.',
      'Your first fold should answer three questions immediately: what you do, who it is for, and what to do next.',
      'Use social proof early. Testimonials, logos, or selected wins signal credibility before visitors scroll too far.',
      'Speed matters. Compress images, limit animations, and prioritize readability. A fast and clear website is often more persuasive than a complicated one.',
    ],
  },
]

