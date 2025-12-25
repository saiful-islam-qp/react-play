import React from 'react'
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import type {DrilldownTitle} from './DxDrillDown'
import clsx from 'clsx'
import {ChevronRightIcon} from 'lucide-react'
import {WuMenu, WuMenuItem} from '@npm-questionpro/wick-ui-lib'

interface IProps {
  titles: DrilldownTitle[]
  open: `level-${number}`
  initial: `level-${number}`
  handleTitleClick: (
    e: React.MouseEvent<HTMLHeadingElement, MouseEvent>,
    levelId?: `level-${number}`,
  ) => void
}

export const DxDrilldownTitles: React.FC<IProps> = ({
  titles,
  open,
  initial,
  handleTitleClick,
}) => {
  const headerContainerRef = React.useRef<HTMLDivElement | null>(null)

  return (
    <div
      ref={headerContainerRef}
      className={clsx(
        'absolute z-50 top-0 left-0 flex px-4 transform items-center origin-left w-full transition-all duration-300 delay-300',
        {
          'translate-x-[0px] opacity-100': open !== initial,
          'translate-x-1 opacity-0 left-0': open === initial,
        },
        'wu-drilldown-titles',
      )}
    >
      <WuMenu
        Trigger={
          <span
            className={clsx(
              'wm-more-vert transition-all duration-400 cursor-pointer hover:bg-gray-300 shrink-0 rounded mr-0.5',
              {
                'text-[0px]': titles.length <= 2,
                'text-lg': titles.length > 2,
              },
            )}
          ></span>
        }
      >
        {titles.map(title => (
          <WuMenuItem
            key={title.id}
            onSelect={e =>
              handleTitleClick(
                e as unknown as React.MouseEvent<
                  HTMLHeadingElement,
                  MouseEvent
                >,
                title.id,
              )
            }
          >
            {title.title}
          </WuMenuItem>
        ))}
      </WuMenu>

      <TransitionGroup
        data-node="header-content"
        className="text-gray-600 text-sm font-normal h-10 flex items-center flex-nowrap whitespace-nowrap text-nowrap gap-1 overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth"
      >
        {getTitleElement(titles, handleTitleClick)}
      </TransitionGroup>
    </div>
  )
}

const getTitleElement = (
  titles: DrilldownTitle[],
  handleTitleClick: (
    e: React.MouseEvent<HTMLHeadingElement, MouseEvent>,
  ) => void,
) => {
  const length = titles.length
  if (length <= 2) {
    return titles.map((title, index) => (
      <CSSTransition
        key={title.id}
        nodeRef={title.nodeRef}
        classNames="v3-header"
        timeout={650}
        unmountOnExit
      >
        <h6
          data-id={title.id}
          onClick={handleTitleClick}
          className="flex items-center gap-1 cursor-pointer select-none"
          ref={title.nodeRef}
        >
          {index !== 0 && <ChevronRightIcon className="w-3 h-3" />}
          {title.title}
        </h6>
      </CSSTransition>
    ))
  }

  if (length > 2) {
    const firstTitle = titles[0]
    const lastTitle = titles[length - 1]

    const middleTitleDots = {
      id: 'level-dots' as `level-${number}`,
      title: '...',
      nodeRef: React.createRef<HTMLHeadingElement>(),
    }
    return [firstTitle, middleTitleDots, lastTitle].map((title, index) => (
      <CSSTransition
        key={title.id}
        nodeRef={title.nodeRef}
        classNames="v3-header"
        timeout={650}
        unmountOnExit
      >
        <h6
          data-id={title.id}
          onClick={handleTitleClick}
          className="flex items-center gap-1 cursor-pointer select-none"
          ref={title.nodeRef}
        >
          {index !== 0 && <ChevronRightIcon className="w-3 h-3" />}
          {title.title}{' '}
        </h6>
      </CSSTransition>
    ))
  }
}
