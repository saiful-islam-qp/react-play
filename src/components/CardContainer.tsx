import React, { useState, useEffect, type ComponentType } from "react";

import { SwitchTransition, CSSTransition } from "react-transition-group";
import styles from "./CardContainer.module.css";

interface Props {
  MainNode: ComponentType<Record<string, unknown>>;
  DetailsNode: ComponentType<Record<string, unknown>>;
}

export const CardContainer: React.FC<Props> = ({ MainNode, DetailsNode }) => {
  const [state, setState] = React.useState(true);
  const [classNames, setClassNames] = useState("fade");
  const nodeRef = React.useRef<HTMLDivElement>(null);
  const [exited, setExited] = useState(false);
  const [entered, setEntered] = useState(false);

  const handleExited = () => {
    setExited(true);
  };

  const handleEntered = () => {
    setEntered(true);
  };

  useEffect(() => {
    if (exited && entered) {
      if (classNames !== "fade") {
        setClassNames("fade");
      } else {
        setClassNames("zoom");
      }
      setExited(false);
      setEntered(false);
    }
  }, [exited, entered]);

  return (
    <div className={styles.main}>
      <SwitchTransition mode="out-in">
        <CSSTransition
          key={state ? "card" : "details"}
          nodeRef={nodeRef}
          classNames={classNames}
          addEndListener={(done) => {
            if (nodeRef.current) {
              nodeRef.current.addEventListener("transitionend", done, true);
            }
          }}
          onExited={handleExited}
          onEntered={handleEntered}
          unmountOnExit
        >
          <div ref={nodeRef} className={styles.container}>
            {state ? (
              <MainNode handler={() => setState((s) => !s)} />
            ) : (
              <DetailsNode handler={() => setState((s) => !s)} />
            )}
          </div>
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
};
