import React from "react";
import styles from "./SalesCard.module.css";
import { ColumnChart } from "../charts/ColumnChart";

interface Props {
  handler?: () => void;
}

export const SalesCard: React.FC<Props> = ({ handler }) => {
  return (
    <div className={`${styles.container}`}>
      <h2 className={styles.title}>Sales by region</h2>
      <div className={styles.content}>
        <ColumnChart handler={handler} />
      </div>
    </div>
  );
};
