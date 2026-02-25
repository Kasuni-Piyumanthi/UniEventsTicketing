// src/components/Navbar.jsx
import "./Navbar.css";

const TABS = [
  { key: "events",     label: "🎫 Events"     },
  { key: "my-tickets", label: "🎟️ My Tickets" },
  { key: "admin",      label: "⚙️ Admin"       },
];

export default function Navbar({ activeTab, onTabChange }) {
  return (
    <nav className="nav">
      <div className="nav-logo">
        Uni<span>Pass</span>
      </div>

      {/* Desktop tabs */}
      <div className="nav-tabs desktop-only">
        {TABS.map((t) => (
          <button
            key={t.key}
            className={`nav-tab ${activeTab === t.key ? "active" : ""}`}
            onClick={() => onTabChange(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="nav-right">
        <div className="avatar">AS</div>
      </div>

      {/* Mobile tab bar (below nav) */}
      <div className="mobile-tabs">
        {TABS.map((t) => (
          <button
            key={t.key}
            className={`nav-tab ${activeTab === t.key ? "active" : ""}`}
            onClick={() => onTabChange(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
