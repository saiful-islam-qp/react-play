import React from "react";
import styles from "./SalesCard.module.css";
import { LineChart } from "../charts/LineChart";

interface Props {}

export const Sale2Details: React.FC<Props> = ({}) => {
  return (
    <div className={`${styles.container} border border-gray-300`}>
      <h2 className={styles.title}>Sales trend by category</h2>
      <div className={styles.content}>
        <LineChart />
      </div>
    </div>
  );
};
