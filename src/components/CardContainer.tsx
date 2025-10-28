import React, { useState, useEffect } from "react";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";
import styles from "./CardContainer.module.css";
import { useAnimationState } from "../context/AnimationContext";

interface Props {
  children?: React.ReactNode;
  isOpen?: boolean;
  setIsOpen?: () => void;
  titles?: string[];
}

export const CardContainer: React.FC<Props> = ({
  isOpen = false,
  setIsOpen,
  children,
  titles = [],
}) => {
  const { state } = useAnimationState();
  const [classNames, setClassNames] = useState(`v2-view-in`);
  const [headerClasses, setHeaderClasses] = useState(`v2-header-in`);
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
      if (classNames !== `${state.contentAnimation.id}-view-in`) {
        setClassNames(`${state.contentAnimation.id}-view-in`);
        setHeaderClasses(`${state.headerAnimation.id}-header-in`);
      } else {
        setClassNames(`${state.contentAnimation.id}-view-out`);
        setHeaderClasses(`${state.headerAnimation.id}-header-out`);
      }

      setExited(false);
      setEntered(false);
    }
  }, [exited, entered, state]);

  useEffect(() => {
    if (classNames.includes("in")) {
      setClassNames(`${state.contentAnimation.id}-view-in`);
      setHeaderClasses(`${state.headerAnimation.id}-header-in`);
    } else {
      setClassNames(`${state.contentAnimation.id}-view-out`);
      setHeaderClasses(`${state.headerAnimation.id}-header-out`);
    }
  }, [state]);

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
                <div className="flex items-center gap-4">
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
