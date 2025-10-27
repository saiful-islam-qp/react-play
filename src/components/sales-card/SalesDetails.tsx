import React, { useState } from "react";
import styles from "./SalesCard.module.css";
import { CardContainer } from "../CardContainer";

import { Sale2Details } from "./Sales2Details";
import { DonutChart } from "../charts/DonutChart";

interface Props {
  handler?: () => void;
}

export const SalesDetails: React.FC<Props> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openHandler = () => {
    setIsOpen((prev: boolean) => !prev);
  };

  return (
    <CardContainer isOpen={isOpen} setIsOpen={openHandler}>
      {isOpen ? (
        <Sale2Details />
      ) : (
        <div className={`${styles.container} ${styles.bgGray}`}>
          <h2 className={styles.title}>Sales by country</h2>
          <div className={styles.content}>
            <DonutChart handler={openHandler} />
          </div>
        </div>
      )}
    </CardContainer>
  );
};
