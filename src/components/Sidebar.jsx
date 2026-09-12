function Sidebar({
  filters,
  setFilters,
  onApply,
  onClear,
}) {
  const handleChange = (field, value) => {
    setFilters((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  return (
    <aside
      className="sidebar"
      aria-label="Provider filters"
    >

      <div className="brand">
        <span className="brand-mark">gler</span>
        <span>Admin Panel</span>
      </div>

      <h3>User Management</h3>

      <div className="filter-section">

        <label htmlFor="postcode">Postcode</label>

        <input
          id="postcode"
          type="text"
          placeholder="ZIP"
          value={filters.postcode}
          onChange={(e) =>
            handleChange("postcode", e.target.value)
          }
        />

      </div>

      <div className="filter-section">

        <span className="filter-label">Registration Status</span>

        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={filters.status.includes("Onboarded")}
            onChange={(e) => {
              const checked = e.target.checked;

              handleChange(
                "status",
                checked
                  ? [...filters.status, "Onboarded"]
                  : filters.status.filter(
                      (status) => status !== "Onboarded"
                    )
              );
            }}
          />

          Onboarded
        </label>

        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={filters.status.includes("Rejected")}
            onChange={(e) => {
              const checked = e.target.checked;

              handleChange(
                "status",
                checked
                  ? [...filters.status, "Rejected"]
                  : filters.status.filter(
                      (status) => status !== "Rejected"
                    )
              );
            }}
          />

          Rejected
        </label>

      </div>

      <div className="filter-section">

        <span className="filter-label">Date Registered</span>

        <div className="date-fields">

          <div>
            <span>Start</span>

            <input
              id="start-date"
              type="date"
              aria-label="Registration start date"
              value={filters.startDate}
              onChange={(e) =>
                handleChange("startDate", e.target.value)
              }
            />
          </div>

          <div>
            <span>End</span>

            <input
              id="end-date"
              type="date"
              aria-label="Registration end date"
              value={filters.endDate}
              onChange={(e) =>
                handleChange("endDate", e.target.value)
              }
            />
          </div>

        </div>

      </div>

      <div className="filter-section">

        <span className="filter-label">Vendor Type</span>

        {["Independent", "Company"].map((type) => (
          <label className="checkbox-label" key={type}>

            <input
              type="checkbox"
              checked={filters.vendorType.includes(type)}
              onChange={(e) => {
                const checked = e.target.checked;

                handleChange(
                  "vendorType",
                  checked
                    ? [...filters.vendorType, type]
                    : filters.vendorType.filter(
                        (item) => item !== type
                      )
                );
              }}
            />

            {type}

          </label>
        ))}

      </div>

      <div className="filter-section">

        <span className="filter-label">Service Offering</span>

        {[
          "Housekeeping",
          "Window Cleaning",
          "Car Valet",
        ].map((service) => (
          <label className="checkbox-label" key={service}>

            <input
              type="checkbox"
              checked={filters.serviceOffering.includes(service)}
              onChange={(e) => {
                const checked = e.target.checked;

                handleChange(
                  "serviceOffering",
                  checked
                    ? [
                        ...filters.serviceOffering,
                        service,
                      ]
                    : filters.serviceOffering.filter(
                        (item) => item !== service
                      )
                );
              }}
            />

            {service}

          </label>
        ))}

      </div>

      <div className="filter-buttons">

        <button
          type="button"
          className="filter-button"
          onClick={onApply}
        >
          Filter
        </button>

        <button
          type="button"
          className="clear-button"
          onClick={onClear}
        >
          Clear
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;