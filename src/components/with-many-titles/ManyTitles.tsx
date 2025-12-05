import React, {useState} from 'react'
import styles from '../sales-card/SalesCard.module.css'
import {ColumnChart} from '../charts/ColumnChart'
import {SalesDetails} from '../sales-card/SalesDetails'
import {Drilldown} from '../Drilldown'
import {ChevronLeftIcon} from 'lucide-react'

export const ManyTitles: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [titles, setTitles] = useState([
    'Sales by region',
    'Sales',
    'Details',
    'lorem ipsum dolor sit amet consectetur adipiscing elit',
    'Another level lorem ipsum dolor sit amet consectetur adipiscing elit',
    'Last level lorem ipsum dolor sit amet consectetur adipiscing elit',
    'Another level',
    'Last level',
  ])

  const toggle = (data?: unknown): void => {
    if (data && typeof data === 'string') {
      setTitles([...titles, data])
      setIsOpen(true)
    } else {
      setTitles([
        'Sales by region',
        'Sales',
        'Details',
        'lorem ipsum dolor sit amet consectetur adipiscing elit',
        'Another level lorem ipsum dolor sit amet consectetur adipiscing elit',
        'Last level lorem ipsum dolor sit amet consectetur adipiscing elit',
        'Another level',
        'Last level',
      ])
      setIsOpen(false)
    }
  }

  return (
    <Drilldown
      isOpen={isOpen}
      header={ref => (
        <div
          ref={ref}
          onClick={toggle}
          className="absolute top-4 left-4 right-4 z-10 overflow-hidden"
        >
          {isOpen && (
            <div className="flex items-center gap-4 w-full overflow-x-auto no-scrollbar flex items-center gap-4 w-full snap-x snap-mandatory scroll-smooth">
              <ChevronLeftIcon size={16} />
              {titles.map(t => (
                <React.Fragment key={t}>
                  {
                    <h3 className="text-sm font-medium cursor-pointer whitespace-nowrap snap-start shrink-0 text-(--primary-text-color)">
                      {t}
                    </h3>
                  }
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      )}
    >
      {isOpen ? (
        <SalesDetails />
      ) : (
        <div className={`${styles.container}`}>
          <h2 className={styles.title}>Sales by region</h2>
          <div className={styles.content}>
            <ColumnChart
              handler={toggle}
              categories={['Africa', 'America', 'Asia', 'Europe']}
              series={[
                {
                  type: 'column',
                  name: 'Year 2023',
                  data: [632, 727, 3202, 721],
                },
                {
                  type: 'column',
                  name: 'Year 2024',
                  data: [814, 841, 3714, 726],
                },
                {
                  type: 'column',
                  name: 'Year 2025',
                  data: [1393, 1031, 4695, 745],
                },
              ]}
            />
          </div>
        </div>
      )}
    </Drilldown>
  )
}
