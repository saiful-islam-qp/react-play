import React from 'react'
import {DxDrilldown, type DrilldownItem} from './DxDrillDown'
import {ColumnChart} from './charts/ColumnChart'
import {DonutChart} from './charts/DonutChart'
import {LineChart} from './charts/LineChart'

const items: Record<`level-${number}`, DrilldownItem> = {
  'level-1': {
    nodeRef: React.createRef<HTMLDivElement>(),
    component: ({goNext}) => (
      <div className="p-4 h-full bg-white">
        <h2 className="text-sm font-medium mb-4">Sales by region</h2>
        <div style={{height: 'calc(100% - 32px)'}}>
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
    nodeRef: React.createRef<HTMLDivElement>(),
    component: ({goNext}) => (
      <div className="p-4 h-full bg-white">
        <DonutChart handler={goNext} />
      </div>
    ),
  },
  'level-3': {
    nodeRef: React.createRef<HTMLDivElement>(),
    component: ({goNext}) => (
      <div className="p-4 h-full bg-white relative">
        <LineChart />
        <button
          className="wu-bg-gray-300 wu-font-medium wu-z-50 wu-border wu-border-gray-300 hover:wu-bg-gray-300 hover:text-black ml-auto text-black absolute right-1 bottom-1 wu-px-4 wu-py-2 wu-rounded"
          onClick={() =>
            goNext('level-4', {
              id: 'level-4',
              title: 'Detailed Sales Data',
              nodeRef: React.createRef<HTMLHeadingElement>(),
            })
          }
        >
          Next
        </button>
      </div>
    ),
  },
  'level-4': {
    nodeRef: React.createRef<HTMLDivElement>(),
    component: (
      <div className="p-4 h-full bg-white">
        <div className="h-full overflow-y-auto">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae
          suscipit error repellat asperiores ipsum, pariatur voluptatum
          voluptates ab nihil quas voluptatem qui sequi libero laboriosam
          dignissimos facere beatae. Quasi veniam quo sed aut odio iste expedita
          at esse. Aliquid, pariatur adipisci. Doloribus illo qui laborum odit
          pariatur, dolor rerum necessitatibus similique iste eius ut veniam
          nisi voluptatum aliquid nam, in iure sed hic officia recusandae? Animi
          aliquam ut praesentium voluptate similique ratione repellendus rem
          quos quisquam suscipit repudiandae illum, maxime voluptates eius
          deleniti blanditiis recusandae placeat nesciunt ipsam reiciendis cum
          voluptatem. Assumenda, eaque ullam quas natus nulla deleniti mollitia
          cupiditate sed tenetur. Id quas, exercitationem asperiores libero
          quidem et quam sed culpa, maiores quo corrupti eos repellat. Fugit
          suscipit facilis cum! Iste nihil natus adipisci ullam, animi quia rem
          fugiat corrupti ut mollitia libero? Dicta saepe aliquid enim odit eum?
        </div>
      </div>
    ),
  },
}

const DrillDownExample: React.FC = () => {
  return (
    <div className="h-[400px] max-w-[700px] border rounded border-gray-300 bg-gray-100">
      <DxDrilldown
        items={items}
        initial="level-1"
        baseTitle={{
          id: 'level-1',
          title: 'Overall Sales Data',
          nodeRef: React.createRef<HTMLHeadingElement>(),
        }}
      />
    </div>
  )
}

export default DrillDownExample
