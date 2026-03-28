export interface NavLink {
  name: string
  href: string
  icon?: string
}

export interface NavSection {
  title: string
  links: NavLink[]
}

export const navigation: NavSection[] = [
  {
    title: 'Getting Started',
    links: [
      {name: 'WHY? 3 Reasons', href: '/docs/reason'},
      {name: 'Installation', href: '/docs/installation'},
    ],
  },
  {
    title: 'How to',
    links: [
      {name: 'What are levels', href: '/docs/what-are-levels'},
      {name: 'Initial level', href: '/docs/initial-level'},
      {
        name: 'Base title',
        href: '/docs/base-title',
      },
      {
        name: 'Header customization',
        href: '/docs/header-customization',
      },
    ],
  },
]
