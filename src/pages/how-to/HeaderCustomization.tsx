import {lazy, Suspense} from 'react'
import {NavLink} from 'react-router'
import {ArrowLeft} from 'lucide-react'
import {RightSideBar} from '../../components/sidebar/RightSidebar'

const CodePreviewLazy = lazy(() =>
  import('../../components/code-preview/CodePreview').then(module => ({
    default: module.CodePreview,
  })),
)

const examples = [
  {
    title: 'Minimal — border only',
    description:
      'A clean bottom border with no background. Works well when the drilldown sits inside a card that already has a background.',
    classes: 'wu-border-b wu-px-4',
    previewBg: 'transparent',
    previewBorder: true,
  },
  {
    title: 'Subtle — light gray background',
    description:
      'A very light gray fill. The most common choice — separates the header visually without drawing too much attention.',
    classes: 'wu-bg-gray-50 wu-border-b wu-px-4',
    previewBg: '#f9fafb',
    previewBorder: true,
  },
  {
    title: 'Medium — standard gray',
    description:
      'A slightly stronger gray. Use this when the surrounding container is white and you want a clearer visual separation.',
    classes: 'wu-bg-gray-100 wu-border-b wu-px-4',
    previewBg: '#f3f4f6',
    previewBorder: true,
  },
  {
    title: 'Branded — accent tint',
    description:
      'A blue tint that ties the header to your product colour. Replace blue-50 with any colour token from the wu- palette.',
    classes: 'wu-bg-blue-50 wu-border-b wu-border-blue-100 wu-px-4',
    previewBg: '#eff6ff',
    previewBorder: true,
    previewBorderColor: '#dbeafe',
  },
]

const fullExampleCode = `import {
  WuDrilldown,
  type IWuDrilldownContext,
} from '@npm-questionpro/wick-ui-lib'

<WuDrilldown
  initial="LEVEL_1"
  baseTitle={{ id: 'LEVEL_1', title: 'Overall Sales Data' }}
  headerClasses="wu-bg-gray-100 wu-border-b wu-px-4"
  offsetHeight={42}
  items={{
    LEVEL_1: {
      component: (ctx: IWuDrilldownContext) => <SalesByRegion {...ctx} />,
    },
    LEVEL_2: {
      component: (ctx: IWuDrilldownContext) => <SalesByCategory {...ctx} />,
    },
    LEVEL_3: {
      component: () => <SalesByProduct />,
    },
  }}
/>`

const HeaderCustomization = () => {
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
              Header Customization
            </h1>
            <p
              className="text-lg leading-relaxed"
              style={{color: 'var(--secondary-text-color)'}}
            >
              The <code>headerClasses</code> prop lets you style the navigation
              header that appears after the user drills into a level. Pass any{' '}
              <code>wu-</code> utility classes as a space-separated string.
            </p>
          </div>

          {/* What it controls */}
          <div id="what-it-controls">
            <h2
              className="text-base font-semibold mb-3"
              style={{color: 'var(--primary-text-color)'}}
            >
              What it controls
            </h2>
            <p
              className="text-sm leading-relaxed mb-4"
              style={{color: 'var(--secondary-text-color)'}}
            >
              Once the user navigates past the first level, a header bar appears
              at the top of the drilldown. It holds the back button and the
              breadcrumb labels. <code>headerClasses</code> is the className
              applied to that container — giving you control over its
              background, border, padding, and height.
            </p>
            <div
              className="rounded-lg border overflow-hidden"
              style={{borderColor: 'var(--border-color)'}}
            >
              <div
                className="flex items-center gap-3 px-4"
                style={{
                  height: '48px',
                  backgroundColor: '#f3f4f6',
                  borderBottom: '1px solid #e5e7eb',
                }}
              >
                <div
                  className="flex items-center gap-1 text-xs px-2 py-1 rounded"
                  style={{backgroundColor: '#e5e7eb', color: '#6b7280'}}
                >
                  <ArrowLeft size={11} />
                  <span>Overall Sales Data</span>
                </div>
                <span style={{color: '#d1d5db', fontSize: '10px'}}>›</span>
                <span
                  className="text-xs font-medium"
                  style={{color: '#374151'}}
                >
                  Europe
                </span>
                <span
                  className="ml-auto text-xs"
                  style={{color: '#9ca3af', fontFamily: 'monospace'}}
                >
                  ← headerClasses applied here
                </span>
              </div>
              <div
                className="px-4 py-6 text-center text-xs"
                style={{color: 'var(--secondary-text-color)'}}
              >
                level content
              </div>
            </div>
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
                        headerClasses
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
                          backgroundColor: 'rgba(100,100,100,0.12)',
                          color: 'var(--secondary-text-color)',
                        }}
                      >
                        No
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Examples */}
          <div id="examples">
            <h2
              className="text-base font-semibold mb-4"
              style={{color: 'var(--primary-text-color)'}}
            >
              Examples
            </h2>
            <div className="space-y-6">
              {examples.map(example => (
                <div
                  key={example.title}
                  className="rounded-lg border overflow-hidden"
                  style={{borderColor: 'var(--border-color)'}}
                >
                  <div
                    className="flex items-center gap-3 px-4"
                    style={{
                      height: '44px',
                      backgroundColor: example.previewBg,
                      borderBottom: example.previewBorder
                        ? `1px solid ${example.previewBorderColor ?? '#e5e7eb'}`
                        : undefined,
                    }}
                  >
                    <div
                      className="flex items-center gap-1 text-xs px-2 py-1 rounded"
                      style={{backgroundColor: '#e5e7eb', color: '#6b7280'}}
                    >
                      <ArrowLeft size={11} />
                      <span>Overall Sales Data</span>
                    </div>
                    <span style={{color: '#d1d5db', fontSize: '10px'}}>›</span>
                    <span
                      className="text-xs font-medium"
                      style={{color: '#374151'}}
                    >
                      Europe
                    </span>
                  </div>
                  <div
                    className="px-4 py-4"
                    style={{borderTop: '1px solid var(--border-color)'}}
                  >
                    <p
                      className="text-sm font-semibold mb-1"
                      style={{color: 'var(--primary-text-color)'}}
                    >
                      {example.title}
                    </p>
                    <p
                      className="text-xs leading-relaxed mb-3"
                      style={{color: 'var(--secondary-text-color)'}}
                    >
                      {example.description}
                    </p>
                    <code
                      className="block text-xs font-mono px-3 py-2 rounded"
                      style={{
                        backgroundColor: 'rgba(100,108,255,0.07)',
                        color: 'var(--highlight-color)',
                        border: '1px solid var(--border-color)',
                      }}
                    >
                      {`headerClasses="${example.classes}"`}
                    </code>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Full example */}
          <div id="full-example">
            <h2
              className="text-base font-semibold mb-3"
              style={{color: 'var(--primary-text-color)'}}
            >
              Full example
            </h2>
            <Suspense fallback={<div className="text-sm">Loading…</div>}>
              <CodePreviewLazy code={fullExampleCode} />
            </Suspense>
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
              You've covered all the How to sections.
            </p>
            <NavLink
              to="/"
              className="flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium transition-opacity hover:opacity-80"
              style={{
                backgroundColor: 'var(--highlight-color)',
                color: 'white',
              }}
            >
              Back to home
            </NavLink>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="hidden lg:block lg:col-span-2">
          <RightSideBar
            hashLinks={[
              {href: '#what-it-controls', name: 'What it controls'},
              {href: '#prop-signature', name: 'Prop Signature'},
              {href: '#examples', name: 'Examples'},
              {href: '#full-example', name: 'Full Example'},
            ]}
          />
        </div>
      </div>
    </div>
  )
}

export default HeaderCustomization
