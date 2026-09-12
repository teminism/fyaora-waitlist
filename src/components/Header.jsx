import {
  Bell,
  MessageSquare,
  UserCircle,
} from "lucide-react";

function Header() {
  return (
    <header className="top-header">
      <div className="top-nav">
        <span>Service Dashboard</span>
        <span>Finance Forecast</span>
        <span className="active-nav">Human Resources</span>
        <span>Users</span>
        <span>Compliances & Verification</span>
      </div>

      <div className="header-actions">
        <Bell size={17} />
        <MessageSquare size={17} />

        <div className="profile">
          <UserCircle size={28} />

          <div>
            <strong>Max Smith</strong>
            <small>London, UK</small>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;