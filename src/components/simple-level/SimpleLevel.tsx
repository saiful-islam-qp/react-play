import {WuButton} from '@npm-questionpro/wick-ui-lib'
import React from 'react'

interface Props {
  title: string
  content: string
  goNext?: () => void
  isNextDisabled?: boolean
  showHeader?: boolean
}

const SimpleLevel: React.FC<Props> = ({
  title,
  content,
  goNext,
  isNextDisabled = false,
  showHeader = false,
}) => {
  return (
    <div className="w-full h-full flex flex-col">
      {showHeader && (
        <h2 className="px-4 h-12 flex items-center text-base">{title}</h2>
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
