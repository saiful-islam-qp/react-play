import React from 'react'
import styles from './SalesCard.module.css'
import {LineChart} from '../charts/LineChart'

export const Sale2Details: React.FC = () => {
  return (
    <div
      className={`${styles.container}`}
      style={{height: 'calc(100% - 40px)'}}
    >
      <h2 className={styles.title}>Sales trend by category</h2>
      <div className={styles.content} style={{height: 'calc(100% - 20px)'}}>
        <LineChart />
      </div>
    </div>
  )
}
