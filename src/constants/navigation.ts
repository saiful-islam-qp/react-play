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
      {name: 'Installation', href: '/docs/installation'},
      {name: 'Editor Setup', href: '/docs/editor-setup'},
      {
        name: 'Using with Preprocessors',
        href: '/docs/using-with-preprocessors',
      },
      {name: 'Utility-First Fundamentals', href: '/docs/utility-first'},
      {name: 'Adding Custom Styles', href: '/docs/adding-custom-styles'},
      {name: 'Functions & Directives', href: '/docs/functions-and-directives'},
    ],
  },
  {
    title: 'Core Concepts',
    links: [
      {name: 'How Tailwind Works', href: '/docs/how-tailwind-works'},
      {
        name: 'Hover, Focus & Active States',
        href: '/docs/hover-focus-and-other-states',
      },
      {name: 'Responsive Design', href: '/docs/responsive-design'},
      {name: 'Dark Mode', href: '/docs/dark-mode'},
      {
        name: 'Optimizing for Production',
        href: '/docs/optimizing-for-production',
      },
      {name: 'Browser Support', href: '/docs/browser-support'},
    ],
  },
]
