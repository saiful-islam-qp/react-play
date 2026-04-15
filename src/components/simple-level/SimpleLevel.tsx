import {WuButton} from '@npm-questionpro/wick-ui-lib'
import clsx from 'clsx'
import React from 'react'

interface Props {
  title: string
  content: string
  goNext?: () => void
  isNextDisabled?: boolean
  isInitial?: boolean
  showHeader?: boolean
}

const SimpleLevel: React.FC<Props> = ({
  title,
  content,
  goNext,
  isNextDisabled = false,
  showHeader = false,
  isInitial = false,
}) => {
  return (
    <div className="w-full bg-white h-full flex flex-col">
      {showHeader && (
        <h2
          className={clsx(
            'px-4 h-12 flex items-center text-base',
            !isInitial && 'border-t',
          )}
        >
          {title}
        </h2>
      )}
      <div className="flex-1 p-4 bg-blue-50 flex flex-col gap-4 items-center justify-center text-4xl font-bold">
        <p>{content}</p>
        <WuButton onClick={goNext} disabled={isNextDisabled}>
          Go next
        </WuButton>
      </div>
    </div>
  )
}

export default SimpleLevel
