import React from 'react'
import {MoDrilldown, type DrilldownItem} from './MoDrilldown'
import {DonutChart} from '../charts/DonutChart'
import {LineChart} from '../charts/LineChart'
import Chart from '../charts/AmChart'

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
            {/* <EChartColumn
              handler={goNext}
              categories={['Africa', 'America', 'Asia', 'Europe']}
              series={[
                {
                  type: 'bar',
                  name: 'Year 2024',
                  data: [814, 841, 3714, 726],
                },
                {
                  type: 'bar',
                  name: 'Year 2025',
                  data: [1393, 1031, 4695, 745],
                },
              ]}
            /> */}
            <Chart handler={goNext} />
          </div>
        </div>
      ),
    },
    'level-2': {
      component: ({goNext}) => (
        <div className="p-4 h-full bg-white">
          <div className="flex flex-col h-full">
            <h2 className="text-md font-medium mb-4">Country</h2>
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
    'level-4': {
      component: () => (
        <div className="p-4 h-full bg-white flex flex-col">
          <h2 className="text-sm font-medium mb-4">Detailed Sales Data</h2>
          <div className="flex-1 overflow-auto">
            <table className="w-full table-auto border-collapse border border-gray-200">
              <thead>
                <tr>
                  <th className="border border-gray-200 px-4 py-2 text-left">
                    Region
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left">
                    Q1 Sales
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left">
                    Q2 Sales
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left">
                    Q3 Sales
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left">
                    Q4 Sales
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {region: 'Africa', sales: [200, 250, 180, 184]},
                  {region: 'America', sales: [220, 270, 190, 161]},
                  {region: 'Asia', sales: [900, 1100, 850, 864]},
                  {region: 'Europe', sales: [180, 200, 170, 176]},
                ].map(data => (
                  <tr key={data.region}>
                    <td className="border border-gray-200 px-4 py-2">
                      {data.region}
                    </td>
                    {data.sales.map((sale, index) => (
                      <td
                        key={index}
                        className="border border-gray-200 px-4 py-2"
                      >
                        {sale}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ),
    },
  }
  return items
}
