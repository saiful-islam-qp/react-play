import React from 'react'
import {MoDrilldown, type DrilldownItem} from './MoDrilldown'
import {ColumnChart} from '../charts/ColumnChart'
import {DonutChart} from '../charts/DonutChart'
import {LineChart} from '../charts/LineChart'

export const MoDrilldownExample: React.FC = () => {
  return (
    <div className="h-[350px] border rounded border-gray-300 bg-gray-100">
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
      component: ({goNext, goBack}) => (
        <div className="p-4 h-full bg-white">
          <div className="flex flex-col h-full">
            <button className="self-start" onClick={() => goBack('level-1')}>
              Back
            </button>

            <div className="flex-1">
              <DonutChart handler={goNext} />
            </div>
          </div>
        </div>
      ),
    },
    'level-3': {
      component: ({goNext, goBack}) => (
        <div className="p-4 h-full bg-white relative">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between">
              <button onClick={() => goBack('level-2')}>Back</button>
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
            <div className="flex-1">
              <LineChart />
            </div>
          </div>
        </div>
      ),
    },
    'level-4': {
      component: ({goBack}) => (
        <div className="p-4 h-full bg-white">
          <div className="h-full overflow-y-auto">
            <div className="flex flex-col h-full">
              <button className="self-start" onClick={() => goBack('level-3')}>
                Back
              </button>
              <div className="flex-1">
                <div>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Repudiandae suscipit error repellat asperiores ipsum, pariatur
                  voluptatum voluptates ab nihil quas voluptatem qui sequi
                  libero laboriosam dignissimos facere beatae. Quasi veniam quo
                  sed aut odio iste expedita at esse. Aliquid, pariatur
                  adipisci. Doloribus illo qui laborum odit pariatur, dolor
                  rerum necessitatibus similique iste eius ut veniam nisi
                  voluptatum aliquid nam, in iure sed hic officia recusandae?
                  Animi aliquam ut praesentium voluptate similique ratione
                  repellendus rem quos quisquam suscipit repudiandae illum,
                  maxime voluptates eius deleniti blanditiis recusandae placeat
                  nesciunt ipsam reiciendis cum voluptatem. Assumenda, eaque
                  ullam quas natus nulla deleniti mollitia cupiditate sed
                  tenetur. Id quas, exercitationem asperiores libero quidem et
                  quam sed culpa, maiores quo corrupti eos repellat. Fugit
                  suscipit facilis cum! Iste nihil natus adipisci ullam, animi
                  quia rem fugiat corrupti ut mollitia libero? Dicta saepe
                  aliquid enim odit eum?
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  }
  return items
}
