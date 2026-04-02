import {NavLink} from 'react-router'

const reasons = [
  {
    number: 1,
    title: 'Data interactivity vs. static reports',
    description:
      'Static PDFs and PowerPoints lock users into a linear path. Drilldowns let users explore data on their own terms — filtering, expanding, and navigating without leaving the screen.',
  },
  {
    number: 2,
    title: 'Longer, deeper engagement',
    description:
      'Users who can interact with data spend more time with it. That time is measurable — dashboard views, session duration, and click paths all become signals you can act on.',
  },
  {
    number: 3,
    title: 'Trust through transparency',
    description:
      'Showing the raw data behind a summary (e.g. n=1000 survey responses) builds confidence in your reports. Drilldown makes that one click away instead of a separate export.',
  },
]

const Intro = () => {
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
            Why interactive drilldown?
          </h1>
          <p
            className="text-lg leading-relaxed"
            style={{color: 'var(--secondary-text-color)'}}
          >
            Three reasons teams move from static reporting to drilldown-driven
            dashboards.
          </p>
        </div>

        {/* Reasons */}
        <div className="space-y-px">
          {reasons.map((reason, i) => (
            <div
              key={reason.number}
              className="flex gap-6 py-8"
              style={{
                borderTop: i > 0 ? '1px solid var(--border-color)' : undefined,
              }}
            >
              <span
                className="text-4xl font-bold flex-shrink-0 w-8 text-right leading-none mt-1"
                style={{color: 'var(--border-color)'}}
              >
                {reason.number}
              </span>
              <div>
                <h2
                  className="text-lg font-semibold mb-2"
                  style={{color: 'var(--primary-text-color)'}}
                >
                  {reason.title}
                </h2>
                <p
                  className="text-sm leading-relaxed"
                  style={{color: 'var(--secondary-text-color)'}}
                >
                  {reason.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          className="mt-4 pt-8 border-t"
          style={{borderColor: 'var(--border-color)'}}
        >
          <p className="text-sm" style={{color: 'var(--secondary-text-color)'}}>
            Next —{' '}
            <NavLink
              to="/docs/installation"
              style={{color: 'var(--highlight-color)'}}
            >
              install the component and get it running in minutes.
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Intro
