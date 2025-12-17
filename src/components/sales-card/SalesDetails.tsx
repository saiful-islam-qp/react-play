import React, {useState} from 'react'
import styles from './SalesCard.module.css'
import {WuDrilldown} from '../WuDrilldown'

import {Sale2Details} from './Sales2Details'
import {DonutChart} from '../charts/DonutChart'

interface IProps {
  titleHandler?: (data: unknown) => void
}

export const SalesDetails: React.FC<IProps> = ({titleHandler}) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = (data?: unknown): void => {
    if (titleHandler) {
      titleHandler({
        text: data as string,
        callback: () => setIsOpen(prev => !prev),
      })
    }
    setIsOpen(prev => !prev)
  }

  return (
    <WuDrilldown isOpen={isOpen}>
      {isOpen ? (
        <Sale2Details />
      ) : (
        <div
          className={`${styles.container}`}
          style={{height: 'calc(100% - 40px)'}}
        >
          <h2 className={styles.title}>Sales by country</h2>
          <div className={styles.content} style={{height: 'calc(100% - 20px)'}}>
            <DonutChart handler={toggle} />
          </div>
        </div>
      )}
    </WuDrilldown>
  )
}
