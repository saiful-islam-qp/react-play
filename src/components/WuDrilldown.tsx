import React, {useState, useEffect} from 'react'
import {SwitchTransition, CSSTransition} from 'react-transition-group'
import styles from './WuDrilldown.module.css'
import {useAnimationState} from '../context/AnimationContext'
import {clsx} from 'clsx'

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen?: boolean
  children?: React.ReactNode
  contentAnimation?:
    | 'wu-fade-zoom'
    | 'wu-scale-left'
    | 'wu-slide-up-down'
    | 'wu-slide-left-right'
    | 'wu-scale-fade'
  headerAnimation?: 'wu-scale-left' | 'wu-slide-up-down' | 'wu-slide-left-right'
}

export const WuDrilldown: React.FC<IProps> = ({
  className,
  children,
  isOpen = false,
}) => {
  const {state} = useAnimationState()
  const [classNames, setClassNames] = useState(`v2-view-in`)
  const nodeRef = React.useRef<HTMLDivElement>(null)
  const [exited, setExited] = useState(false)
  const [entered, setEntered] = useState(false)

  const handleExited = () => {
    setExited(true)
  }

  const handleEntered = () => {
    setEntered(true)
  }
  useEffect(() => {
    if (exited && entered) {
      if (classNames !== `${state.contentAnimation.id}-view-in`) {
        setClassNames(`${state.contentAnimation.id}-view-in`)
      } else {
        setClassNames(`${state.contentAnimation.id}-view-out`)
      }

      setExited(false)
      setEntered(false)
    }
  }, [exited, entered, state])

  useEffect(() => {
    if (classNames.includes('in')) {
      setClassNames(`${state.contentAnimation.id}-view-in`)
    } else {
      setClassNames(`${state.contentAnimation.id}-view-out`)
    }
  }, [state])

  return (
    <SwitchTransition mode="out-in">
      <CSSTransition
        key={isOpen ? 'details' : 'card'}
        nodeRef={nodeRef}
        classNames={classNames}
        addEndListener={done => {
          if (nodeRef.current) {
            nodeRef.current.addEventListener('transitionend', done, true)
          }
        }}
        onExited={handleExited}
        onEntered={handleEntered}
        unmountOnExit
      >
        <div ref={nodeRef} className={clsx(styles.container, className)}>
          {children}
        </div>
      </CSSTransition>
    </SwitchTransition>
  )
}
