import React, { useState, type ComponentType } from 'react';
import { animated, useTransition } from '@react-spring/web';
import styles from './CardContainer.module.css';

interface Props {
  MainNode: ComponentType<Record<string, unknown>>;
  DetailsNode: ComponentType<Record<string, unknown>>;
}

export const SpringCard: React.FC<Props> = ({ MainNode, DetailsNode }) => {
  const [state, setState] = useState(true);

  const transitions = useTransition(state, {
    from: { opacity: 0.2, transform: 'scale(0.8)' },
    enter: { opacity: 1, transform: 'scale(1)' },
    leave: { opacity: 0.2, transform: 'scale(1.2)' },
    config: {
      tension: 170,
      friction: 100,
    },
    exitBeforeEnter: true,
  });

  return (
    <div className={styles.main}>
      {transitions((style, item) => (
        <animated.div style={style} className={styles.container}>
          {item ? (
            <MainNode handler={() => setState((s) => !s)} />
          ) : (
            <DetailsNode handler={() => setState((s) => !s)} />
          )}
        </animated.div>
      ))}
    </div>
  );
};
