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
    <aside className="sidebar">

      <div className="brand">
        <span className="brand-mark">gler</span>
        <span>Admin Panel</span>
      </div>

      <h3>User Management</h3>

      <div className="filter-section">

        <label>Postcode</label>

        <input
          type="text"
          placeholder="ZIP"
          value={filters.postcode}
          onChange={(e) =>
            handleChange("postcode", e.target.value)
          }
        />

      </div>

      <div className="filter-section">

        <label>Registration Status</label>

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

        <label>Date Registered</label>

        <div className="date-fields">

          <div>
            <span>Start</span>

            <input
              type="date"
              value={filters.startDate}
              onChange={(e) =>
                handleChange("startDate", e.target.value)
              }
            />
          </div>

          <div>
            <span>End</span>

            <input
              type="date"
              value={filters.endDate}
              onChange={(e) =>
                handleChange("endDate", e.target.value)
              }
            />
          </div>

        </div>

      </div>

      <div className="filter-section">

        <label>Vendor Type</label>

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

        <label>Service Offering</label>

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
          className="filter-button"
          onClick={onApply}
        >
          Filter
        </button>

        <button
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