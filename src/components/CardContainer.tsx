import React, { useState, useEffect } from "react";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";
import styles from "./CardContainer.module.css";

interface Props {
  selectedContentAnimation?: string;
  selectedHeaderAnimation?: string;
  children?: React.ReactNode;
  isOpen?: boolean;
  setIsOpen?: () => void;
  titles?: string[];
}

export const CardContainer: React.FC<Props> = ({
  selectedContentAnimation = "fade-zoom",
  selectedHeaderAnimation = "v2",
  isOpen = false,
  setIsOpen,
  children,
  titles = [],
}) => {
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
          key={isOpen ? "header-visible" : "header-hidden"}
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
            style={{ padding: isOpen ? "8px 16px" : "0px" }}
          >
            {isOpen ? (
              <div className="flex items-center gap-4">
                <FontAwesomeIcon
                  icon={faChevronCircleLeft}
                  size="lg"
                  onClick={setIsOpen}
                  style={{ width: "20px", height: "20px", cursor: "pointer" }}
                />
                <div>
                  {titles.map((title) => (
                    <span key={title} className="m-0">
                      {title}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </CSSTransition>
      </SwitchTransition>
      <SwitchTransition mode="out-in">
        <CSSTransition
          key={isOpen ? "details" : "card"}
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
              padding: isOpen ? "40px 16px 16px 40px" : "0px",
            }}
          >
            {children}
          </div>
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
};
