import "./App.css";
import { AnimationSelector } from "./components/animation-selector/AnimationSelector";
import { SalesCard } from "./components/sales-card/SalesCard";

function App() {
  return (
    <>
      <div className="mb-4">
        <h1 className="m-0">Context Container</h1>
        <p className="m-0">Best Combo: Header: V2 | Content: V3. Slide-UP</p>
      </div>
      <AnimationSelector />
      <div className="flex wrap gap-4">
        <div className="flex-1">
          <SalesCard />
        </div>
        <div className="flex-1">
          <SalesCard />
        </div>
      </div>
    </>
  );
}

export default App;
