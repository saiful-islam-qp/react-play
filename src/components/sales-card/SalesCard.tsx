import React, {Fragment, useState} from 'react'
import styles from './SalesCard.module.css'
import {ColumnChart} from '../charts/ColumnChart'
import {SalesDetails} from './SalesDetails'
import {WuDrilldown} from '../WuDrilldown'
import {ChevronLeftIcon} from 'lucide-react'

type TitleType = {
  text: string
  callback?: () => void
}

export const SalesCard: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [titles, setTitles] = useState<TitleType[]>([
    {
      text: 'Sales by region',
      callback: () => setIsOpen(false),
    },
  ])

  const toggle = (data?: unknown): void => {
    setTitles([
      ...titles,
      {text: data as string, callback: () => setIsOpen(false)},
    ])
    setIsOpen(prev => !prev)
  }

  const titleHandler = (data: unknown, index?: number): void => {
    if (data && typeof data === 'object') {
      setTitles([...titles, data as TitleType])
    }
    if (index !== undefined) {
      let sliceIndex = index
      if (index === 0) sliceIndex++
      setTitles(titles.slice(0, sliceIndex))
    }
  }

  return (
    <WuDrilldown isOpen={isOpen}>
      {isOpen ? (
        <Fragment>
          <div className="overflow-hidden">
            <div className="h-10 flex items-center gap-4 w-full overflow-x-auto no-scrollbar flex items-center gap-4 w-full snap-x snap-mandatory scroll-smooth">
              <ChevronLeftIcon size={16} />
              {titles.map((title, index) => (
                <React.Fragment key={title.text}>
                  {
                    <h6
                      onClick={() =>
                        titleHandler(title.callback && title.callback(), index)
                      }
                      className="text-sm font-medium cursor-pointer whitespace-nowrap snap-start shrink-0 text-(--primary-text-color)"
                    >
                      {title.text}
                    </h6>
                  }
                </React.Fragment>
              ))}
            </div>
          </div>
          <SalesDetails titleHandler={titleHandler} />
        </Fragment>
      ) : (
        <div className={`${styles.container}`} style={{height: '100%'}}>
          <h2 className={styles.title}>Sales by region</h2>
          <div className={styles.content} style={{height: 'calc(100% - 20px)'}}>
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
    </WuDrilldown>
  )
}
