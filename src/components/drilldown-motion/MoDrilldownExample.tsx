import React from 'react'
import {MoDrilldown, type DrilldownItem} from './MoDrilldown'
import {ColumnChart} from '../charts/ColumnChart'
import {DonutChart} from '../charts/DonutChart'
import {LineChart} from '../charts/LineChart'

export const MoDrilldownExample: React.FC = () => {
  return (
    <div className="h-[350px] border rounded-lg bg-white overflow-hidden border-gray-300">
      <MoDrilldown
        items={createItems()}
        initial="level-1"
        baseTitle={{
          id: 'level-1',
          title: 'Overall Sales Data',
        }}
        mode="popLayout"
      />
    </div>
  )
}

const createItems = () => {
  const items: Record<`level-${number}`, DrilldownItem> = {
    'level-1': {
      component: ({goNext}) => (
        <div className="p-4 h-full bg-white flex flex-col">
          <h2 className="text-sm font-medium mb-4">Sales by region</h2>
          <div className="flex-1">
            <ColumnChart
              handler={goNext}
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
        </div>
      ),
    },
    'level-2': {
      component: ({goNext}) => (
        <div className="p-4 h-full bg-white">
          <div className="flex flex-col h-full">
            <div className="flex-1">
              <DonutChart handler={goNext} />
            </div>
          </div>
        </div>
      ),
    },
    'level-3': {
      component: ({goNext}) => (
        <div className="p-4 h-full bg-white relative">
          <div className="flex flex-col h-full">
            <div className="flex-1">
              <LineChart />
            </div>
            <div className="flex items-center justify-end">
              <button
                onClick={() =>
                  goNext('level-4', {
                    id: 'level-4',
                    title: 'Detailed Sales Data',
                  })
                }
              >
                Next
              </button>
            </div>
          </div>
        </div>
      ),
    },
  }
  return items
}
