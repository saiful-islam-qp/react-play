import React, {useState} from 'react'
import {NavLink} from 'react-router'
import clsx from 'clsx'
import type {NavSection} from '../../constants/navigation'
import {navigation} from '../../constants/navigation'

export const LeftSidebar: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<string[]>([
    'Getting Started',
    'Core Concepts',
  ])
  const [searchQuery, setSearchQuery] = useState('')

  const toggleSection = (title: string) => {
    setExpandedSections(prev =>
      prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title],
    )
  }

  const filteredNavigation: NavSection[] = navigation
    .map(section => ({
      ...section,
      links: section.links.filter(link =>
        link.name.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    }))
    .filter(section => section.links.length > 0)

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-slate-200 bg-white overflow-y-auto">
      <div className="sticky top-0 z-10 bg-white border-b border-slate-200 h-[48px] flex items-center px-4">
        <NavLink to="/" className="text-2xl font-bold text-slate-700">
          Drilldown
        </NavLink>
      </div>

      {/* Search Bar */}
      <div className="px-6 py-4 border-b border-slate-200">
        <div className="relative">
          <input
            type="text"
            placeholder="Search documentation..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2 bg-slate-100 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Navigation Sections */}
      <nav className="px-4 py-4">
        {filteredNavigation.length > 0 ? (
          <div className="space-y-6">
            {filteredNavigation.map((section: NavSection) => (
              <div key={section.title}>
                <button
                  onClick={() => toggleSection(section.title)}
                  className="w-full flex items-center justify-between px-2 py-2 text-sm font-semibold text-slate-900 hover:text-blue-600 transition"
                >
                  <span>{section.title}</span>
                  <span
                    className={clsx(
                      'text-slate-400 transition-transform',
                      expandedSections.includes(section.title)
                        ? 'rotate-90'
                        : '',
                    )}
                  >
                    ›
                  </span>
                </button>

                {expandedSections.includes(section.title) && (
                  <ul className="mt-2 ml-2 space-y-1">
                    {section.links.map(link => (
                      <li key={link.href}>
                        <NavLink
                          key={link.href}
                          to={link.href}
                          className="block"
                        >
                          {({isActive}) => (
                            <span
                              className={clsx(
                                'block px-3 py-2 text-sm rounded-md transition duration-150',
                                isActive
                                  ? 'bg-blue-50 text-blue-600 font-medium'
                                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
                              )}
                            >
                              {link.name}
                            </span>
                          )}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="px-2 py-4 text-center">
            <p className="text-sm text-slate-500">No results found</p>
          </div>
        )}
      </nav>
    </aside>
  )
}
