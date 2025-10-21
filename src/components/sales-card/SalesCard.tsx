import React from "react";
import styles from "./SalesCard.module.css";

interface Props {
  handler?: () => void;
}

export const SalesCard: React.FC<Props> = ({ handler }) => {
  return (
    <div className={`${styles.container} ${styles.bgBlue}`}>
      <h2 className={styles.title}>This is a Sales card</h2>
      <div className={styles.content}>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde
          consequatur autem recusandae maxime, quos nesciunt ipsam illo iste
          sint! Voluptatum?
        </p>
        <button onClick={handler}>Learn More</button>
      </div>
    </div>
  );
};
