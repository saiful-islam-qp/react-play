import React, {useState, useEffect} from 'react'
import {SwitchTransition, CSSTransition} from 'react-transition-group'
import styles from './Drilldown.module.css'
import {useAnimationState} from '../context/AnimationContext'
import {clsx} from 'clsx'

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen?: boolean
  children?: React.ReactNode
  header?: (ref: React.RefObject<HTMLDivElement | null>) => React.JSX.Element
  contentOffset?: number | string
  contentOffsetFactor?: number
  contentAnimation?:
    | 'wu-fade-zoom'
    | 'wu-scale-left'
    | 'wu-slide-up-down'
    | 'wu-slide-left-right'
    | 'wu-scale-fade'
  headerAnimation?: 'wu-scale-left' | 'wu-slide-up-down' | 'wu-slide-left-right'
  dir?: 'ltr' | 'rtl'
}

export const Drilldown: React.FC<IProps> = ({
  className,
  children,
  isOpen = false,
  contentOffset = 48,
  contentOffsetFactor = 4,
  header,
  dir = 'ltr',
}) => {
  const {state} = useAnimationState()
  const [classNames, setClassNames] = useState(`v2-view-in`)
  const [headerClasses, setHeaderClasses] = useState(`v2-header-in`)
  const nodeRef = React.useRef<HTMLDivElement>(null)
  const headerRef = React.useRef<HTMLDivElement>(null)
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
        setHeaderClasses(`${state.headerAnimation.id}-header-in`)
      } else {
        setClassNames(`${state.contentAnimation.id}-view-out`)
        setHeaderClasses(`${state.headerAnimation.id}-header-out`)
      }

      setExited(false)
      setEntered(false)
    }
  }, [exited, entered, state])

  useEffect(() => {
    if (classNames.includes('in')) {
      setClassNames(`${state.contentAnimation.id}-view-in`)
      setHeaderClasses(`${state.headerAnimation.id}-header-in`)
    } else {
      setClassNames(`${state.contentAnimation.id}-view-out`)
      setHeaderClasses(`${state.headerAnimation.id}-header-out`)
    }
  }, [state])

  return (
    <div className={styles.main}>
      <SwitchTransition mode="out-in">
        <CSSTransition
          key={isOpen ? 'header-visible' : 'header-hidden'}
          nodeRef={headerRef}
          addEndListener={done => {
            if (nodeRef.current) {
              nodeRef.current.addEventListener('transitionend', done, true)
            }
          }}
          classNames={headerClasses}
          unmountOnExit
        >
          {header ? header(headerRef) : null}
        </CSSTransition>
      </SwitchTransition>
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
          <div
            ref={nodeRef}
            className={clsx(styles.container, className)}
            style={{
              padding: isOpen
                ? getOffsetValue(contentOffset, contentOffsetFactor, dir)
                : '0px',
            }}
          >
            {children}
          </div>
        </CSSTransition>
      </SwitchTransition>
    </div>
  )
}

function getOffsetValue(
  offset: number | string,
  factor: number,
  dir: 'ltr' | 'rtl',
): string {
  if (typeof offset === 'number') {
    if (dir === 'rtl') {
      return `${offset}px ${offset / 2}px ${offset / factor}px ${offset / factor}px`
    }
    return `${offset}px ${offset / factor}px ${offset / factor}px ${offset / 2}px`
  }
  return offset
}
