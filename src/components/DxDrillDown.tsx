import React, {useEffect} from 'react'
import {CSSTransition, SwitchTransition} from 'react-transition-group'
import styles from './WuDrilldown.module.css'
import {clsx} from 'clsx'

export interface DrilldownContext {
  goNext: (id: `level-${number}`) => void
  goBack: (id: `level-${number}`) => void
}

export interface DrilldownItem {
  nodeRef: React.RefObject<HTMLDivElement | null>
  component: React.ReactNode | ((ctx: DrilldownContext) => React.ReactNode)
}

interface IProps {
  items: Record<`level-${number}`, DrilldownItem>
  initial: `level-${number}`
}

export const DxDrilldown: React.FC<IProps> = ({items, initial}) => {
  const [open, setOpen] = React.useState(initial)
  const [pendingOpen, setPendingOpen] = React.useState<
    `level-${number}` | null
  >(null)
  const [animationClass, setAnimationClass] =
    React.useState('fade-zoom-view-in')

  const goNext = (id: `level-${number}`) => {
    setAnimationClass(() => 'fade-zoom-view-in')
    setPendingOpen(id)
  }

  const goBack = (id: `level-${number}`) => {
    setAnimationClass(() => 'fade-zoom-view-out')
    setPendingOpen(id)
  }

  const getContent = (item: DrilldownItem) => {
    if (typeof item.component === 'function') {
      return item.component({goNext, goBack})
    }
    return item.component
  }

  useEffect(() => {
    if (pendingOpen) {
      setOpen(pendingOpen)
      setPendingOpen(null)
    }
  }, [animationClass, pendingOpen])

  return (
    <SwitchTransition mode="out-in">
      <CSSTransition
        key={open}
        nodeRef={items[open].nodeRef}
        timeout={500}
        classNames={animationClass}
        unmountOnExit
      >
        <div ref={items[open].nodeRef} className={clsx(styles.container)}>
          {getContent(items[open])}
        </div>
      </CSSTransition>
    </SwitchTransition>
  )
}
