import {
  MoDrilldown,
  type DrilldownContext,
} from '../drilldown-motion/MoDrilldown'

// Child Component 1 (Root)
const SalesOverview = ({goNext}: DrilldownContext) => (
  <div className="wu-p-4">
    <h3>Overview</h3>
    <button
      className="wu-btn"
      // Navigate to Level 2 and set the next breadcrumb title
      onClick={() => goNext('level-2', {id: 'level-2', title: 'Q1 Details'})}
    >
      View Details
    </button>
  </div>
)

// Child Component 2 (Deep)
const SalesDetails = ({goBack}: DrilldownContext) => (
  <div className="wu-p-4">
    <h3>Q1 Details</h3>
    <p>Details content here...</p>
    <button onClick={() => goBack('level-1')}>Back</button>
  </div>
)

// Parent Implementation
export const ExampleCompact = (): React.JSX.Element => {
  return (
    <div className="wu-h-[400px] wu-border wu-rounded-xl wu-relative wu-overflow-hidden">
      <MoDrilldown
        initial="level-1"
        baseTitle={{id: 'level-1', title: 'Sales'}}
        variant="slideRight"
        headerClasses="wu-bg-gray-50 wu-border-b wu-px-4 wu-h-12 wu-flex wu-items-center"
        items={{
          'level-1': {
            component: (ctx: DrilldownContext) => <SalesOverview {...ctx} />,
          },
          'level-2': {
            component: (ctx: DrilldownContext) => <SalesDetails {...ctx} />,
          },
        }}
      />
    </div>
  )
}
