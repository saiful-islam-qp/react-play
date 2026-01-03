import React, {useState} from 'react'
import {AnimatePresence} from 'motion/react'
import {LazyMotion, domAnimation} from 'motion/react'
import * as m from 'motion/react-m'
import {MoDrilldownTitles} from './MoDrilldownTitles'
import {clsx} from 'clsx'

export type DrilldownTitle = {
  id: `level-${number}`
  title: string
}

export type variant = 'default' | 'slideRight' | 'slideLeft' | 'fadeZoom'

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
  headerClasses?: string
  headerStyles?: React.CSSProperties
  variant?: variant
}

export const MoDrilldown: React.FC<IProps> = ({
  items,
  initial,
  baseTitle,
  mode = 'wait',
  headerClasses = '',
  headerStyles = {},
  variant = 'default',
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

  const renderContent = () => {
    const item = items[currentLevel] ? items[currentLevel] : null
    if (!item)
      return (
        <div className="absolute inset-0 w-full h-full flex items-center justify-center">
          <p className="text-gray-500">No content available.</p>
        </div>
      )
    const content =
      typeof item.component === 'function'
        ? item.component({goNext, goBack})
        : item.component

    return (
      <m.div
        key={currentLevel}
        custom={direction}
        variants={getVariant(variant)}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{
          opacity: {duration: 0.325, ease: 'easeInOut'},
          scale: {duration: 0.275, ease: 'easeInOut'},
        }}
        className={clsx('w-full h-full', {
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
        headerClasses={headerClasses}
        headerStyles={headerStyles}
      />
      <LazyMotion features={domAnimation}>
        <AnimatePresence initial={false} custom={direction} mode={mode}>
          {renderContent()}
        </AnimatePresence>
      </LazyMotion>
    </div>
  )
}

const getVariant = (variant: variant) => {
  switch (variant) {
    case 'slideRight':
      return variantSlideRight
    case 'slideLeft':
      return variantSlideLeft
    case 'fadeZoom':
      return variantFadeZoom
    case 'default':
    default:
      return variantDefault
  }
}

const variantDefault = {
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

const variantSlideRight = {
  enter: (direction: number) => ({
    x: direction > 0 ? -15 : 15,
    opacity: 0,
    zIndex: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    zIndex: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? 15 : -15,
    opacity: 0,
    zIndex: 0,
  }),
}

const variantSlideLeft = {
  enter: (direction: number) => ({
    x: direction > 0 ? 15 : -15,
    opacity: 0,
    zIndex: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    zIndex: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -15 : 15,
    opacity: 0,
    zIndex: 0,
  }),
}

const variantFadeZoom = {
  enter: (direction: number) => ({
    opacity: 0,
    zIndex: 0,
    scale: direction > 0 ? 0.925 : 1.1,
  }),
  center: {
    opacity: 1,
    zIndex: 1,
    scale: 1,
  },
  exit: {
    opacity: 0,
    zIndex: 0,
    scale: 1,
  },
}
