import React from 'react'
import EChartColumn from '../charts/EChartColumn'
import EDonutChart from '../charts/EDonutChart'
import {
  WuDrilldown,
  type IWuDrilldownContext,
} from '@npm-questionpro/wick-ui-lib'

export const MoDrilldownExample: React.FC = () => {
  return (
    <div className="h-[350px] border rounded-lg bg-white overflow-hidden border-gray-300">
      <WuDrilldown
        initial="LEVEL_1"
        baseTitle={{id: 'LEVEL_1', title: 'Overall Sales Data'}}
        // headerClasses="wu-bg-gray-50 wu-border-b wu-px-4 wu-h-12 wu-flex wu-items-center"
        offsetHeight={42}
        items={{
          LEVEL_1: {
            component: (ctx: IWuDrilldownContext) => <SalesByRegion {...ctx} />,
          },
          LEVEL_2: {
            component: (ctx: IWuDrilldownContext) => (
              <SalesByCategory {...ctx} />
            ),
          },
          LEVEL_3: {
            component: () => <SalesByProduct />,
          },
        }}
      />
    </div>
  )
}

export const SalesByRegion = ({
  goNext,
  layout,
}: IWuDrilldownContext & {layout?: 'vertical' | 'horizontal'}) => {
  return (
    <div className="h-full bg-white flex flex-col">
      <h2 className="text-sm font-medium bg-gray-50 border-b px-4 py-3 flex items-center">
        Sales by region
      </h2>
      <div className="flex-1 p-4">
        <EChartColumn
          layout={layout ? layout : 'vertical'}
          handler={goNext}
          categories={['Africa', 'Middle East', 'USA', 'Europe']}
          series={[
            {
              type: 'bar',
              name: 'Year 2024',
              data: [814, 841, 3714, 1726],
            },
            {
              type: 'bar',
              name: 'Year 2025',
              data: [1393, 1031, 4695, 2245],
            },
          ]}
        />
      </div>
    </div>
  )
}

export const SalesByCategory = ({goNext}: IWuDrilldownContext) => {
  return (
    <div className="p-4 h-full bg-white">
      <div className="flex flex-col h-full">
        <div className="flex-1">
          <EDonutChart handler={goNext} />
        </div>
      </div>
    </div>
  )
}

export const SalesByProduct = () => {
  return (
    <div className="p-4 h-full bg-white flex flex-col">
      <div className="flex-1 overflow-auto">
        <table className="w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-200 px-4 py-2 text-left">
                Product
              </th>
              <th className="border border-gray-200 px-4 py-2 text-left">Q1</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Q2</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Q3</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Q4</th>
            </tr>
          </thead>
          <tbody>
            {[
              {product: 'Audience', sales: [200, 250, 180, 184]},
              {product: 'Customer Experience', sales: [220, 270, 190, 161]},
              {product: 'CLF 3.0', sales: [180, 200, 170, 176]},
              {product: 'Survey', sales: [900, 1100, 850, 864]},
            ].map(data => (
              <tr key={data.product}>
                <td className="border border-gray-200 px-4 py-2 font-medium">
                  {data.product}
                </td>
                {data.sales.map((sale, index) => (
                  <td
                    key={index}
                    className="border border-gray-200 px-4 py-2 tracking-wide"
                  >
                    ${sale}k
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
