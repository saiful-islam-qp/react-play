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
    useState<IOption>({ id: "fade-zoom", name: "Fade-Zoom" });
  return (
    <>
      <h1 className="mb-4">Custom Component with React Spring</h1>
      <AnimationSelector
        selectedContentAnimation={selectedContentAnimation}
        setSelectedContentAnimation={setSelectedContentAnimation}
        selectedHeaderAnimation={selectedHeaderAnimation}
        setSelectedHeaderAnimation={setSelectedHeaderAnimation}
      />
      <div className="card flex wrap gap-4">
        <div className="flex-1">
          <CardContainer
            MainNode={SalesCard}
            DetailsNode={SalesDetails}
            selectedContentAnimation={selectedContentAnimation.id as string}
            selectedHeaderAnimation={selectedHeaderAnimation.id as string}
          />
        </div>
        <div className="flex-1">
          <CardContainer
            MainNode={SalesCard}
            DetailsNode={SalesDetails}
            selectedContentAnimation={selectedContentAnimation.id as string}
            selectedHeaderAnimation={selectedHeaderAnimation.id as string}
          />
        </div>
      </div>
    </>
  );
}

export default App;
