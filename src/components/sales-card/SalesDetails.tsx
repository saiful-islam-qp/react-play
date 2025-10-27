import React, { useState } from "react";
import styles from "./SalesCard.module.css";
import { CardContainer } from "../CardContainer";

import { Sale2Details } from "./Sales2Details";
import { DonutChart } from "../charts/DonutChart";

export const SalesDetails: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [titles, setTitles] = useState(["Sales by country"]);
  const openHandler = (data?: unknown) => {
    setTitles(data ? [titles[0], String(data)] : titles);
    setIsOpen((prev: boolean) => !prev);
  };

  return (
    <CardContainer isOpen={isOpen} setIsOpen={openHandler} titles={titles}>
      {isOpen ? (
        <Sale2Details />
      ) : (
        <div className={`${styles.container}`}>
          <h2 className={styles.title}>Sales by country</h2>
          <div className={styles.content}>
            <DonutChart handler={openHandler} />
          </div>
        </div>
      )}
    </CardContainer>
  );
};
