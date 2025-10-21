import "./App.css";
import { CardContainer } from "./components/CardContainer";
import { SalesCard } from "./components/sales-card/SalesCard";
import { SalesDetails } from "./components/sales-card/SalesDetails";
import { SpringCard } from "./components/SpringCard";

function App() {
  return (
    <>
      <h1>Custom Component</h1>
      <div className="card flex wrap gap-4" style={{ marginBottom: "32px" }}>
        <div className="flex-1">
          <CardContainer MainNode={SalesCard} DetailsNode={SalesDetails} />
        </div>
        <div className="flex-1">
          <CardContainer MainNode={SalesCard} DetailsNode={SalesDetails} />
        </div>
      </div>
      <h1>Custom Component with React Spring</h1>
      <div className="card flex wrap gap-4">
        <div className="flex-1">
          <SpringCard MainNode={SalesCard} DetailsNode={SalesDetails} />
        </div>
        <div className="flex-1">
          <SpringCard MainNode={SalesCard} DetailsNode={SalesDetails} />
        </div>
      </div>
    </>
  );
}

export default App;
