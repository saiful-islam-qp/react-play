import React, { useState, useEffect, type ComponentType } from "react";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";
import styles from "./CardContainer.module.css";

interface Props {
  MainNode: ComponentType<Record<string, unknown>>;
  DetailsNode: ComponentType<Record<string, unknown>>;
  selectedContentAnimation?: string;
  selectedHeaderAnimation?: string;
}

export const CardContainer: React.FC<Props> = ({
  MainNode,
  DetailsNode,
  selectedContentAnimation = "fade-zoom",
  selectedHeaderAnimation = "v2",
}) => {
  const [state, setState] = React.useState(true);
  const [classNames, setClassNames] = useState(
    `${selectedContentAnimation}-view-in`
  );
  const [headerClasses, setHeaderClasses] = useState(
    `${selectedHeaderAnimation}-header-in`
  );
  const nodeRef = React.useRef<HTMLDivElement>(null);
  const headerRef = React.useRef<HTMLDivElement>(null);
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
      if (classNames !== `${selectedContentAnimation}-view-in`) {
        setClassNames(`${selectedContentAnimation}-view-in`);
        setHeaderClasses(`${selectedHeaderAnimation}-header-in`);
      } else {
        setClassNames(`${selectedContentAnimation}-view-out`);
        setHeaderClasses(`${selectedHeaderAnimation}-header-out`);
      }

      setExited(false);
      setEntered(false);
    }
  }, [exited, entered, selectedContentAnimation, selectedHeaderAnimation]);

  useEffect(() => {
    if (classNames.includes("in")) {
      setClassNames(`${selectedContentAnimation}-view-in`);
      setHeaderClasses(`${selectedHeaderAnimation}-header-in`);
    } else {
      setClassNames(`${selectedContentAnimation}-view-out`);
      setHeaderClasses(`${selectedHeaderAnimation}-header-out`);
    }
  }, [selectedContentAnimation, selectedHeaderAnimation]);

  return (
    <div className={styles.main}>
      <SwitchTransition mode="out-in">
        <CSSTransition
          key={!state ? "header-visible" : "header-hidden"}
          nodeRef={headerRef}
          addEndListener={(done) => {
            if (nodeRef.current) {
              nodeRef.current.addEventListener("transitionend", done, true);
            }
          }}
          classNames={headerClasses}
          unmountOnExit
        >
          <div
            ref={headerRef}
            className={styles.headerContainer}
            style={{ padding: !state ? "8px 16px" : "0px" }}
          >
            {!state ? (
              <div className="flex items-center gap-4">
                <FontAwesomeIcon
                  icon={faChevronCircleLeft}
                  size="lg"
                  onClick={() => setState((s) => !s)}
                  style={{ width: "20px", height: "20px", cursor: "pointer" }}
                />

                <h4>Sales by region</h4>
                <h4>Asia 2021</h4>
              </div>
            ) : null}
          </div>
        </CSSTransition>
      </SwitchTransition>

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
          <div
            ref={nodeRef}
            className={styles.container}
            style={{
              padding: !state ? "40px 16px 16px 40px" : "0px",
            }}
          >
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
