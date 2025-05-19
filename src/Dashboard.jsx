import { widgetLibrary } from "./widgetLibrary";
import { useState, useEffect } from "react";
import { renderChart } from "./ChartRender";

export default function Dashboard() {
  const [categories, setCategories] = useState(
    ["CWPP", "Registry"].map((key) => ({
      id: key.toLowerCase(),
      name: `${key} Dashboard`,
      widgets: widgetLibrary[key].slice(0, 1),
      expanded: false,
    }))
  );

  const [selectedWidgets, setSelectedWidgets] = useState({});
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Automatically select the first tab when dialog opens
  useEffect(() => {
    if (isDialogOpen && !activeTab) {
      const keys = Object.keys(widgetLibrary);
      if (keys.length > 0) setActiveTab(keys[0]);
    }
  }, [isDialogOpen, activeTab]);

  const handleWidgetToggle = (tab, widgetId) => {
    setSelectedWidgets((prev) => ({
      ...prev,
      [tab]: {
        ...prev[tab],
        [widgetId]: !prev[tab]?.[widgetId],
      },
    }));
  };

  const handleConfirmAdd = () => {
    const updated = [...categories];

    Object.entries(selectedWidgets).forEach(([tabKey, selection]) => {
      const tabWidgets = widgetLibrary[tabKey] || [];
      let category = updated.find((c) => c.id === tabKey.toLowerCase());

      if (!category) {
        category = {
          id: tabKey.toLowerCase(),
          name: `${tabKey} Dashboard`,
          widgets: [],
          expanded: false,
        };
        updated.push(category);
      }

      tabWidgets.forEach((w) => {
        if (selection[w.id] && !category.widgets.find((x) => x.id === w.id)) {
          category.widgets.push(w);
        }
      });
    });

    setCategories(updated);
    setDialogOpen(false);
    setSelectedWidgets({});
  };

  const removeWidget = (catId, widgetId) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === catId
          ? {
              ...cat,
              widgets: cat.widgets.filter((w) => w.id !== widgetId),
            }
          : cat
      )
    );
  };

  const filteredWidgets = (widgets) =>
    widgets.filter((w) =>
      w.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <header className="sticky top-0 z-40 bg-white bg-opacity-90 backdrop-blur-md shadow-md">
        <div className="container w-full mx-auto px-6 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-3xl font-semibold text-blue-800 select-none">
            Smart Dashboard
          </h1>
          <div className="flex items-center gap-3 w-1/2 justify-end">
            <input
              type="text"
              placeholder="Search widgets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow md:flex-none rounded-full border border-gray-300 px-5 py-2 text-gray-700 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition w-1/2"
            />
            <button
              onClick={handleRefresh}
              className="bg-gray-200 p-2 rounded-md cursor-pointer hover:bg-blue-300"
            >
              {" "}
              🔄
            </button>

            <button
              onClick={() => setDialogOpen(true)}
              className="rounded-md bg-blue-600 text-white px-5 py-2 font-semibold shadow-md hover:bg-blue-700 transition select-none whitespace-nowrap"
              title="Add Widget"
            >
              + Add Widget
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Dialog */}
        {isDialogOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
              <h2 className="text-lg font-semibold mb-4">
                Personalize your dashboard
              </h2>
              <div className="flex border-b mb-4">
                {Object.keys(widgetLibrary).map((key) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`flex-1 py-2 text-center border-b-2 ${
                      activeTab === key
                        ? "border-blue-600 font-semibold text-blue-700"
                        : "border-transparent text-gray-600 hover:text-blue-600"
                    } transition`}
                  >
                    {key}
                  </button>
                ))}
              </div>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {widgetLibrary[activeTab]?.map((widget) => (
                  <label
                    key={widget.id}
                    className="flex items-center gap-2 cursor-pointer select-none"
                  >
                    <input
                      type="checkbox"
                      checked={selectedWidgets[activeTab]?.[widget.id] || false}
                      onChange={() => handleWidgetToggle(activeTab, widget.id)}
                      className="w-5 h-5 rounded border-gray-300"
                    />
                    <span className="text-gray-700">{widget.name}</span>
                  </label>
                ))}
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={() => setDialogOpen(false)}
                  className="px-5 py-2 border rounded-md hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmAdd}
                  className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Dashboard Categories */}
        {categories.map((cat) => {
          const widgetsToShow = cat.expanded
            ? filteredWidgets(cat.widgets)
            : filteredWidgets(cat.widgets).slice(0, 2);

          if (searchTerm && widgetsToShow.length === 0) return null;

          return (
            <section key={cat.id} className="space-y-1">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-800">
                  {cat.name}
                </h2>
                {filteredWidgets(cat.widgets).length > 2 && (
                  <button
                    onClick={() =>
                      setCategories((prev) =>
                        prev.map((c) =>
                          c.id === cat.id ? { ...c, expanded: !c.expanded } : c
                        )
                      )
                    }
                    className="text-sm text-blue-600 hover:underline font-medium"
                  >
                    {cat.expanded ? "Show Less" : "Show More"}
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
                {widgetsToShow.map((w) => (
                  <article
                    key={w.id}
                    className="bg-white border rounded-lg shadow-sm p-2 relative hover:shadow-lg transition"
                  >
                    <button
                      onClick={() => removeWidget(cat.id, w.id)}
                      className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-2xl font-bold leading-none select-none cursor-pointer"
                      title="Remove widget"
                      aria-label={`Remove widget ${w.name}`}
                    >
                      ×
                    </button>
                    <h3 className="font-bold text-center text-lg mb-2 text-gray-900">
                      {w.name}
                    </h3>
                    <p className="text-sm text-gray-600 text-center mb-4">
                      {w.description}
                    </p>
                    {renderChart(w)}
                  </article>
                ))}

                {/* Add Widget Card */}
                {!searchTerm && (
                  <div
                    onClick={() => setDialogOpen(true)}
                    className="flex flex-col justify-center items-center cursor-pointer rounded-lg border-3  border-dashed border-blue-400 p-6 text-gray-500 text-center hover:bg-gray-100 transition select-none"
                    style={{ minHeight: 250 }}
                    title="Add more widgets"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        setDialogOpen(true);
                      }
                    }}
                  >
                    <svg
                      className="w-10 h-10 mb-3"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    <span className="font-medium">Add more widgets</span>
                  </div>
                )}
              </div>
            </section>
          );
        })}
      </main>
    </div>
  );
}
