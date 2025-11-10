import "./App.css";
import { AnimationSelector } from "./components/animation-selector/AnimationSelector";
import { SalesCard } from "./components/sales-card/SalesCard";
import { SideBar } from "./components/sidebar/Sidebar";

function App() {
  return (
    <div className="container mx-auto md:p-4">
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
        <div className="col-span-4">
          <div className="mb-4 sticky top-0 z-20 p-4 bg-(--main-bg-color)/80 backdrop-blur-md">
            <h1 className="m-0 font-semibold">Drill Down</h1>
            <p className="m-0">
              The Drilldown component presents hierarchical or progressive
              detail views within a confined container using animated
              transitions.
            </p>
            <AnimationSelector />
          </div>
          <div className="p-4" id="overview">
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
          <div className=" px-4">
            <SalesCard />
          </div>
          <div className="p-4">
            <h2 className="text-lg font-bold mt-8 mb-2" id="usage">
              Usages
            </h2>
            <pre className="bg-white dark:bg-(--main-bg-color) p-4 rounded-md overflow-x-auto text-sm border border-(--border-color)">
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
        <div className="hidden lg:block lg:col-span-2">
          <SideBar />
        </div>
      </div>
    </div>
  );
}

export default App;
