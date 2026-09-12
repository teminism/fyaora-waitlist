import {
  ChevronDown,
  ChevronUp,
  Edit,
} from "lucide-react";

function ProviderTable({
  providers,
  sortConfig,
  onSort,
  selectedIds,
  onSelect,
  onSelectAll,
  onEdit,
}) {
  const columns = [
    {
      key: "email",
      label: "Email",
    },
    {
      key: "phone",
      label: "Phone Number",
    },
    {
      key: "postcode",
      label: "Postcode",
    },
    {
      key: "vendorType",
      label: "Vendor Type",
    },
    {
      key: "serviceOffering",
      label: "Service Offering",
    },
    {
      key: "signupDate",
      label: "Signup Date",
    },
    {
      key: "status",
      label: "Status",
    },
  ];

  const allSelected =
    providers.length > 0 &&
    providers.every((provider) =>
      selectedIds.includes(provider.id)
    );

  const renderSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return <ChevronDown size={13} />;
    }

    return sortConfig.direction === "asc"
      ? <ChevronUp size={13} />
      : <ChevronDown size={13} />;
  };

  return (
    <div className="table-container">

      <table>

        <caption className="sr-only">
          Service provider waitlist
        </caption>

        <thead>

          <tr>

            <th
              className="checkbox-column"
              scope="col"
            >
              <input
                aria-label="Select all providers on this page"
                type="checkbox"
                checked={allSelected}
                onChange={onSelectAll}
              />
            </th>

            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                aria-sort={
                  sortConfig.key === column.key
                    ? sortConfig.direction === "asc"
                      ? "ascending"
                      : "descending"
                    : "none"
                }
                className="sortable"
              >
                <button
                  type="button"
                  className="sort-button"
                  aria-label={`Sort by ${column.label}`}
                  onClick={() => onSort(column.key)}
                >
                  <span>{column.label}</span>
                  {renderSortIcon(column.key)}
                </button>
              </th>
            ))}

            <th scope="col">Actions</th>

          </tr>

        </thead>

        <tbody>

          {providers.map((provider) => (
            <tr key={provider.id}>

              <td>
                <input
                  aria-label={`Select ${provider.email}`}
                  type="checkbox"
                  checked={selectedIds.includes(provider.id)}
                  onChange={() =>
                    onSelect(provider.id)
                  }
                />
              </td>

              <td>{provider.email}</td>

              <td>{provider.phone}</td>

              <td>{provider.postcode}</td>

              <td>{provider.vendorType}</td>

              <td>{provider.serviceOffering}</td>

              <td>{provider.signupDate}</td>

              <td>
                <span
                  className={`status ${
                    provider.status.toLowerCase()
                  }`}
                >
                  {provider.status}
                </span>
              </td>

              <td>
                <button
                  type="button"
                  className="edit-button"
                  aria-label={`View details for ${provider.email}`}
                  onClick={() => onEdit(provider)}
                >
                  <Edit size={15} />
                </button>
              </td>

            </tr>
          ))}

        </tbody>

      </table>

      {providers.length === 0 && (
        <div
          className="empty-state"
          role="status"
        >
          No service providers found.
        </div>
      )}

    </div>
  );
}

export default ProviderTable;