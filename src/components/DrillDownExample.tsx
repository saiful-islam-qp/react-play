import React from 'react'
import {DxDrilldown, type DrilldownItem} from './DxDrillDown'

const items: Record<`level-${number}`, DrilldownItem> = {
  'level-1': {
    nodeRef: React.createRef<HTMLDivElement>(),
    component: ({goNext}) => (
      <div className="p-4 bg-blue-300 rounded-lg h-full">
        <div className="mb-4">Level 1 Content</div>
        <button
          className="px-4 py-2 bg-white rounded-lg"
          onClick={e => {
            e.stopPropagation()
            goNext('level-2')
          }}
        >
          Go Next
        </button>
      </div>
    ),
  },
  'level-2': {
    nodeRef: React.createRef<HTMLDivElement>(),
    component: ({goBack, goNext}) => (
      <div className="p-4 bg-blue-300 rounded-lg h-full">
        <div className="mb-4">Level 2 Content</div>
        <button
          className="mr-2 px-4 py-2 bg-white rounded-lg"
          onClick={e => {
            e.stopPropagation()
            goBack('level-1')
          }}
        >
          Go Back
        </button>
        <button
          className="px-4 py-2 bg-white rounded-lg"
          onClick={e => {
            e.stopPropagation()
            goNext('level-3')
          }}
        >
          Go Next
        </button>
      </div>
    ),
  },
  'level-3': {
    nodeRef: React.createRef<HTMLDivElement>(),
    component: ({goBack}) => (
      <div className="p-4 bg-blue-300 rounded-lg h-full">
        <div className="mb-4">Level 3 Content</div>
        <button
          className="mr-2 px-4 py-2 bg-white rounded-lg"
          onClick={e => {
            e.stopPropagation()
            goBack('level-2')
          }}
        >
          Go Back
        </button>
      </div>
    ),
  },
}

const DrillDownExample: React.FC = () => {
  return (
    <div className="h-[400px] p-2 border border-gray-200 rounded-xl bg-gray-500/10">
      <DxDrilldown items={items} initial="level-1" />
    </div>
  )
}

export default DrillDownExample
