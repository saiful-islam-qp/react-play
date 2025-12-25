import React, {useEffect} from 'react'
import {CSSTransition, SwitchTransition} from 'react-transition-group'
import {DxDrilldownTitles} from './DxDrilldownTitles'
import {useAnimationState} from '../context/AnimationContext'
import clsx from 'clsx'

export type DrilldownTitle = {
  id: `level-${number}`
  title: string
  nodeRef: React.RefObject<HTMLHeadingElement | null>
}

export interface DrilldownContext {
  goNext: (id: `level-${number}`, data?: DrilldownTitle) => void
  goBack: (id: `level-${number}`, data?: DrilldownTitle) => void
}

export interface DrilldownItem {
  nodeRef: React.RefObject<HTMLDivElement | null>
  component: React.ReactNode | ((ctx: DrilldownContext) => React.ReactNode)
}

interface IProps {
  items: Record<`level-${number}`, DrilldownItem>
  initial: `level-${number}`
  baseTitle?: DrilldownTitle
}

export const DxDrilldown: React.FC<IProps> = ({items, initial, baseTitle}) => {
  const {state} = useAnimationState()
  const [open, setOpen] = React.useState(initial)
  const [pendingOpen, setPendingOpen] = React.useState<
    `level-${number}` | null
  >(null)
  const [animationClass, setAnimationClass] = React.useState(
    state.contentAnimation.id + '-view-in',
  )
  const [titles, setTitles] = React.useState<DrilldownTitle[]>(
    baseTitle ? [baseTitle] : [],
  )

  const goNext = (id: `level-${number}`, data?: DrilldownTitle) => {
    setAnimationClass(() => state.contentAnimation.id + '-view-in')

    if (data) setTitles([...titles, data])
    setPendingOpen(id)
  }

  const goBack = (id: `level-${number}`) => {
    setAnimationClass(() => state.contentAnimation.id + '-view-out')
    setPendingOpen(id)
  }

  const getContent = (item: DrilldownItem) => {
    if (typeof item.component === 'function') {
      return item.component({goNext, goBack})
    }
    return item.component
  }

  const handleTitleClick = (
    e: React.MouseEvent<HTMLHeadingElement>,
    levelId?: `level-${number}`,
  ) => {
    const id = levelId
      ? levelId
      : ((e.currentTarget.getAttribute('data-id') || '') as `level-${number}`)

    if (id && id !== open) {
      const titleIndex = titles.findIndex(title => title.id === id)
      if (titleIndex !== -1) {
        setTitles(titles.slice(0, titleIndex + 1))
        goBack(id)
      }
    }
  }

  useEffect(() => {
    if (pendingOpen) {
      setOpen(pendingOpen)
      setPendingOpen(null)
    }
  }, [animationClass, pendingOpen])

  return (
    <div className="h-full relative">
      <DxDrilldownTitles
        titles={titles}
        open={open}
        initial={initial}
        handleTitleClick={handleTitleClick}
      />

      <SwitchTransition mode="out-in">
        <CSSTransition
          key={open}
          nodeRef={items[open].nodeRef}
          timeout={405}
          classNames={animationClass}
          unmountOnExit
        >
          <div
            ref={items[open].nodeRef}
            className={clsx('relative h-full', {
              'pt-10': open !== initial,
            })}
          >
            {getContent(items[open])}
          </div>
        </CSSTransition>
      </SwitchTransition>
    </div>
  )
}
