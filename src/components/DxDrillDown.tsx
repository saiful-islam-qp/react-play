import {ChevronRightIcon} from 'lucide-react'
import React, {useEffect} from 'react'
import {
  CSSTransition,
  SwitchTransition,
  TransitionGroup,
} from 'react-transition-group'

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
  const [open, setOpen] = React.useState(initial)
  const [pendingOpen, setPendingOpen] = React.useState<
    `level-${number}` | null
  >(null)
  const [animationClass, setAnimationClass] =
    React.useState('fade-zoom-view-in')
  const [titles, setTitles] = React.useState<DrilldownTitle[]>(
    baseTitle ? [baseTitle] : [],
  )

  const showHeaderRef = React.useRef(null)
  const hideHeaderRef = React.useRef(null)
  const headerNodeRef = open !== initial ? showHeaderRef : hideHeaderRef
  const headerContainerRef = React.useRef<HTMLDivElement | null>(null)

  const goNext = (id: `level-${number}`, data?: DrilldownTitle) => {
    setAnimationClass(() => 'fade-zoom-view-in')

    if (data) setTitles([...titles, data])
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

  const handleTitleClick = (e: React.MouseEvent<HTMLHeadingElement>) => {
    const id = (e.currentTarget.getAttribute('data-id') ||
      '') as `level-${number}`

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

  const testHandler = () => {
    if (!headerContainerRef.current) return

    const headerElements = headerContainerRef.current.getElementsByTagName('h6')
    console.log([...headerElements])
  }

  return (
    <div className="h-full">
      <div ref={headerContainerRef} className="bg-red-300">
        <SwitchTransition mode="out-in">
          <CSSTransition
            key={
              open !== initial
                ? 'show-drilldown-header'
                : 'hide-drilldown-header'
            }
            nodeRef={headerNodeRef}
            timeout={500}
            classNames="v2-header"
            onEnter={testHandler}
            unmountOnExit
          >
            <div ref={headerNodeRef}>
              {open !== initial && (
                <TransitionGroup className="text-gray-600 text-xs font-medium text-sm h-8 flex items-center flex-nowrap whitespace-nowrap text-nowrap gap-1">
                  {titles.map((title, index) => (
                    <CSSTransition
                      key={title.id}
                      nodeRef={title.nodeRef}
                      timeout={500}
                      classNames="v3-header"
                      onEnter={testHandler}
                      onExited={testHandler}
                      mountOnEnter
                      unmountOnExit
                    >
                      <h6
                        data-id={title.id}
                        onClick={handleTitleClick}
                        className="flex items-center gap-1 cursor-pointer select-none"
                        ref={title.nodeRef}
                      >
                        {index > 0 && <ChevronRightIcon className="w-3 h-3" />}
                        {title.title}{' '}
                      </h6>
                    </CSSTransition>
                  ))}
                </TransitionGroup>
              )}
            </div>
          </CSSTransition>
        </SwitchTransition>
      </div>

      <SwitchTransition mode="out-in">
        <CSSTransition
          key={open}
          nodeRef={items[open].nodeRef}
          timeout={500}
          classNames={animationClass}
          unmountOnExit
        >
          <div
            ref={items[open].nodeRef}
            className="relative"
            style={{height: open !== initial ? 'calc(100% - 32px)' : '100%'}}
          >
            {getContent(items[open])}
          </div>
        </CSSTransition>
      </SwitchTransition>
    </div>
  )
}
