import "./App.css";
import { CardContainerNew } from "./components/CardContainer2";
import { SalesCard } from "./components/sales-card/SalesCard";
import { SalesDetails } from "./components/sales-card/SalesDetails";

function App() {
  return (
    <>
      <h1>Custom Component with React Spring</h1>
      <div className="card flex wrap gap-4">
        <div className="flex-1">
          <CardContainerNew MainNode={SalesCard} DetailsNode={SalesDetails} />
        </div>
        <div className="flex-1">
          <CardContainerNew MainNode={SalesCard} DetailsNode={SalesDetails} />
        </div>
      </div>
    </>
  );
}

export default App;
