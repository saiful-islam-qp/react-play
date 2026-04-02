import {lazy, Suspense, useState} from 'react'
import {Check, Copy} from 'lucide-react'
import {NavLink} from 'react-router'

const CodePreviewLazy = lazy(() =>
  import('../../components/code-preview/CodePreview').then(module => ({
    default: module.CodePreview,
  })),
)

const usageCode = `import {
  WuDrilldown,
  type IWuDrilldownContext,
} from '@npm-questionpro/wick-ui-lib'

export const SalesDrilldown = () => (
  <div className="h-[350px] border rounded-lg overflow-hidden">
    <WuDrilldown
      initial="LEVEL_1"
      baseTitle={{ id: 'LEVEL_1', title: 'Overall Sales' }}
      offsetHeight={42}
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
  </div>
)`

const exports = [
  {
    name: 'WuDrilldown',
    kind: 'component',
    description: 'The drilldown container',
  },
  {
    name: 'IWuDrilldownContext',
    kind: 'type',
    description: 'Context injected into each level component',
  },
]

const Installation = () => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(
      'npm install @npm-questionpro/wick-ui-lib@latest',
    )
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      className="min-h-screen py-16 px-4 sm:px-6 lg:px-8"
      style={{backgroundColor: 'var(--main-bg-color)'}}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1
            className="text-4xl font-bold mb-4"
            style={{color: 'var(--primary-text-color)'}}
          >
            Installation
          </h1>
          <p
            className="text-lg leading-relaxed"
            style={{color: 'var(--secondary-text-color)'}}
          >
            Add the drilldown component to your React project with a single
            command.
          </p>
        </div>

        {/* Install command */}
        <div className="mb-12">
          <h2
            className="text-base font-semibold mb-3"
            style={{color: 'var(--primary-text-color)'}}
          >
            npm
          </h2>
          <div
            className="flex items-center justify-between gap-4 px-4 py-3 rounded-lg border font-mono text-sm"
            style={{
              borderColor: 'var(--border-color)',
              backgroundColor: 'rgba(100,108,255,0.05)',
            }}
          >
            <span style={{color: 'var(--highlight-color)'}}>
              npm install @npm-questionpro/wick-ui-lib@latest
            </span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-opacity hover:opacity-80 flex-shrink-0"
              style={{
                backgroundColor: 'var(--highlight-color)',
                color: 'white',
              }}
            >
              {copied ? (
                <>
                  <Check size={13} /> Copied
                </>
              ) : (
                <>
                  <Copy size={13} /> Copy
                </>
              )}
            </button>
          </div>
        </div>

        {/* What's exported */}
        <div className="mb-12">
          <h2
            className="text-base font-semibold mb-3"
            style={{color: 'var(--primary-text-color)'}}
          >
            What's inside
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
                  {['Export', 'Kind', 'Description'].map(h => (
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
                {exports.map((exp, i) => (
                  <tr
                    key={exp.name}
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
                        {exp.name}
                      </code>
                    </td>
                    <td
                      className="px-4 py-3 text-xs"
                      style={{color: 'var(--secondary-text-color)'}}
                    >
                      {exp.kind}
                    </td>
                    <td
                      className="px-4 py-3 text-sm"
                      style={{color: 'var(--secondary-text-color)'}}
                    >
                      {exp.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Basic usage */}
        <div className="mb-12">
          <h2
            className="text-base font-semibold mb-3"
            style={{color: 'var(--primary-text-color)'}}
          >
            Basic usage
          </h2>
          <Suspense fallback={<div className="text-sm">Loading…</div>}>
            <CodePreviewLazy code={usageCode} />
          </Suspense>
        </div>

        {/* Footer */}
        <div
          className="pt-8 border-t"
          style={{borderColor: 'var(--border-color)'}}
        >
          <p className="text-sm" style={{color: 'var(--secondary-text-color)'}}>
            Next —{' '}
            <NavLink
              to="/docs/what-are-levels"
              style={{color: 'var(--highlight-color)'}}
            >
              learn how levels work.
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Installation
