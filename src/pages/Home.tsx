import {lazy, Suspense} from 'react'
import {MoDrilldownExample} from '../components/drilldown-motion/MoDrilldownExample'
import {RightSideBar} from '../components/sidebar/RightSidebar'
import SimpleLevel from '../components/simple-level/SimpleLevel'
import {
  WuDrilldown,
  type IWuDrilldownContext,
} from '@npm-questionpro/wick-ui-lib'

const CodePreviewLazy = lazy(() =>
  import('../components/code-preview/CodePreview').then(module => ({
    default: module.CodePreview,
  })),
)

const usageCode = `import React from 'react'
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
}`

const whenToUse = [
  'Exploring hierarchical datasets (regions → countries → cities)',
  'Progressive disclosure of details (overview → details → metrics)',
  'Replacing separate modal/page navigation with inline transitions',
  'Mobile-friendly stacked navigation',
]

function Home() {
  return (
    <div
      className="min-h-screen"
      style={{backgroundColor: 'var(--main-bg-color)'}}
    >
      <div className="grid grid-cols-1 lg:grid-cols-8 gap-4 px-4 sm:px-6 lg:px-8 py-16">
        {/* Main content */}
        <div className="lg:col-span-6 space-y-12">
          {/* Page header */}
          <div className="mb-4">
            <h1
              className="text-4xl font-bold mb-4"
              style={{color: 'var(--primary-text-color)'}}
            >
              WuDrilldown
            </h1>
            <p
              className="text-lg leading-relaxed"
              style={{color: 'var(--secondary-text-color)'}}
            >
              A React component for building multi-level interactive drilldowns
              with animated transitions between views.
            </p>
          </div>

          {/* When to use */}
          <div id="overview">
            <h2
              className="text-base font-semibold mb-4"
              style={{color: 'var(--primary-text-color)'}}
            >
              When to use
            </h2>
            <ul className="space-y-px">
              {whenToUse.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 py-3"
                  style={{
                    borderTop:
                      i > 0 ? '1px solid var(--border-color)' : undefined,
                  }}
                >
                  <span
                    className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{backgroundColor: 'var(--highlight-color)'}}
                  />
                  <span
                    className="text-sm leading-relaxed"
                    style={{color: 'var(--secondary-text-color)'}}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Basic example */}
          <div id="basic-example">
            <h2
              className="text-base font-semibold mb-4"
              style={{color: 'var(--primary-text-color)'}}
            >
              Basic example
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <p
                  className="text-xs font-medium mb-2"
                  style={{color: 'var(--secondary-text-color)'}}
                >
                  Drilldown
                </p>
                <MoDrilldownExample />
              </div>
              <div>
                <p
                  className="text-xs font-medium mb-2"
                  style={{color: 'var(--secondary-text-color)'}}
                >
                  Slide effect
                </p>
                <div className="h-[350px] border rounded-lg bg-white overflow-hidden border-gray-300">
                  <WuDrilldown
                    initial="LEVEL_1"
                    baseTitle={{id: 'LEVEL_1', title: 'BASE_TITLE'}}
                    offsetHeight={42}
                    items={{
                      LEVEL_1: {
                        component: (ctx: IWuDrilldownContext) => (
                          <SimpleLevel
                            title="Level 1 title"
                            content="This is level 1"
                            goNext={() =>
                              ctx.goNext(`LEVEL_2`, {
                                id: `LEVEL_2`,
                                title: `Where you clicked in Level 1`,
                              })
                            }
                            showHeader
                            isInitial
                          />
                        ),
                      },
                      LEVEL_2: {
                        component: (ctx: IWuDrilldownContext) => (
                          <SimpleLevel
                            title="Level 2 title"
                            content="This is level 2"
                            goNext={() =>
                              ctx.goNext(`LEVEL_3`, {
                                id: `LEVEL_3`,
                                title: `Where you clicked in level 2`,
                              })
                            }
                            showHeader
                          />
                        ),
                      },
                      LEVEL_3: {
                        component: () => (
                          <SimpleLevel
                            title="Level 3 title"
                            content="This is level 3"
                            isNextDisabled
                            showHeader
                          />
                        ),
                      },
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Usage */}
          <div id="usage">
            <h2
              className="text-base font-semibold mb-4"
              style={{color: 'var(--primary-text-color)'}}
            >
              Usage
            </h2>
            <Suspense fallback={<div className="text-sm">Loading…</div>}>
              <CodePreviewLazy code={usageCode} />
            </Suspense>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="hidden lg:block lg:col-span-2">
          <RightSideBar
            hashLinks={[
              {href: '#overview', name: 'Overview'},
              {href: '#basic-example', name: 'Basic Example'},
              {href: '#usage', name: 'Usage'},
            ]}
          />
        </div>
      </div>
    </div>
  )
}

export default Home
