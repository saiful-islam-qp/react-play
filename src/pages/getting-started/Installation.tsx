import {lazy, Suspense, useState} from 'react'
import {Check, Copy, Code} from 'lucide-react'
const CodePreviewLazy = lazy(() =>
  import('../../components/code-preview/CodePreview').then(module => ({
    default: module.CodePreview,
  })),
)

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
        {/* Header Section */}
        <div className="mb-16 text-center">
          <h1
            className="text-4xl font-bold mb-6"
            style={{color: 'var(--primary-text-color)'}}
          >
            Install WuDrilldown
          </h1>
          <p
            className="text-lg md:text-xl"
            style={{color: 'var(--secondary-text-color)'}}
          >
            Add interactive drilldown components to your React application in
            seconds
          </p>
        </div>

        {/* Installation Command Section */}
        <div className="mb-16">
          <div className="mb-4 flex items-center gap-2">
            <Code size={20} style={{color: 'var(--highlight-color)'}} />
            <h2
              className="text-2xl font-semibold"
              style={{color: 'var(--primary-text-color)'}}
            >
              Installation Command
            </h2>
          </div>

          <div
            className="p-6 rounded-lg border transition-all"
            style={{
              backgroundColor: 'rgba(100, 108, 255, 0.05)',
              borderColor: 'var(--border-color)',
            }}
          >
            <div className="flex items-center justify-between gap-4">
              <code
                className="text-sm md:text-base font-mono flex-1"
                style={{color: 'var(--highlight-color)'}}
              >
                npm install @npm-questionpro/wick-ui-lib@latest
              </code>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2 rounded-md transition-all hover:opacity-80"
                style={{
                  backgroundColor: 'var(--highlight-color)',
                  color: 'white',
                }}
              >
                {copied ? (
                  <>
                    <Check size={18} />
                    <span className="text-sm font-medium">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy size={18} />
                    <span className="text-sm font-medium">Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Basic Usage Section */}
        <div className="mb-16">
          <h2
            className="text-2xl font-semibold mb-6"
            style={{color: 'var(--primary-text-color)'}}
          >
            Basic Usage
          </h2>

          <Suspense fallback={<div className="text-sm">Loading...</div>}>
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

        {/* Features Section */}
        <div>
          <h2
            className="text-2xl font-semibold mb-6"
            style={{color: 'var(--primary-text-color)'}}
          >
            Key Features
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Interactive',
                description:
                  'Enable users to explore data with intuitive drilldown interactions',
              },
              {
                title: 'Customizable',
                description:
                  'Full control over animations and component appearance',
              },
              {
                title: 'Performance',
                description:
                  'Optimized for smooth animations and efficient rendering',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-lg border transition-all hover:border-opacity-100"
                style={{
                  backgroundColor: 'white',
                  borderColor: 'var(--border-color)',
                }}
              >
                <div
                  className="w-10 h-10 rounded-lg mb-4 flex items-center justify-center"
                  style={{backgroundColor: 'var(--highlight-color)'}}
                >
                  <span className="text-lg font-bold text-white">
                    {index + 1}
                  </span>
                </div>
                <h3
                  className="text-lg font-semibold mb-2"
                  style={{color: 'var(--primary-text-color)'}}
                >
                  {feature.title}
                </h3>
                <p style={{color: 'var(--secondary-text-color)'}}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Info */}
        <div
          className="mt-16 pt-8 border-t"
          style={{borderColor: 'var(--border-color)'}}
        >
          <p
            className="text-center"
            style={{color: 'var(--secondary-text-color)'}}
          >
            For more examples and detailed documentation, explore the other
            sections in this guide.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Installation
