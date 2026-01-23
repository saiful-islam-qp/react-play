import React from 'react'
import type {DrilldownTitle} from './MoDrilldown'
import clsx from 'clsx'
import {ChevronRightIcon} from 'lucide-react'
import {WuButton, WuMenu, WuMenuItem} from '@npm-questionpro/wick-ui-lib'
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
  headerClasses?: string
}

export const MoDrilldownTitles: React.FC<IProps> = ({
  titles,
  currentLevel,
  initial,
  handleTitleClick,
  headerClasses,
}) => {
  return (
    <div
      className={clsx(
        'absolute top-0 left-0 flex gap-x-1 px-4 items-center origin-left w-full transition',
        {
          'translate-y-0 opacity-100 z-50 delay-200': currentLevel !== initial,
          'translate-y-1 opacity-0 z-0 delay-0': currentLevel === initial,
        },
        headerClasses,
      )}
      style={{
        height: currentLevel !== initial ? `40px` : '-40px',
      }}
    >
      <WuMenu
        Trigger={
          <WuButton
            variant="iconOnly"
            className="w-6 h-6 shrink-0 p-0"
            Icon={<span className={clsx('wm-arrow-drop-down w-5 h-5')}></span>}
          />
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

      <div className="relative h-full flex items-center flex-nowrap whitespace-nowrap text-nowrap gap-1 overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth">
        <LazyMotion features={domAnimation}>
          <AnimatePresence initial={false} mode="popLayout">
            {getTitleElement(titles).map((title, index) => (
              <m.div
                key={title.id}
                initial={{y: 8, opacity: 0, zIndex: 0}}
                animate={{y: 0, opacity: 1, zIndex: 50}}
                exit={{y: -8, opacity: 0, zIndex: 0}}
                transition={{duration: 0.4, ease: 'easeInOut'}}
              >
                <h6
                  data-id={title.id}
                  onClick={handleTitleClick}
                  className={clsx(
                    'flex text-sm font-medium items-center gap-1',
                    index === 2 ||
                      index === 1 ||
                      title.id === ('level-dots' as `level-${number}`)
                      ? 'cursor-default text-gray-600'
                      : 'cursor-pointer text-[#1B87E6] hover:text-[#145DBF]/70',
                    title.id === ('level-dots' as `level-${number}`) &&
                      'text-[#1B87E6]',
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
