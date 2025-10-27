import React, { useState } from "react";
import styles from "./SalesCard.module.css";
import { ColumnChart } from "../charts/ColumnChart";
import { CardContainer } from "../CardContainer";
import { SalesDetails } from "./SalesDetails";

export const SalesCard: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [titles, setTitles] = useState(["Sales by region"]);

  const openHandler = (data?: unknown) => {
    setTitles(data ? [titles[0], String(data)] : titles);
    setIsOpen((prev: boolean) => !prev);
  };

  return (
    <CardContainer isOpen={isOpen} setIsOpen={openHandler} titles={titles}>
      {isOpen ? (
        <SalesDetails />
      ) : (
        <div className={`${styles.container}`}>
          <h2 className={styles.title}>Sales by region</h2>
          <div className={styles.content}>
            <ColumnChart handler={openHandler} />
          </div>
        </div>
      )}
    </CardContainer>
  );
};
