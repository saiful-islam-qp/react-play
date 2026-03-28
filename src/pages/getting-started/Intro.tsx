const Intro = () => {
  const reasons = [
    {
      number: 1,
      title: 'Data Interactivity vs. Static Reports',
      description:
        'The fundamental difference between dashboards and static reports lies in their interactive nature. While both can look visually appealing, dashboards enable true data-level interactivity—not just visual animations. This transforms how users engage with information, moving beyond linear PDF or PowerPoint presentations to non-linear, flexible reporting that adapts to user needs.',
    },
    {
      number: 2,
      title: 'Increased User Engagement',
      description:
        'End users can now truly explore and interact with dashboards, significantly increasing on-screen time and engagement with your toolset. This deeper interaction builds stronger user loyalty. By collecting metrics around dashboard views and time spent, you can demonstrate tangible value—showing that Dashboard 4 received 44 views this week with 452 minutes of active consumption.',
    },
    {
      number: 3,
      title: 'Row-Level Data Confidence',
      description:
        'When users can access the underlying data that generates reports, they gain greater confidence in the summarized insights. By showcasing raw data (like "n=1000" in surveys), along with collection methodology, you build trust in the reports. Drilldown capabilities make it effortless to reveal the data foundation behind every visualization.',
    },
  ]

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="mb-16">
          <h1 className="text-4xl font-bold text-gray-700 mb-4">
            Why Interactive Dashboards?
          </h1>
          <p className="text-xl text-gray-600">
            Discover the three key advantages that make interactive dashboards
            essential for modern data reporting and user engagement.
          </p>
        </div>

        {/* Bullet Points */}
        <div className="space-y-8">
          {reasons.map(reason => (
            <div key={reason.number} className="flex gap-6 group">
              {/* Numbered Bullet */}
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold text-xl shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                  {reason.number}
                </div>
              </div>

              {/* Content */}
              <div className="flex-grow pt-2">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  {reason.title}
                </h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {reason.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-16 pt-12 border-t border-gray-200 text-center">
          <p className="text-gray-600 text-lg">
            Ready to transform your reporting experience?
          </p>
        </div>
      </div>
    </div>
  )
}

export default Intro
