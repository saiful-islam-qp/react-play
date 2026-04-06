import {
  WuDrilldown,
  type IWuDrilldownContext,
  type IWuDrilldownAnimationVariant,
} from '@npm-questionpro/wick-ui-lib'
import {RightSideBar} from '../../components/sidebar/RightSidebar'
import {
  SalesByCategory,
  SalesByProduct,
  SalesByRegion,
} from '../../components/drilldown-motion/MoDrilldownExample'

// ── Shared demo component ────────────────────────────────────────────────────

interface DemoProps {
  variant?: IWuDrilldownAnimationVariant
  mode?: 'popLayout' | 'wait'
  dir?: 'ltr' | 'rtl'
}

const DrilldownDemo = ({
  variant = 'default',
  mode = 'popLayout',
  dir = 'ltr',
}: DemoProps) => (
  <div className="h-[340px] border rounded-lg bg-white overflow-hidden border-gray-200">
    <WuDrilldown
      initial="LEVEL_1"
      baseTitle={{id: 'LEVEL_1', title: 'Sales by region'}}
      headerClasses="wu-bg-gray-50 wu-border-b wu-px-4 wu-h-12 wu-flex wu-items-center"
      offsetHeight={48}
      variant={variant}
      mode={mode}
      dir={dir}
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
    />
  </div>
)

// ── Data ─────────────────────────────────────────────────────────────────────

const basicVariants: {
  variant: IWuDrilldownAnimationVariant
  label: string
  description: string
}[] = [
  {
    variant: 'default',
    label: 'default',
    description:
      'Subtle fade and scale. The baseline animation when no variant is set.',
  },
  {
    variant: 'slideLeft',
    label: 'slideLeft',
    description:
      'New levels push in from the right — a natural forward-navigation feel.',
  },
  {
    variant: 'slideRight',
    label: 'slideRight',
    description:
      'New levels enter from the left. Mirrors slideLeft for back-step metaphors.',
  },
  {
    variant: 'fadeZoom',
    label: 'fadeZoom',
    description:
      'Fades out while scaling down, fades in while scaling up. No lateral movement.',
  },
]

const animationModes: {
  mode: 'popLayout' | 'wait'
  label: string
  description: string
}[] = [
  {
    mode: 'popLayout',
    label: 'popLayout',
    description:
      'The exiting level is removed from layout immediately, letting the entering level take its place without waiting. Feels snappier.',
  },
  {
    mode: 'wait',
    label: 'wait',
    description:
      'The exiting level fully completes its exit animation before the entering level starts. More deliberate and sequential.',
  },
]

// ── Page ─────────────────────────────────────────────────────────────────────

const Prop = ({children}: {children: string}) => (
  <code
    className="inline-block text-xs font-mono px-2 py-1 rounded"
    style={{
      backgroundColor: 'rgba(100,108,255,0.1)',
      color: 'var(--highlight-color)',
    }}
  >
    {children}
  </code>
)

const ComponentVariants = () => {
  return (
    <div
      className="min-h-screen"
      style={{backgroundColor: 'var(--main-bg-color)'}}
    >
      <div className="grid grid-cols-1 lg:grid-cols-8 gap-4 px-4 sm:px-6 lg:px-8 py-16">
        {/* Main content */}
        <div className="lg:col-span-6 space-y-16">
          {/* Header */}
          <div>
            <h1
              className="text-4xl font-bold mb-4"
              style={{color: 'var(--primary-text-color)'}}
            >
              Component Variants
            </h1>
            <p
              className="text-lg leading-relaxed"
              style={{color: 'var(--secondary-text-color)'}}
            >
              Live examples of every configuration option. Click{' '}
              <strong>Go next</strong> in each demo to see the behaviour.
            </p>
          </div>

          {/* ── Basic ── */}
          <div id="basic">
            <h2
              className="text-xl font-semibold mb-1"
              style={{color: 'var(--primary-text-color)'}}
            >
              Basic
            </h2>
            <p
              className="text-sm mb-8 leading-relaxed"
              style={{color: 'var(--secondary-text-color)'}}
            >
              The <code>variant</code> prop controls the transition animation
              between levels. Four options are available.
            </p>

            <div className="grid grid-cols md:grid-cols-2 gap-4 md:gap-8">
              {basicVariants.map(v => (
                <div key={v.variant}>
                  <div className="flex items-center gap-3 mb-2">
                    <Prop>{`variant="${v.label}"`}</Prop>
                  </div>
                  <p
                    className="text-sm mb-3 leading-relaxed"
                    style={{color: 'var(--secondary-text-color)'}}
                  >
                    {v.description}
                  </p>
                  <DrilldownDemo variant={v.variant} />
                </div>
              ))}
            </div>
          </div>

          {/* ── RTL ── */}
          <div id="rtl">
            <h2
              className="text-xl font-semibold mb-1"
              style={{color: 'var(--primary-text-color)'}}
            >
              RTL
            </h2>
            <p
              className="text-sm mb-8 leading-relaxed"
              style={{color: 'var(--secondary-text-color)'}}
            >
              Set <code>dir="rtl"</code> for right-to-left layouts. The
              drilldown flips its navigation direction — the back button moves
              to the right and slide animations are mirrored accordingly.
            </p>

            <div>
              <div className="flex items-center gap-3 mb-2">
                <Prop>{`dir="rtl"`}</Prop>
                <Prop>{`variant="slideLeft"`}</Prop>
              </div>
              <p
                className="text-sm mb-3 leading-relaxed"
                style={{color: 'var(--secondary-text-color)'}}
              >
                Same slideLeft variant — notice the back button and slide
                direction are mirrored compared to the LTR version above.
              </p>
              <DrilldownDemo variant="slideLeft" dir="rtl" />
            </div>
          </div>

          {/* ── Animation ── */}
          <div id="animation">
            <h2
              className="text-xl font-semibold mb-1"
              style={{color: 'var(--primary-text-color)'}}
            >
              Animation
            </h2>
            <p
              className="text-sm mb-8 leading-relaxed"
              style={{color: 'var(--secondary-text-color)'}}
            >
              The <code>mode</code> prop controls how the exit and enter
              animations are sequenced. Both demos use{' '}
              <code>variant="slideLeft"</code> — the difference is in timing.
            </p>

            <div className="space-y-8">
              <div className="grid grid-cols md:grid-cols-2 gap-4 md:gap-8">
                {animationModes.map(m => (
                  <div key={m.mode}>
                    <div className="flex items-center gap-3 mb-2">
                      <Prop>{`mode="${m.label}"`}</Prop>
                      <Prop>{`variant="default"`}</Prop>
                    </div>
                    <p
                      className="text-sm mb-3 leading-relaxed"
                      style={{color: 'var(--secondary-text-color)'}}
                    >
                      {m.description}
                    </p>
                    <DrilldownDemo mode={m.mode} />
                  </div>
                ))}
              </div>
              <div className="grid grid-cols md:grid-cols-2 gap-4 md:gap-8">
                {animationModes.map(m => (
                  <div key={m.mode}>
                    <div className="flex items-center gap-3 mb-2">
                      <Prop>{`mode="${m.label}"`}</Prop>
                      <Prop>{`variant="slideLeft"`}</Prop>
                    </div>
                    <p
                      className="text-sm mb-3 leading-relaxed"
                      style={{color: 'var(--secondary-text-color)'}}
                    >
                      {m.description}
                    </p>
                    <DrilldownDemo variant="slideLeft" mode={m.mode} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="hidden lg:block lg:col-span-2">
          <RightSideBar
            hashLinks={[
              {href: '#basic', name: 'Basic'},
              {href: '#rtl', name: 'RTL'},
              {href: '#animation', name: 'Animation'},
            ]}
          />
        </div>
      </div>
    </div>
  )
}

export default ComponentVariants
