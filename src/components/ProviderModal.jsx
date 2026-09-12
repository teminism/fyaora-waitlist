import { X } from "lucide-react";

function ProviderModal({
  provider,
  onClose,
}) {
  if (!provider) return null;

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >

      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
      >

        <div className="modal-header">
          <h3>User Details</h3>

          <button onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-content">

          <h4>{provider.email}</h4>

          <div className="detail-row">
            <strong>Contact Information</strong>
          </div>

          <div className="detail-row">
            <span>Email</span>
            <span>{provider.email}</span>
          </div>

          <div className="detail-row">
            <span>Phone</span>
            <span>{provider.phone}</span>
          </div>

          <div className="detail-row">
            <span>Postcode</span>
            <span>{provider.postcode}</span>
          </div>

          <div className="detail-row">
            <span>Vendor Type</span>
            <span>{provider.vendorType}</span>
          </div>

          <div className="detail-row">
            <span>Service</span>
            <span>{provider.serviceOffering}</span>
          </div>

          <div className="detail-row">
            <span>Signup Date</span>
            <span>{provider.signupDate}</span>
          </div>

          <div className="detail-row">
            <span>Status</span>
            <span>{provider.status}</span>
          </div>

          <div className="notes">
            <strong>Internal Notes</strong>

            <textarea
              placeholder="Add internal notes..."
            />
          </div>

        </div>

        <div className="modal-actions">

          <button
            className="onboard-button"
            onClick={onClose}
          >
            Onboard
          </button>

          <button
            className="reject-button"
            onClick={onClose}
          >
            Reject
          </button>

        </div>

      </div>

    </div>
  );
}

export default ProviderModal;