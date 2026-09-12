import { useMemo, useState } from "react";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import ProviderTable from "./components/ProviderTable";
import ProviderModal from "./components/ProviderModal";

import { providers as providerData } from "./data/providers";

function App() {
  const [providers] = useState(providerData);

  const [filters, setFilters] = useState({
    postcode: "",
    status: [],
    startDate: "",
    endDate: "",
    vendorType: [],
    serviceOffering: [],
  });

  const [appliedFilters, setAppliedFilters] =
    useState(filters);

  const [search, setSearch] = useState("");

  const [sortConfig, setSortConfig] = useState({
    key: "signupDate",
    direction: "desc",
  });

  const [currentPage, setCurrentPage] = useState(1);

  const [selectedIds, setSelectedIds] = useState([]);

  const [toast, setToast] = useState("");

  const [selectedProvider, setSelectedProvider] =
    useState(null);

  const itemsPerPage = 10;

  /*
   * FILTERING
   */
  const filteredProviders = useMemo(() => {
    let result = [...providers];

    const {
      postcode,
      status,
      startDate,
      endDate,
      vendorType,
      serviceOffering,
    } = appliedFilters;

    // Postcode
    if (postcode.trim()) {
      result = result.filter((provider) =>
        provider.postcode
          .toLowerCase()
          .includes(postcode.trim().toLowerCase())
      );
    }

    // Status
    if (status.length > 0) {
      result = result.filter((provider) =>
        status.includes(provider.status)
      );
    }

    // Vendor type
    if (vendorType.length > 0) {
      result = result.filter((provider) =>
        vendorType.includes(provider.vendorType)
      );
    }

    // Service offering
    if (serviceOffering.length > 0) {
      result = result.filter((provider) =>
        serviceOffering.includes(
          provider.serviceOffering
        )
      );
    }

    // Start date
    if (startDate) {
      result = result.filter(
        (provider) =>
          provider.signupDate >= startDate
      );
    }

    // End date
    if (endDate) {
      result = result.filter(
        (provider) =>
          provider.signupDate <= endDate
      );
    }

    /*
     * SEARCH
     *
     * Search across every column.
     */
    if (search.trim()) {
      const query = search.trim().toLowerCase();

      result = result.filter((provider) =>
        Object.values(provider).some((value) =>
          String(value)
            .toLowerCase()
            .includes(query)
        )
      );
    }

    return result;
  }, [
    providers,
    appliedFilters,
    search,
  ]);

  /*
   * SORTING
   */
  const sortedProviders = useMemo(() => {
    const result = [...filteredProviders];

    result.sort((a, b) => {
      const aValue = String(
        a[sortConfig.key] ?? ""
      ).toLowerCase();

      const bValue = String(
        b[sortConfig.key] ?? ""
      ).toLowerCase();

      if (aValue < bValue) {
        return sortConfig.direction === "asc"
          ? -1
          : 1;
      }

      if (aValue > bValue) {
        return sortConfig.direction === "asc"
          ? 1
          : -1;
      }

      return 0;
    });

    return result;
  }, [
    filteredProviders,
    sortConfig,
  ]);

  /*
   * PAGINATION
   */
  const totalPages = Math.max(
    1,
    Math.ceil(
      sortedProviders.length / itemsPerPage
    )
  );

  const paginatedProviders =
    sortedProviders.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );

  /*
   * SORT HANDLER
   */
  const handleSort = (key) => {
    setSortConfig((previous) => ({
      key,
      direction:
        previous.key === key &&
        previous.direction === "asc"
          ? "desc"
          : "asc",
    }));

    setCurrentPage(1);
  };

  /*
   * SELECT ONE
   */
  const handleSelect = (id) => {
    setSelectedIds((previous) =>
      previous.includes(id)
        ? previous.filter(
            (selectedId) => selectedId !== id
          )
        : [...previous, id]
    );
  };

  /*
   * SELECT ALL
   */
  const handleSelectAll = () => {
    const pageIds = paginatedProviders.map(
      (provider) => provider.id
    );

    const allSelected = pageIds.every((id) =>
      selectedIds.includes(id)
    );

    if (allSelected) {
      setSelectedIds((previous) =>
        previous.filter(
          (id) => !pageIds.includes(id)
        )
      );
    } else {
      setSelectedIds((previous) => [
        ...new Set([
          ...previous,
          ...pageIds,
        ]),
      ]);
    }
  };

  /*
   * APPLY FILTERS
   */
  const handleApplyFilters = () => {
    setAppliedFilters({
      ...filters,
      postcode: filters.postcode.trim(),
    });

    setCurrentPage(1);

    setToast("Filters applied successfully");

    setTimeout(() => {
      setToast("");
    }, 2500);
  };

  /*
   * CLEAR FILTERS
   */
  const handleClearFilters = () => {
    const emptyFilters = {
      postcode: "",
      status: [],
      startDate: "",
      endDate: "",
      vendorType: [],
      serviceOffering: [],
    };

    setFilters(emptyFilters);
    setAppliedFilters(emptyFilters);
    setSearch("");
    setCurrentPage(1);
  };

  return (
    <div className="app">

      <Header />

      <div className="page-layout">

        <Sidebar
          filters={filters}
          setFilters={setFilters}
          onApply={handleApplyFilters}
          onClear={handleClearFilters}
        />

        <main
          className="main-content"
          aria-labelledby="page-title"
        >

          <div className="page-title">
            <div>
              <h1 id="page-title">Waitlist</h1>

              <div className="tabs" role="tablist" aria-label="Waitlist views">
                <button
                  className="active-tab"
                  type="button"
                  role="tab"
                  aria-selected="true"
                >
                  Service Providers
                </button>

                <button
                  type="button"
                  role="tab"
                  aria-selected="false"
                  disabled
                >
                  Customers
                </button>
              </div>
            </div>

            <input
              className="search-input"
              type="text"
              aria-label="Search providers"
              placeholder="Search providers"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setCurrentPage(1);
                }
              }}
            />
          </div>

          <ProviderTable
            providers={paginatedProviders}
            sortConfig={sortConfig}
            onSort={handleSort}
            selectedIds={selectedIds}
            onSelect={handleSelect}
            onSelectAll={handleSelectAll}
            onEdit={setSelectedProvider}
          />

          <nav
            className="pagination"
            aria-label="Provider pages"
          >

            <button
              type="button"
              aria-label="Previous page"
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage(
                  (page) => page - 1
                )
              }
            >
              ‹
            </button>

            {Array.from(
              { length: totalPages },
              (_, index) => index + 1
            ).map((page) => (
              <button
                key={page}
                type="button"
                aria-label={`Go to page ${page}`}
                aria-current={
                  currentPage === page
                    ? "page"
                    : undefined
                }
                className={
                  currentPage === page
                    ? "active-page"
                    : ""
                }
                onClick={() =>
                  setCurrentPage(page)
                }
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              aria-label="Next page"
              disabled={
                currentPage === totalPages
              }
              onClick={() =>
                setCurrentPage(
                  (page) => page + 1
                )
              }
            >
              ›
            </button>

          </nav>

        </main>

      </div>

      <ProviderModal
        provider={selectedProvider}
        onClose={() =>
          setSelectedProvider(null)
        }
      />

      {toast && (
        <div
          className="toast"
          role="status"
          aria-live="polite"
        >
          {toast}
        </div>
      )}

    </div>
  );
}

export default App;