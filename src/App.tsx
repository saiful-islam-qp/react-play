import "./App.css";
import { AnimationSelector } from "./components/animation-selector/AnimationSelector";
import { SalesCard } from "./components/sales-card/SalesCard";

function App() {
  return (
    <div>
      <div className="mb-4 sticky top-0 z-20 bg-[#f9f9f9] p-4 border-b border-gray-300">
        <h1 className="m-0 font-semibold">Drill Down</h1>
        <p className="m-0">
          The Drilldown component presents hierarchical or progressive detail
          views within a confined container using animated transitions.
        </p>
      </div>
      <div className="p-4">
        <h2 className="text-lg font-bold">When To Use</h2>
        <ul className="mb-4 list-disc list-inside">
          <li>
            Exploring hierarchical datasets (regions → countries → cities)
          </li>
          <li>
            Progressive disclosure of details (overview → details → metrics)
          </li>
          <li>
            Replacing separate modal/page navigation with inline transitions
          </li>
          <li>Mobile-friendly stacked navigation</li>
        </ul>
      </div>
      <AnimationSelector />
      <div className="grid grid-cols md:grid-cols-2 gap-4 px-4">
        <SalesCard />
        <SalesCard />
      </div>
      <div className="p-4">
        <h2 className="text-lg font-bold mt-8 mb-2">Usages</h2>
        <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm">
          <code>
            {`import { Drilldown } from "./components/Drilldown";
import { ChevronLeftIcon } from "lucide-react";

export const SalesCard: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [titles, setTitles] = useState(["Sales by region"]);

  const toggle = (data?: unknown): void => {
    if (data && typeof data === "string") {
      setTitles([...titles, data]);
      setIsOpen(true);
    } else {
      setTitles(["Sales by region"]);
      setIsOpen(false);
    }
  };

  return (
    <Drilldown
      isOpen={isOpen}
      header={(ref) => (
        <div
          ref={ref}
          onClick={toggle}
          className="absolute top-3 left-4 z-10 flex items-center gap-4 cursor-pointer"
        >
          {isOpen && (
            <>
              <ChevronLeftIcon size={16} />
              {titles.map((t) => (
                <React.Fragment key={t}>
                  {<h3 className="text-md font-medium text-gray-800">{t}</h3>}
                </React.Fragment>
              ))}
            </>
          )}
        </div>
      )}
    >
      {isOpen ? (
        <SalesDetails />
      ) : (
        <div className={styles.container}>
          <h2 className={styles.title}>Sales by region</h2>
          <div className={styles.content}>
            <ColumnChart handler={toggle} />
          </div>
        </div>
      )}
    </Drilldown>
  );
};`}
          </code>
        </pre>
      </div>
    </div>
  );
}

export default App;
