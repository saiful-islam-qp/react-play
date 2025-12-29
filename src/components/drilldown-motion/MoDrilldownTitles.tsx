import React from 'react'
import type {DrilldownTitle} from './MoDrilldown'
import clsx from 'clsx'
import classnames from 'classnames'
import {ChevronRightIcon} from 'lucide-react'
import {WuMenu, WuMenuItem} from '@npm-questionpro/wick-ui-lib'
import {AnimatePresence, domAnimation, LazyMotion} from 'motion/react'
import * as m from 'motion/react-m'

interface IProps {
  titles: DrilldownTitle[]
  currentLevel: `level-${number}`
  initial: `level-${number}`
  handleTitleClick: (
    e: React.MouseEvent<HTMLHeadingElement, MouseEvent>,
    levelId?: `level-${number}`,
  ) => void
}

export const MoDrilldownTitles: React.FC<IProps> = ({
  titles,
  currentLevel,
  initial,
  handleTitleClick,
}) => {
  return (
    <div
      className={clsx(
        'absolute z-50 top-0 left-0 flex px-4 transform items-center origin-left w-full transition-all duration-300',
        {
          'translate-y-0 opacity-100 delay-300': currentLevel !== initial,
          'translate-y-1 opacity-0 delay-0': currentLevel === initial,
        },
        'wu-drilldown-titles',
      )}
    >
      <WuMenu
        Trigger={
          <span
            className={clsx(
              'wm-more-vert text-base cursor-pointer hover:bg-gray-200 shrink-0 rounded mr-0.5',
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

      <div className="relative h-10 flex items-center flex-nowrap whitespace-nowrap text-nowrap gap-1 overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth">
        <LazyMotion features={domAnimation}>
          <AnimatePresence initial={false} mode="popLayout">
            {getTitleElement(titles).map((title, index) => (
              <m.div
                key={title.id}
                initial={{y: 8, opacity: 0, zIndex: 0}}
                animate={{y: 0, opacity: 1, zIndex: 50}}
                exit={{y: -8, opacity: 0, zIndex: 0}}
                transition={{duration: 0.3}}
              >
                <h6
                  data-id={title.id}
                  onClick={handleTitleClick}
                  className={classnames(
                    'flex text-sm items-center gap-1',
                    index === 2 ||
                      index === 1 ||
                      title.id === ('level-dots' as `level-${number}`)
                      ? 'cursor-default font-bold text-gray-900'
                      : 'cursor-pointer',
                  )}
                >
                  {index !== 0 && <ChevronRightIcon className="w-3 h-3" />}
                  {title.title}
                </h6>
              </m.div>
            ))}
          </AnimatePresence>
        </LazyMotion>
      </div>
    </div>
  )
}

const getTitleElement = (titles: DrilldownTitle[]) => {
  const length = titles.length
  if (length > 2) {
    const firstTitle = titles[0]
    const lastTitle = titles[length - 1]

    const middleTitleDots = {
      id: 'level-dots' as `level-${number}`,
      title: '...',
    }
    return [firstTitle, middleTitleDots, lastTitle]
  }

  return titles
}
