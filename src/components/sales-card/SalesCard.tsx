import React, { useState } from "react";
import styles from "./SalesCard.module.css";
import { ColumnChart } from "../charts/ColumnChart";
import { SalesDetails } from "./SalesDetails";
import { Drilldown } from "../Drilldown";
import { ChevronLeftIcon } from "lucide-react";

export const SalesCard: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [titles, setTitles] = useState(["Sales by region"]);

  const toggle = (data?: unknown): void => {
    if (data && typeof data === "string") {
      setTitles([...titles, data]);
      setIsOpen(true);
    } else {
      setTitles(["Sales by region"]);
      setIsOpen(false);
    }
  };

  return (
    <Drilldown
      isOpen={isOpen}
      header={(ref) => (
        <div
          ref={ref}
          onClick={toggle}
          className="absolute top-3 left-4 z-10 flex items-center gap-4 cursor-pointer"
        >
          {isOpen && (
            <>
              <ChevronLeftIcon size={16} />
              {titles.map((t) => (
                <React.Fragment key={t}>
                  {
                    <h3 className="text-sm font-medium text-(--primary-text-color)">
                      {t}
                    </h3>
                  }
                </React.Fragment>
              ))}
            </>
          )}
        </div>
      )}
    >
      {isOpen ? (
        <SalesDetails />
      ) : (
        <div className={`${styles.container}`}>
          <h2 className={styles.title}>Sales by region</h2>
          <div className={styles.content}>
            <ColumnChart handler={toggle} />
          </div>
        </div>
      )}
    </Drilldown>
  );
};
