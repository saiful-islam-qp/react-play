import React from 'react'
import {DxDrilldown, type DrilldownItem} from './DxDrillDown'
import {ColumnChart} from './charts/ColumnChart'
import {DonutChart} from './charts/DonutChart'
import {LineChart} from './charts/LineChart'

const items: Record<`level-${number}`, DrilldownItem> = {
  'level-1': {
    nodeRef: React.createRef<HTMLDivElement>(),
    component: ({goNext}) => (
      <div className="p-4 rounded-lg h-full bg-white">
        <ColumnChart
          handler={() => goNext('level-2')}
          categories={['Africa', 'America', 'Asia', 'Europe']}
          series={[
            {
              type: 'column',
              name: 'Year 2023',
              data: [632, 727, 3202, 721],
            },
            {
              type: 'column',
              name: 'Year 2024',
              data: [814, 841, 3714, 726],
            },
            {
              type: 'column',
              name: 'Year 2025',
              data: [1393, 1031, 4695, 745],
            },
          ]}
        />
      </div>
    ),
  },
  'level-2': {
    nodeRef: React.createRef<HTMLDivElement>(),
    component: ({goNext}) => (
      <div className="p-4 rounded-lg h-full bg-white">
        <DonutChart handler={() => goNext('level-3')} />
      </div>
    ),
  },
  'level-3': {
    nodeRef: React.createRef<HTMLDivElement>(),
    component: (
      <div className="p-4 rounded-lg h-full bg-white">
        <LineChart />
      </div>
    ),
  },
}

const DrillDownExample: React.FC = () => {
  return (
    <div className="h-[390px] p-2 border border-gray-200 rounded-xl bg-gray-100">
      <DxDrilldown items={items} initial="level-1" />
    </div>
  )
}

export default DrillDownExample
