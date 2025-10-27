import { useState } from "react";
import "./App.css";
import { AnimationSelector } from "./components/animation-selector/AnimationSelector";
import { CardContainer } from "./components/CardContainer";
import { SalesCard } from "./components/sales-card/SalesCard";
import { SalesDetails } from "./components/sales-card/SalesDetails";
import type { IOption } from "./components/select/Select";

function App() {
  const [selectedHeaderAnimation, setSelectedHeaderAnimation] =
    useState<IOption>({ id: "v2", name: "V2" });
  const [selectedContentAnimation, setSelectedContentAnimation] =
    useState<IOption>({ id: "v2", name: "V3. Slide-Up" });
  const [isOpen, setIsOpen] = useState(false);

  const openHandler = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <div className="mb-4">
        <h1 className="m-0">Context Container</h1>
        <p className="m-0">Best Combo: Header: V2 | Content: V3. Slide-UP</p>
      </div>
      <AnimationSelector
        selectedContentAnimation={selectedContentAnimation}
        setSelectedContentAnimation={setSelectedContentAnimation}
        selectedHeaderAnimation={selectedHeaderAnimation}
        setSelectedHeaderAnimation={setSelectedHeaderAnimation}
      />
      <div className="flex wrap gap-4">
        <div className="flex-1">
          <CardContainer
            selectedContentAnimation={selectedContentAnimation.id as string}
            selectedHeaderAnimation={selectedHeaderAnimation.id as string}
            isOpen={isOpen}
            setIsOpen={openHandler}
          >
            {isOpen ? <SalesDetails /> : <SalesCard handler={openHandler} />}
          </CardContainer>
        </div>
        <div className="flex-1">
          <CardContainer
            selectedContentAnimation={selectedContentAnimation.id as string}
            selectedHeaderAnimation={selectedHeaderAnimation.id as string}
            isOpen={isOpen}
            setIsOpen={openHandler}
          >
            {isOpen ? <SalesDetails /> : <SalesCard handler={openHandler} />}
          </CardContainer>
        </div>
      </div>
    </>
  );
}

export default App;
