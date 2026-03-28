import {lazy, Suspense} from 'react'
import {MoDrilldownExample} from '../components/drilldown-motion/MoDrilldownExample'
import {ExamplePost} from '../components/example-post/ExamplePost'
import {RightSideBar} from '../components/sidebar/RightSidebar'

const CodePreviewLazy = lazy(() =>
  import('../components/code-preview/CodePreview').then(module => ({
    default: module.CodePreview,
  })),
)

function Home() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-8 gap-4 px-4">
      <div className="col-span-6 p-4">
        <div id="overview">
          <h2 className="text-lg font-bold">When To Use</h2>
          <ul className="mb-4 list-disc list-inside">
            <li>
              Exploring hierarchical datasets (regions → countries → cities)
            </li>
            <li>
              Progressive disclosure of details (overview → details → metrics)
            </li>
            <li>
              Replacing separate modal/page navigation with inline transitions
            </li>
            <li>Mobile-friendly stacked navigation</li>
          </ul>
        </div>
        <div id="basic-example">
          <h2 className="text-lg font-bold mb-2">Basic Example</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <h2 className="text-sm font-medium mb-1">Drilldown</h2>
              <MoDrilldownExample />
            </div>
            <div>
              <h2 className="text-sm font-medium mb-1">Slide Effect</h2>
              <ExamplePost />
            </div>
          </div>
        </div>
        <div>
          <Suspense fallback={<div className="text-sm">Loading...</div>}>
            <h2 className="text-lg font-bold mt-8 mb-2" id="usage">
              Usages
            </h2>
            <CodePreviewLazy
              code={`import React from 'react'
import EDonutChart from '../charts/EDonutChart'
import EChartColumn from '../charts/EChartColumn'
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
        headerClasses="wu-bg-gray-50 wu-border-b wu-px-4 wu-h-12 wu-flex wu-items-center"
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
`}
            />
          </Suspense>
        </div>
      </div>
      <div className="hidden lg:block lg:col-span-2">
        <RightSideBar
          hashLinks={[
            {
              href: '#overview',
              name: 'Overview',
            },
            {
              href: '#basic-example',
              name: 'Basic Example',
            },
            {
              href: '#usage',
              name: 'Usage',
            },
          ]}
        />
      </div>
    </div>
  )
}

export default Home
