import React from "react";
import styles from "./SalesCard.module.css";

interface Props {
  handler?: () => void;
}

export const SalesDetails: React.FC<Props> = ({ handler }) => {
  return (
    <div className={`${styles.container} ${styles.bgGray}`}>
      <div className="flex items-center" style={{ position: "relative" }}>
        <h2 className={styles.title} style={{ margin: "0 auto" }}>
          Sales Details Breakdown
        </h2>
        <span
          onClick={handler}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          Back
        </span>
      </div>
      <div className={styles.content}>
        <h4 style={{ margin: "4 0" }}>Heading</h4>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam vel
          molestias omnis doloremque dolorum minus nemo facilis asperiores
          voluptatum animi?
        </p>
        <table style={{ width: "100%", marginTop: "24px" }}>
          <caption>Front-end web developer course 2021</caption>
          <thead>
            <tr>
              <th scope="col">Person</th>
              <th scope="col">Most interest in</th>
              <th scope="col">Age</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Chris</th>
              <td>HTML tables</td>
              <td>22</td>
            </tr>
            <tr>
              <th scope="row">Dennis</th>
              <td>Web accessibility</td>
              <td>45</td>
            </tr>
            <tr>
              <th scope="row">Sarah</th>
              <td>JavaScript frameworks</td>
              <td>29</td>
            </tr>
            <tr>
              <th scope="row">Karen</th>
              <td>Web performance</td>
              <td>36</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th scope="row" colSpan={2}>
                Average age
              </th>
              <td>33</td>
            </tr>
          </tfoot>
        </table>
        <div style={{ minHeight: "100px" }}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
          doloribus est blanditiis sed fugiat, ducimus dolores recusandae vitae
          cupiditate nisi!
        </div>
        <div style={{ minHeight: "80px" }}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
          doloribus est blanditiis sed fugiat, ducimus dolores recusandae vitae
          cupiditate nisi!
        </div>
      </div>
    </div>
  );
};
