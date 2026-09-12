import { useEffect, useRef } from "react";
import { X } from "lucide-react";

function ProviderModal({
  provider,
  onClose,
}) {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!provider) return undefined;

    const previousFocus = document.activeElement;
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus();
    };
  }, [onClose, provider]);

  if (!provider) return null;

  return (
    <div
      className="modal-overlay"
      role="presentation"
      onClick={onClose}
    >

      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="provider-modal-title"
        onClick={(e) => e.stopPropagation()}
      >

        <div className="modal-header">
          <h3 id="provider-modal-title">User Details</h3>

          <button
            ref={closeButtonRef}
            type="button"
            aria-label="Close provider details"
            onClick={onClose}
          >
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
            <label htmlFor="internal-notes">Internal Notes</label>

            <textarea
              id="internal-notes"
              placeholder="Add internal notes..."
            />
          </div>

        </div>

        <div className="modal-actions">

          <button
            type="button"
            className="onboard-button"
            onClick={onClose}
          >
            Onboard
          </button>

          <button
            type="button"
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