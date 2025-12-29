import React, {useState} from 'react'
import {AnimatePresence} from 'motion/react'
import {LazyMotion, domAnimation} from 'motion/react'
import * as m from 'motion/react-m'
import {MoDrilldownTitles} from './moDrilldownTitles'
import {clsx} from 'clsx'

export type DrilldownTitle = {
  id: `level-${number}`
  title: string
}

export interface DrilldownContext {
  goNext: (id: `level-${number}`, data?: DrilldownTitle) => void
  goBack: (id: `level-${number}`, data?: DrilldownTitle) => void
}

export interface DrilldownItem {
  component: React.ReactNode | ((ctx: DrilldownContext) => React.ReactNode)
}

interface IProps {
  items: Record<`level-${number}`, DrilldownItem>
  initial: `level-${number}`
  baseTitle?: DrilldownTitle
  mode?: 'popLayout' | 'wait' | undefined
}

export const MoDrilldown: React.FC<IProps> = ({
  items,
  initial,
  baseTitle,
  mode = 'wait',
}) => {
  const [titles, setTitles] = useState<DrilldownTitle[]>(
    baseTitle ? [baseTitle] : [],
  )

  // 1 = Forward (Drill In), -1 = Backward (Drill Out)
  const [[currentLevel, direction], setLevel] = useState<
    [`level-${number}`, number]
  >([initial, 1])

  const goNext = (id: `level-${number}`, data?: DrilldownTitle) => {
    if (data) setTitles([...titles, data])
    setLevel([id, 1])
  }

  const goBack = (id: `level-${number}`) => {
    const titleIndex = titles.findIndex(t => t.id === id)
    if (titleIndex !== -1) {
      const newTitles = titles.slice(0, titleIndex + 1)
      setTitles(newTitles)
    }
    setLevel([id, -1])
  }

  const handleTitleClick = (
    e: React.MouseEvent<HTMLHeadingElement>,
    levelId?: `level-${number}`,
  ) => {
    const id = levelId
      ? levelId
      : ((e.currentTarget.getAttribute('data-id') || '') as `level-${number}`)

    if (id && id !== currentLevel) {
      const titleIndex = titles.findIndex(title => title.id === id)
      if (titleIndex !== -1) {
        setTitles(titles.slice(0, titleIndex + 1))
        goBack(id)
      }
    }
  }

  const variants = {
    enter: (direction: number) => ({
      scale: direction > 0 ? 0.825 : 1.1,
      opacity: 0,
      zIndex: 0,
    }),
    center: {
      scale: 1,
      opacity: 1,
      zIndex: 1,
    },
    exit: (direction: number) => ({
      scale: direction > 0 ? 1.1 : 0.825,
      opacity: 0,
      zIndex: 0,
    }),
  }

  const renderContent = () => {
    const item = items[currentLevel]
    const content =
      typeof item.component === 'function'
        ? item.component({goNext, goBack})
        : item.component

    return (
      <m.div
        key={currentLevel}
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{
          opacity: {duration: 0.325, ease: 'easeInOut'},
          scale: {duration: 0.275, ease: 'easeInOut'},
        }}
        className={clsx('absolute inset-0 w-full h-full', {
          'pt-10': currentLevel !== initial,
        })}
      >
        {content}
      </m.div>
    )
  }

  return (
    <div className="h-full relative overflow-hidden w-full flex flex-col">
      <MoDrilldownTitles
        titles={titles}
        currentLevel={currentLevel}
        initial={initial}
        handleTitleClick={handleTitleClick}
      />
      <LazyMotion features={domAnimation}>
        <AnimatePresence initial={false} custom={direction} mode={mode}>
          {renderContent()}
        </AnimatePresence>
      </LazyMotion>
    </div>
  )
}
