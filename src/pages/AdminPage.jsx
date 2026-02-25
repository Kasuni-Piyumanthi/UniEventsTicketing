// src/pages/AdminPage.jsx
import { EVENTS } from "../data/events";
import "./AdminPage.css";

const STATS = [
  { label: "Total Revenue", val: "LKR 284,500", icon: "💰" },
  { label: "Tickets Sold",  val: "951",          icon: "🎫" },
  { label: "Stalls Booked", val: "67",            icon: "🏪" },
  { label: "Active Events", val: "6",             icon: "🎉" },
];

function statusInfo(event) {
  const ratio = event.sold / event.tickets;
  if (event.sold >= event.tickets) return { cls: "dot-red",    label: "Sold Out"     };
  if (ratio > 0.7)                  return { cls: "dot-yellow", label: "Filling Fast" };
  return                                   { cls: "dot-green",  label: "Available"    };
}

export default function AdminPage({ onViewEvent }) {
  return (
    <div className="main">
      <div className="section-header">
        <div className="section-title">Event Management Dashboard</div>
        <button className="btn btn-primary btn-sm">+ New Event</button>
      </div>

      {/* KPI cards */}
      <div className="admin-stats">
        {STATS.map((s) => (
          <div key={s.label} className="admin-stat-card">
            <div className="admin-stat-icon">{s.icon}</div>
            <div className="admin-stat-val">{s.val}</div>
            <div className="admin-stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Events table */}
      <div className="panel">
        <div className="panel-header">
          <div className="panel-title">All Events</div>
        </div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Event</th>
              <th>University</th>
              <th>Type</th>
              <th>Tickets</th>
              <th>Stalls</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {EVENTS.map((e) => {
              const { cls, label } = statusInfo(e);
              return (
                <tr key={e.id}>
                  <td style={{ fontWeight: 500 }}>{e.emoji} {e.name}</td>
                  <td style={{ color: "var(--muted)", fontSize: "0.82rem" }}>{e.uni}</td>
                  <td>
                    <span className={`type-badge ${e.type === "gov" ? "badge-gov" : "badge-priv"}`}>
                      {e.type === "gov" ? "Gov" : "Private"}
                    </span>
                  </td>
                  <td>{e.sold}/{e.tickets}</td>
                  <td>{e.stallsTaken.length}/{e.stalls}</td>
                  <td>
                    <span className="status-dot">
                      <span className={`dot ${cls}`} />
                      {label}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-outline btn-sm" onClick={() => onViewEvent(e)}>
                      View
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
