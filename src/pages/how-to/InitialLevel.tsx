import {lazy, Suspense} from 'react'
import {NavLink} from 'react-router'
import {ArrowRight, AlertTriangle} from 'lucide-react'
import {RightSideBar} from '../../components/sidebar/RightSidebar'

const CodePreviewLazy = lazy(() =>
  import('../../components/code-preview/CodePreview').then(module => ({
    default: module.CodePreview,
  })),
)

const exampleLevel1Code = `<WuDrilldown
  initial="LEVEL_1"
  baseTitle={{ id: 'LEVEL_1', title: 'Overall Sales Data' }}
  items={{
    LEVEL_1: {
      component: ({ goNext }: IWuDrilldownContext) => (
        <RegionChart onBarClick={(label) => goNext('LEVEL_2', label)} />
      ),
    },
    LEVEL_2: {
      component: ({ goNext }: IWuDrilldownContext) => (
        <CategoryChart onSliceClick={(label) => goNext('LEVEL_3', label)} />
      ),
    },
    LEVEL_3: {
      component: () => <ProductTable />,
    },
  }}
/>
// First view: RegionChart`

const exampleLevel2Code = `<WuDrilldown
  initial="LEVEL_2"
  baseTitle={{ id: 'LEVEL_2', title: 'Category Breakdown' }}
  items={{
    LEVEL_1: {
      component: ({ goNext }: IWuDrilldownContext) => (
        <RegionChart onBarClick={(label) => goNext('LEVEL_2', label)} />
      ),
    },
    LEVEL_2: {
      component: ({ goNext }: IWuDrilldownContext) => (
        <CategoryChart onSliceClick={(label) => goNext('LEVEL_3', label)} />
      ),
    },
    LEVEL_3: {
      component: () => <ProductTable />,
    },
  }}
/>
// First view: CategoryChart — no back button since LEVEL_1 was never visited`

const mistakes = [
  {
    title: 'Mismatch with items keys',
    body: 'Setting initial="LEVEL_1" when items has no LEVEL_1 key causes the drilldown to render blank. Every value passed to initial must exist as a key in items.',
    code: `// ✗ LEVEL_1 missing from items — blank render
<WuDrilldown
  initial="LEVEL_1"
  items={{
    LEVEL_2: { component: () => <Detail /> },
    LEVEL_3: { component: () => <Table /> },
  }}
/>`,
  },
  {
    title: 'Wrong casing',
    body: 'The prop is case-sensitive. level_1, Level_1, or LEVEL_01 are all invalid and will silently fail to match.',
    code: `// ✗ Wrong casing
<WuDrilldown initial="level_1" items={{ LEVEL_1: { ... } }} />

// ✓ Correct
<WuDrilldown initial="LEVEL_1" items={{ LEVEL_1: { ... } }} />`,
  },
  {
    title: 'Starting mid-stack without data',
    body: 'When you start at LEVEL_2, the goNext call from LEVEL_1 never fires — so any data you normally pass via goNext (like a selected label) will be undefined. Make sure your mid-entry component can render without that context.',
    code: `// ✗ Risky — CategoryChart expects a region label from LEVEL_1
const CategoryChart = ({ region }: { region: string }) => { ... }

// ✓ Safe — provide a default or make region optional
const CategoryChart = ({ region = 'All Regions' }: { region?: string }) => { ... }`,
  },
]

const InitialLevel = () => {
  return (
    <div
      className="min-h-screen"
      style={{backgroundColor: 'var(--main-bg-color)'}}
    >
      <div className="grid grid-cols-1 lg:grid-cols-8 gap-4 px-4 sm:px-6 lg:px-8 py-16">
        {/* Main content */}
        <div className="lg:col-span-6 space-y-12">
          {/* Header */}
          <div>
            <h1
              className="text-4xl font-bold mb-4"
              style={{color: 'var(--primary-text-color)'}}
            >
              Initial Level
            </h1>
            <p
              className="text-lg leading-relaxed"
              style={{color: 'var(--secondary-text-color)'}}
            >
              The <code>initial</code> prop controls which level is visible when
              the drilldown first mounts. It accepts a string that must match
              one of your <code>items</code> keys and follow the{' '}
              <code>LEVEL_&#123;number&#125;</code> pattern.
            </p>
          </div>

          {/* Prop Signature */}
          <div id="prop-signature">
            <h2
              className="text-base font-semibold mb-4"
              style={{color: 'var(--primary-text-color)'}}
            >
              Prop Signature
            </h2>
            <div
              className="rounded-lg border overflow-hidden mb-4"
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
                    {['Prop', 'Type', 'Required'].map(h => (
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
                  <tr>
                    <td className="px-4 py-3">
                      <code
                        className="px-1.5 py-0.5 rounded text-xs"
                        style={{
                          backgroundColor: 'rgba(100,108,255,0.12)',
                          color: 'var(--highlight-color)',
                        }}
                      >
                        initial
                      </code>
                    </td>
                    <td
                      className="px-4 py-3 font-mono text-xs"
                      style={{color: 'var(--secondary-text-color)'}}
                    >
                      string
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="px-2 py-0.5 rounded text-xs font-medium"
                        style={{
                          backgroundColor: 'rgba(239,68,68,0.12)',
                          color: '#f87171',
                        }}
                      >
                        Yes
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <Suspense fallback={<div className="text-sm">Loading…</div>}>
              <CodePreviewLazy
                code={`<WuDrilldown initial="LEVEL_1" items={...} />`}
              />
            </Suspense>
          </div>

          {/* How It Works */}
          <div id="how-it-works">
            <h2
              className="text-base font-semibold mb-4"
              style={{color: 'var(--primary-text-color)'}}
            >
              How It Works
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {/* Scenario A */}
              <div
                className="p-5 rounded-lg border"
                style={{
                  borderColor: 'var(--border-color)',
                  backgroundColor: 'rgba(100,108,255,0.04)',
                }}
              >
                <p
                  className="text-xs font-semibold uppercase tracking-wider mb-4"
                  style={{color: 'var(--highlight-color)'}}
                >
                  Scenario A — Normal entry
                </p>
                <code
                  className="block text-sm mb-4 font-mono"
                  style={{color: 'var(--primary-text-color)'}}
                >
                  initial="LEVEL_1"
                </code>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {['LEVEL_1', 'LEVEL_2', 'LEVEL_3'].map((lvl, i) => (
                    <div key={lvl} className="flex items-center gap-1.5">
                      <div
                        className="px-3 py-1.5 rounded text-xs font-mono"
                        style={{
                          backgroundColor:
                            i === 0
                              ? 'var(--highlight-color)'
                              : 'rgba(100,108,255,0.1)',
                          color:
                            i === 0 ? 'white' : 'var(--secondary-text-color)',
                          border:
                            i === 0 ? 'none' : '1px solid var(--border-color)',
                        }}
                      >
                        {lvl}
                      </div>
                      {i < 2 && (
                        <ArrowRight
                          size={12}
                          style={{color: 'var(--secondary-text-color)'}}
                        />
                      )}
                    </div>
                  ))}
                </div>
                <p
                  className="text-xs mt-4"
                  style={{color: 'var(--secondary-text-color)'}}
                >
                  Starts at LEVEL_1. Back button is hidden — no history yet.
                </p>
              </div>

              {/* Scenario B */}
              <div
                className="p-5 rounded-lg border"
                style={{
                  borderColor: 'var(--border-color)',
                  backgroundColor: 'rgba(100,108,255,0.04)',
                }}
              >
                <p
                  className="text-xs font-semibold uppercase tracking-wider mb-4"
                  style={{color: 'var(--highlight-color)'}}
                >
                  Scenario B — Mid-entry
                </p>
                <code
                  className="block text-sm mb-4 font-mono"
                  style={{color: 'var(--primary-text-color)'}}
                >
                  initial="LEVEL_2"
                </code>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {['LEVEL_1', 'LEVEL_2', 'LEVEL_3'].map((lvl, i) => (
                    <div key={lvl} className="flex items-center gap-1.5">
                      <div
                        className="px-3 py-1.5 rounded text-xs font-mono"
                        style={{
                          backgroundColor:
                            i === 1
                              ? 'var(--highlight-color)'
                              : 'rgba(100,108,255,0.1)',
                          color:
                            i === 1 ? 'white' : 'var(--secondary-text-color)',
                          border:
                            i === 1 ? 'none' : '1px solid var(--border-color)',
                        }}
                      >
                        {lvl}
                      </div>
                      {i < 2 && (
                        <ArrowRight
                          size={12}
                          style={{color: 'var(--secondary-text-color)'}}
                        />
                      )}
                    </div>
                  ))}
                </div>
                <p
                  className="text-xs mt-4"
                  style={{color: 'var(--secondary-text-color)'}}
                >
                  Starts at LEVEL_2. Back button is hidden — LEVEL_1 was never
                  visited.
                </p>
              </div>
            </div>
          </div>

          {/* Code Examples */}
          <div id="code-examples">
            <h2
              className="text-base font-semibold mb-4"
              style={{color: 'var(--primary-text-color)'}}
            >
              Code Examples
            </h2>
            <p
              className="text-sm mb-4"
              style={{color: 'var(--secondary-text-color)'}}
            >
              The same drilldown — starting at <code>LEVEL_1</code>:
            </p>
            <Suspense fallback={<div className="text-sm">Loading…</div>}>
              <CodePreviewLazy code={exampleLevel1Code} />
            </Suspense>
            <p
              className="text-sm mt-6 mb-4"
              style={{color: 'var(--secondary-text-color)'}}
            >
              Now starting at <code>LEVEL_2</code>:
            </p>
            <Suspense fallback={<div className="text-sm">Loading…</div>}>
              <CodePreviewLazy code={exampleLevel2Code} />
            </Suspense>
          </div>

          {/* Naming Rule */}
          <div id="naming-rule">
            <h2
              className="text-base font-semibold mb-4"
              style={{color: 'var(--primary-text-color)'}}
            >
              The <code>LEVEL_&#123;number&#125;</code> Naming Rule
            </h2>
            <div
              className="p-5 rounded-lg border space-y-3"
              style={{
                borderColor: 'var(--highlight-color)',
                backgroundColor: 'rgba(100,108,255,0.06)',
              }}
            >
              {[
                'Must follow the LEVEL_{number} format — e.g. LEVEL_1, LEVEL_2, LEVEL_3.',
                'The value is case-sensitive. level_1 or Level_1 will not match.',
                'The number must correspond to an existing key in items. LEVEL_5 on a 3-level drilldown renders nothing.',
              ].map((rule, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5"
                    style={{
                      backgroundColor: 'var(--highlight-color)',
                      color: 'white',
                    }}
                  >
                    {i + 1}
                  </div>
                  <p
                    className="text-sm leading-relaxed"
                    style={{color: 'var(--secondary-text-color)'}}
                  >
                    {rule}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Common Mistakes */}
          <div id="common-mistakes">
            <h2
              className="text-base font-semibold mb-4"
              style={{color: 'var(--primary-text-color)'}}
            >
              Common Mistakes
            </h2>
            <div className="space-y-6">
              {mistakes.map(mistake => (
                <div
                  key={mistake.title}
                  className="rounded-lg border overflow-hidden"
                  style={{borderColor: 'var(--border-color)'}}
                >
                  <div
                    className="flex items-center gap-2 px-4 py-3 border-b"
                    style={{
                      borderColor: 'var(--border-color)',
                      backgroundColor: 'rgba(239,68,68,0.06)',
                    }}
                  >
                    <AlertTriangle size={15} color="#f87171" />
                    <p
                      className="text-sm font-semibold"
                      style={{color: '#f87171'}}
                    >
                      {mistake.title}
                    </p>
                  </div>
                  <div className="px-4 py-3">
                    <p
                      className="text-sm mb-4 leading-relaxed"
                      style={{color: 'var(--secondary-text-color)'}}
                    >
                      {mistake.body}
                    </p>
                    <Suspense
                      fallback={<div className="text-sm">Loading…</div>}
                    >
                      <CodePreviewLazy code={mistake.code} />
                    </Suspense>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div
            className="pt-4 border-t flex flex-col sm:flex-row items-center justify-between gap-4"
            style={{borderColor: 'var(--border-color)'}}
          >
            <p
              className="text-sm"
              style={{color: 'var(--secondary-text-color)'}}
            >
              Continue exploring the How to section:
            </p>
            <div className="flex gap-3">
              <NavLink
                to="/docs/base-title"
                className="flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium transition-opacity hover:opacity-80"
                style={{
                  backgroundColor: 'var(--highlight-color)',
                  color: 'white',
                }}
              >
                Base title <ArrowRight size={14} />
              </NavLink>
              <NavLink
                to="/docs/header-customization"
                className="flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium transition-opacity hover:opacity-80"
                style={{
                  border: '1px solid var(--border-color)',
                  color: 'var(--primary-text-color)',
                }}
              >
                Header customization <ArrowRight size={14} />
              </NavLink>
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="hidden lg:block lg:col-span-2">
          <RightSideBar
            hashLinks={[
              {href: '#prop-signature', name: 'Prop Signature'},
              {href: '#how-it-works', name: 'How It Works'},
              {href: '#code-examples', name: 'Code Examples'},
              {href: '#naming-rule', name: 'Naming Rule'},
              {href: '#common-mistakes', name: 'Common Mistakes'},
            ]}
          />
        </div>
      </div>
    </div>
  )
}

export default InitialLevel
