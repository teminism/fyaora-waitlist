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

        <thead>

          <tr>

            <th className="checkbox-column">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={onSelectAll}
              />
            </th>

            {columns.map((column) => (
              <th
                key={column.key}
                onClick={() => onSort(column.key)}
                className="sortable"
              >
                <div className="th-content">
                  {column.label}
                  {renderSortIcon(column.key)}
                </div>
              </th>
            ))}

            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {providers.map((provider) => (
            <tr key={provider.id}>

              <td>
                <input
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
                  className="edit-button"
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
        <div className="empty-state">
          No service providers found.
        </div>
      )}

    </div>
  );
}

export default ProviderTable;