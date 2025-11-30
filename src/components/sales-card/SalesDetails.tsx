import React, { useState } from 'react';
import styles from './SalesCard.module.css';
import { Drilldown } from '../Drilldown';

import { Sale2Details } from './Sales2Details';
import { DonutChart } from '../charts/DonutChart';
import { ChevronLeftIcon } from 'lucide-react';

export const SalesDetails: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [titles, setTitles] = useState(['Sales by country']);
  const toggle = (data?: unknown): void => {
    if (data && typeof data === 'string') {
      setTitles([...titles, data]);
      setIsOpen(true);
    } else {
      setTitles(['Sales by country']);
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
                  {<h3 className="text-sm font-medium text-(--primary-text-color)">{t}</h3>}
                </React.Fragment>
              ))}
            </>
          )}
        </div>
      )}
    >
      {isOpen ? (
        <div className="border border-gray-300 rounded-xl">
          <Sale2Details />
        </div>
      ) : (
        <div className={`${styles.container}`}>
          <h2 className={styles.title}>Sales by country</h2>
          <div className={styles.content}>
            <DonutChart handler={toggle} />
          </div>
        </div>
      )}
    </Drilldown>
  );
};
