import {lazy, Suspense} from 'react'
import {NavLink} from 'react-router'
import {ArrowRight, AlertTriangle} from 'lucide-react'
import {RightSideBar} from '../../components/sidebar/RightSidebar'

const CodePreviewLazy = lazy(() =>
  import('../../components/code-preview/CodePreview').then(module => ({
    default: module.CodePreview,
  })),
)

const usageCode = `import {
  WuDrilldown,
  type IWuDrilldownContext,
} from '@npm-questionpro/wick-ui-lib'

<WuDrilldown
  initial="LEVEL_1"
  baseTitle={{ id: 'LEVEL_1', title: 'Overall Sales Data' }}
  //                                   ↑ this label appears in deeper levels
  //                                     as the back-navigation reference
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
/>`

const mistakeCode = `// ✗ id does not match initial — navigation reference breaks
<WuDrilldown
  initial="LEVEL_1"
  baseTitle={{ id: 'LEVEL_2', title: 'Overall Sales Data' }}
  items={{ ... }}
/>

// ✓ id and initial must point to the same level
<WuDrilldown
  initial="LEVEL_1"
  baseTitle={{ id: 'LEVEL_1', title: 'Overall Sales Data' }}
  items={{ ... }}
/>`

const BaseTitle = () => {
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
              Base Title
            </h1>
            <p
              className="text-lg leading-relaxed"
              style={{color: 'var(--secondary-text-color)'}}
            >
              <code>baseTitle</code> defines the root reference point for your
              drilldown's navigation. It tells the component what to call "home"
              when users navigate deeper.
            </p>
          </div>

          {/* Prop signature */}
          <div id="prop-signature">
            <h2
              className="text-base font-semibold mb-3"
              style={{color: 'var(--primary-text-color)'}}
            >
              Prop signature
            </h2>
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
                    {['Key', 'Type', 'Description'].map(h => (
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
                  {[
                    {
                      key: 'id',
                      type: 'string',
                      description:
                        'Must match initial — identifies the root level',
                    },
                    {
                      key: 'title',
                      type: 'string',
                      description:
                        'The label shown in deeper levels as the back-navigation reference',
                    },
                  ].map((row, i) => (
                    <tr
                      key={row.key}
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
                          {row.key}
                        </code>
                      </td>
                      <td
                        className="px-4 py-3 font-mono text-xs"
                        style={{color: 'var(--secondary-text-color)'}}
                      >
                        {row.type}
                      </td>
                      <td
                        className="px-4 py-3 text-sm"
                        style={{color: 'var(--secondary-text-color)'}}
                      >
                        {row.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Relationship */}
          <div id="relationship">
            <h2
              className="text-base font-semibold mb-3"
              style={{color: 'var(--primary-text-color)'}}
            >
              How <code>initial</code> and <code>baseTitle.id</code> relate
            </h2>
            <p
              className="text-sm mb-4 leading-relaxed"
              style={{color: 'var(--secondary-text-color)'}}
            >
              They both point to the same level but serve different purposes.{' '}
              <code>initial</code> owns the view — it decides which component
              renders first. <code>baseTitle.id</code> owns the title — it
              anchors the navigation reference to that same level. Both must be
              the same string.
            </p>
            <div
              className="rounded-lg border"
              style={{borderColor: 'var(--border-color)'}}
            >
              {[
                {
                  prop: 'initial="LEVEL_1"',
                  role: 'Controls which view renders first',
                },
                {
                  prop: 'baseTitle={{ id: "LEVEL_1" }}',
                  role: 'Controls the navigation title for that view',
                },
              ].map((row, i) => (
                <div
                  key={row.prop}
                  className="flex items-center gap-4 px-4 py-3"
                  style={{
                    borderTop:
                      i > 0 ? '1px solid var(--border-color)' : undefined,
                  }}
                >
                  <code
                    className="text-xs font-mono flex-shrink-0 w-56"
                    style={{color: 'var(--highlight-color)'}}
                  >
                    {row.prop}
                  </code>
                  <span
                    className="text-sm"
                    style={{color: 'var(--secondary-text-color)'}}
                  >
                    {row.role}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Where title appears */}
          <div id="where-title-appears">
            <h2
              className="text-base font-semibold mb-3"
              style={{color: 'var(--primary-text-color)'}}
            >
              Where the title appears
            </h2>
            <p
              className="text-sm mb-6 leading-relaxed"
              style={{color: 'var(--secondary-text-color)'}}
            >
              The <code>title</code> value does not appear at the base level
              itself. It surfaces once you navigate away — as the
              back-navigation label in the header and as the root anchor in the
              breadcrumb dropdown.
            </p>
            <div className="space-y-px">
              {[
                {
                  level: 'At LEVEL_1 (base)',
                  description:
                    'The base component is rendered. No back label yet — the user has not navigated anywhere.',
                  active: false,
                },
                {
                  level: 'Navigate to LEVEL_2',
                  description:
                    '"Overall Sales Data" (the baseTitle.title) appears as the back-navigation label in the header back button and the breadcrumb dropdown.',
                  active: true,
                },
                {
                  level: 'Navigate to LEVEL_3',
                  description:
                    '"Overall Sales Data" remains the root anchor throughout the chain — it is always the label that leads back to the beginning.',
                  active: true,
                },
              ].map((step, i) => (
                <div
                  key={step.level}
                  className="flex gap-5 py-5"
                  style={{
                    borderTop:
                      i > 0 ? '1px solid var(--border-color)' : undefined,
                  }}
                >
                  <div className="flex flex-col items-center gap-1 flex-shrink-0">
                    <div
                      className="w-2 h-2 rounded-full mt-1.5"
                      style={{
                        backgroundColor: step.active
                          ? 'var(--highlight-color)'
                          : 'var(--border-color)',
                      }}
                    />
                    {i < 2 && (
                      <div
                        className="w-px flex-1"
                        style={{backgroundColor: 'var(--border-color)'}}
                      />
                    )}
                  </div>
                  <div className="pb-2">
                    <p
                      className="text-sm font-semibold mb-1"
                      style={{color: 'var(--primary-text-color)'}}
                    >
                      {step.level}
                    </p>
                    <p
                      className="text-sm leading-relaxed"
                      style={{color: 'var(--secondary-text-color)'}}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Customizing */}
          <div id="customizing">
            <h2
              className="text-base font-semibold mb-3"
              style={{color: 'var(--primary-text-color)'}}
            >
              Customizing the title
            </h2>
            <div
              className="p-5 rounded-lg border"
              style={{
                borderColor: 'var(--border-color)',
                backgroundColor: 'rgba(100,108,255,0.04)',
              }}
            >
              <p
                className="text-sm leading-relaxed mb-4"
                style={{color: 'var(--secondary-text-color)'}}
              >
                The component has no knowledge of your data, so{' '}
                <code>title</code> is left entirely to you. Set it to whatever
                "home" means in your context.
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  '"Q4 Results"',
                  '"All Regions"',
                  '"Survey: NPS 2025"',
                  '"Overall Sales Data"',
                  '"Product Overview"',
                ].map(example => (
                  <code
                    key={example}
                    className="px-2 py-1 rounded text-xs"
                    style={{
                      backgroundColor: 'rgba(100,108,255,0.12)',
                      color: 'var(--highlight-color)',
                    }}
                  >
                    {example}
                  </code>
                ))}
              </div>
            </div>
          </div>

          {/* Code example */}
          <div id="code-example">
            <h2
              className="text-base font-semibold mb-3"
              style={{color: 'var(--primary-text-color)'}}
            >
              Code example
            </h2>
            <Suspense fallback={<div className="text-sm">Loading…</div>}>
              <CodePreviewLazy code={usageCode} />
            </Suspense>
          </div>

          {/* Common mistake */}
          <div id="common-mistake">
            <h2
              className="text-base font-semibold mb-3"
              style={{color: 'var(--primary-text-color)'}}
            >
              Common mistake
            </h2>
            <div
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
                <p className="text-sm font-semibold" style={{color: '#f87171'}}>
                  id does not match initial
                </p>
              </div>
              <div className="px-4 py-4">
                <p
                  className="text-sm mb-4 leading-relaxed"
                  style={{color: 'var(--secondary-text-color)'}}
                >
                  When <code>baseTitle.id</code> and <code>initial</code> point
                  to different levels the navigation reference breaks — the back
                  label is lost and the breadcrumb has no root to anchor to.
                </p>
                <Suspense fallback={<div className="text-sm">Loading…</div>}>
                  <CodePreviewLazy code={mistakeCode} />
                </Suspense>
              </div>
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
            <NavLink
              to="/docs/header-customization"
              className="flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium transition-opacity hover:opacity-80"
              style={{
                backgroundColor: 'var(--highlight-color)',
                color: 'white',
              }}
            >
              Header customization <ArrowRight size={14} />
            </NavLink>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="hidden lg:block lg:col-span-2">
          <RightSideBar
            hashLinks={[
              {href: '#prop-signature', name: 'Prop Signature'},
              {href: '#relationship', name: 'initial vs baseTitle.id'},
              {href: '#where-title-appears', name: 'Where it appears'},
              {href: '#customizing', name: 'Customizing'},
              {href: '#code-example', name: 'Code Example'},
              {href: '#common-mistake', name: 'Common Mistake'},
            ]}
          />
        </div>
      </div>
    </div>
  )
}

export default BaseTitle
