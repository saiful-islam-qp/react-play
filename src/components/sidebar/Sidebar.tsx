import React from 'react'
import clsx from 'clsx'

const HashLinks = [
  {
    href: '#overview',
    name: 'Overview',
  },
  {
    href: '#basic-example',
    name: 'Basic Example',
  },
  {
    href: '#with-many-titles',
    name: 'With many titles',
  },
  {
    href: '#usage',
    name: 'Usage',
  },
]

export const SideBar: React.FC = () => {
  const [isClicked, setIsClicked] = React.useState(HashLinks[0].href)

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ): void => {
    const targetUrl = event.currentTarget.getAttribute('href')
    setIsClicked(targetUrl || '')
  }

  return (
    <div className="sticky top-8 border-l border-gray-300 pl-4">
      <p className="mb-2 font-medium uppercase tracking-wider">On this page</p>
      <ul className="text-sm flex flex-col gap-1">
        {HashLinks.map(link => (
          <li key={link.href}>
            <a
              href={link.href}
              className={clsx(
                'hover:underline underline-offset-2 transition duration-200 text-sm',
                isClicked === link.href
                  ? 'font-medium text-(--primary-text-color)'
                  : 'font-normal text-(--secondary-text-color)',
              )}
              onClick={handleClick}
            >
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
