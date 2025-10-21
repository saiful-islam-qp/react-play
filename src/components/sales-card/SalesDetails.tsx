import React from "react";
import styles from "./SalesCard.module.css";

interface Props {
  handler?: () => void;
}

export const SalesDetails: React.FC<Props> = ({ handler }) => {
  return (
    <div className={`${styles.container} ${styles.bgGray}`}>
      <div className="flex justify-between items-center">
        <h2 className={styles.title}>Sales Details Breakdown</h2>
        <button onClick={handler}>Back</button>
      </div>
      <div className={styles.content}>
        <h4>Heading</h4>
        <p>
          This section provides a detailed breakdown of sales performance,
          including metrics, trends, and analysis to help you understand the
          factors driving your sales figures. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Esse dolorem quam dolore sed officiis
          voluptas temporibus optio quasi expedita earum. This section provides
          a detailed breakdown of sales performance, including metrics, trends,
          and analysis to help you understand the factors driving your sales
          figures. Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
          dolorem quam dolore sed officiis voluptas temporibus optio quasi
          expedita earum.
        </p>
        <h4>Heading 2</h4>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam vel
          molestias omnis doloremque dolorum minus nemo facilis asperiores
          voluptatum animi?
        </p>
      </div>
    </div>
  );
};
