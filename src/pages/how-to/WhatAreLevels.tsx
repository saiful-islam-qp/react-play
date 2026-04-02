import {lazy, Suspense} from 'react'
import {NavLink} from 'react-router'
import {ArrowRight} from 'lucide-react'

const CodePreviewLazy = lazy(() =>
  import('../../components/code-preview/CodePreview').then(module => ({
    default: module.CodePreview,
  })),
)

const contextRows = [
  {
    prop: 'goNext',
    type: '(levelId: string, title: string) => void',
    purpose: 'Navigate forward to a named level',
  },
  {
    prop: 'goBack',
    type: '() => void',
    purpose: 'Return to the previous level',
  },
  {
    prop: 'currentLevel',
    type: 'string',
    purpose: 'The key of the currently active level',
  },
]

const rules = [
  {
    heading: 'Keys are arbitrary strings',
    body: 'LEVEL_1, LEVEL_2, … is a convention. You can use any string: "overview", "region", "product".',
  },
  {
    heading: 'initial must match a key in items',
    body: 'If initial="LEVEL_1" but items has no LEVEL_1 key, the drilldown renders nothing.',
  },
  {
    heading: 'Components are factory functions',
    body: 'Each value is (ctx) => <Component /> — not a JSX element. This lets WuDrilldown inject the context on every render.',
  },
  {
    heading: 'Last level can omit goNext',
    body: 'The deepest level has nowhere to go. Simply do not call goNext and no further navigation is possible.',
  },
]

const itemsCode = `<WuDrilldown
  initial="LEVEL_1"
  baseTitle={{ id: 'LEVEL_1', title: 'Overall Sales Data' }}
  items={{
    LEVEL_1: {
      component: (ctx: IWuDrilldownContext) => <Overview {...ctx} />,
    },
    LEVEL_2: {
      component: (ctx: IWuDrilldownContext) => <Detail {...ctx} />,
    },
    LEVEL_3: {
      // deepest level — no goNext needed
      component: () => <Table />,
    },
  }}
/>`

const realExampleCode = `import { WuDrilldown, type IWuDrilldownContext } from '@npm-questionpro/wick-ui-lib'

export const SalesDrilldown = () => (
  <div className="h-[350px] border rounded-lg overflow-hidden">
    <WuDrilldown
      initial="LEVEL_1"
      baseTitle={{ id: 'LEVEL_1', title: 'Overall Sales Data' }}
      offsetHeight={42}
      items={{
        LEVEL_1: {
          component: ({ goNext }: IWuDrilldownContext) => (
            <ColumnChart
              onBarClick={(label) => goNext('LEVEL_2', label)}
            />
          ),
        },
        LEVEL_2: {
          component: ({ goNext }: IWuDrilldownContext) => (
            <DonutChart
              onSliceClick={(label) => goNext('LEVEL_3', label)}
            />
          ),
        },
        LEVEL_3: {
          component: () => <ProductTable />,
        },
      }}
    />
  </div>
)`

const WhatAreLevels = () => {
  return (
    <div
      className="min-h-screen py-16 px-4 sm:px-6 lg:px-8"
      style={{backgroundColor: 'var(--main-bg-color)'}}
    >
      <div className="max-w-4xl mx-auto">
        {/* ── Header ── */}
        <div className="mb-16">
          <h1
            className="text-4xl font-bold mb-4"
            style={{color: 'var(--primary-text-color)'}}
          >
            What are Levels?
          </h1>
          <p
            className="text-lg leading-relaxed"
            style={{color: 'var(--secondary-text-color)'}}
          >
            Levels are the named view-slots that make up a drilldown. Each level
            maps a string key to a React component. When a user clicks into
            data, the drilldown transitions to the next level — and the header
            back button returns them to the previous one.
          </p>
        </div>

        {/* ── Mental Model ── */}
        <div className="mb-16">
          <h2
            className="text-2xl font-semibold mb-6"
            style={{color: 'var(--primary-text-color)'}}
          >
            Mental Model
          </h2>

          <div
            className="p-6 rounded-lg border"
            style={{
              backgroundColor: 'rgba(100, 108, 255, 0.05)',
              borderColor: 'var(--border-color)',
            }}
          >
            {/* Flow diagram */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              {[
                {key: 'LEVEL_1', label: 'Overview'},
                {key: 'LEVEL_2', label: 'Category'},
                {key: 'LEVEL_3', label: 'Row Detail'},
              ].map((level, i, arr) => (
                <div key={level.key} className="flex items-center gap-2">
                  <div
                    className="rounded-lg px-4 py-3 text-center min-w-[110px]"
                    style={{
                      backgroundColor: 'var(--main-bg-color)',
                      border: '1px solid var(--highlight-color)',
                    }}
                  >
                    <div
                      className="text-xs font-mono mb-1"
                      style={{color: 'var(--highlight-color)'}}
                    >
                      {level.key}
                    </div>
                    <div
                      className="text-sm font-medium"
                      style={{color: 'var(--primary-text-color)'}}
                    >
                      {level.label}
                    </div>
                  </div>
                  {i < arr.length - 1 && (
                    <div
                      className="flex flex-col items-center gap-0.5"
                      style={{color: 'var(--secondary-text-color)'}}
                    >
                      <ArrowRight size={18} />
                      <span className="text-xs font-mono">goNext</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <p
              className="text-sm"
              style={{color: 'var(--secondary-text-color)'}}
            >
              Clicking a data point calls{' '}
              <code
                className="px-1 py-0.5 rounded text-xs"
                style={{
                  backgroundColor: 'rgba(100,108,255,0.15)',
                  color: 'var(--highlight-color)',
                }}
              >
                goNext('LEVEL_2', title)
              </code>
              . The header back button calls{' '}
              <code
                className="px-1 py-0.5 rounded text-xs"
                style={{
                  backgroundColor: 'rgba(100,108,255,0.15)',
                  color: 'var(--highlight-color)',
                }}
              >
                goBack()
              </code>
              .
            </p>
          </div>
        </div>

        {/* ── The items prop ── */}
        <div className="mb-16">
          <h2
            className="text-2xl font-semibold mb-2"
            style={{color: 'var(--primary-text-color)'}}
          >
            The <code className="text-xl">items</code> Prop
          </h2>
          <p
            className="mb-6 text-sm"
            style={{color: 'var(--secondary-text-color)'}}
          >
            Pass a plain object to <code>items</code> where each key is a level
            ID and each value has a <code>component</code> factory.
          </p>
          <Suspense fallback={<div className="text-sm">Loading…</div>}>
            <CodePreviewLazy code={itemsCode} />
          </Suspense>
        </div>

        {/* ── Context Object ── */}
        <div className="mb-16">
          <h2
            className="text-2xl font-semibold mb-2"
            style={{color: 'var(--primary-text-color)'}}
          >
            The Context Object
          </h2>
          <p
            className="mb-6 text-sm"
            style={{color: 'var(--secondary-text-color)'}}
          >
            Every component factory receives <code>IWuDrilldownContext</code> as
            its argument.
          </p>

          <div
            className="rounded-lg border overflow-hidden"
            style={{borderColor: 'var(--border-color)'}}
          >
            <table className="w-full text-sm">
              <thead>
                <tr
                  style={{
                    backgroundColor: 'rgba(100,108,255,0.08)',
                    borderBottom: '1px solid var(--border-color)',
                  }}
                >
                  {['Property', 'Type', 'Purpose'].map(h => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left font-semibold"
                      style={{color: 'var(--primary-text-color)'}}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {contextRows.map((row, i) => (
                  <tr
                    key={row.prop}
                    style={{
                      borderTop:
                        i > 0 ? '1px solid var(--border-color)' : undefined,
                    }}
                  >
                    <td className="px-4 py-3">
                      <code
                        className="px-1.5 py-0.5 rounded text-xs"
                        style={{
                          backgroundColor: 'rgba(100,108,255,0.12)',
                          color: 'var(--highlight-color)',
                        }}
                      >
                        {row.prop}
                      </code>
                    </td>
                    <td
                      className="px-4 py-3 font-mono text-xs"
                      style={{color: 'var(--secondary-text-color)'}}
                    >
                      {row.type}
                    </td>
                    <td
                      className="px-4 py-3"
                      style={{color: 'var(--secondary-text-color)'}}
                    >
                      {row.purpose}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Real Example ── */}
        <div className="mb-16">
          <h2
            className="text-2xl font-semibold mb-2"
            style={{color: 'var(--primary-text-color)'}}
          >
            Real Example
          </h2>
          <p
            className="mb-6 text-sm"
            style={{color: 'var(--secondary-text-color)'}}
          >
            A 3-level sales drilldown: region overview → category breakdown →
            product table.
          </p>
          <Suspense fallback={<div className="text-sm">Loading…</div>}>
            <CodePreviewLazy code={realExampleCode} />
          </Suspense>
        </div>

        {/* ── Key Rules ── */}
        <div className="mb-16">
          <h2
            className="text-2xl font-semibold mb-6"
            style={{color: 'var(--primary-text-color)'}}
          >
            Key Rules
          </h2>
          <div className="space-y-3">
            {rules.map(rule => (
              <div
                key={rule.heading}
                className="flex gap-4 p-4 rounded-lg border"
                style={{
                  borderColor: 'var(--border-color)',
                  backgroundColor: 'rgba(100,108,255,0.04)',
                }}
              >
                <div
                  className="mt-0.5 w-2 h-2 rounded-full flex-shrink-0"
                  style={{
                    backgroundColor: 'var(--highlight-color)',
                    marginTop: '6px',
                  }}
                />
                <div>
                  <p
                    className="font-semibold text-sm mb-1"
                    style={{color: 'var(--primary-text-color)'}}
                  >
                    {rule.heading}
                  </p>
                  <p
                    className="text-sm leading-relaxed"
                    style={{color: 'var(--secondary-text-color)'}}
                  >
                    {rule.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Footer / Next Steps ── */}
        <div
          className="pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{borderColor: 'var(--border-color)'}}
        >
          <p className="text-sm" style={{color: 'var(--secondary-text-color)'}}>
            Continue exploring the How to section:
          </p>
          <div className="flex gap-3">
            <NavLink
              to="/docs/initial-level"
              className="flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium transition-opacity hover:opacity-80"
              style={{
                backgroundColor: 'var(--highlight-color)',
                color: 'white',
              }}
            >
              Initial level <ArrowRight size={14} />
            </NavLink>
            <NavLink
              to="/docs/base-title"
              className="flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium transition-opacity hover:opacity-80"
              style={{
                border: '1px solid var(--border-color)',
                color: 'var(--primary-text-color)',
              }}
            >
              Base title <ArrowRight size={14} />
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WhatAreLevels
