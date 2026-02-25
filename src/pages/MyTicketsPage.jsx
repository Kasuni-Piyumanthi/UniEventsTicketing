// src/pages/MyTicketsPage.jsx

export default function MyTicketsPage({ tickets, onBrowse }) {
  return (
    <div className="main">
      <div className="section-header">
        <div className="section-title">My Bookings</div>
      </div>

      {tickets.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🎟️</div>
          <p>No bookings yet. Browse events and book your tickets!</p>
          <button className="btn btn-primary" style={{ marginTop: "1rem" }} onClick={onBrowse}>
            Browse Events
          </button>
        </div>
      ) : (
        <div className="panel">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Event</th>
                <th>Type</th>
                <th>Details</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((t) => (
                <tr key={t.id}>
                  <td style={{ fontWeight: 500 }}>{t.event}</td>
                  <td>
                    <span
                      style={{
                        background: t.type === "Ticket"
                          ? "rgba(200,245,96,0.12)"
                          : "rgba(95,111,255,0.12)",
                        color: t.type === "Ticket"
                          ? "var(--accent)"
                          : "var(--accent2)",
                        padding: "0.2rem 0.6rem",
                        borderRadius: "6px",
                        fontSize: "0.75rem",
                      }}
                    >
                      {t.type}
                    </span>
                  </td>
                  <td style={{ color: "var(--muted)", fontSize: "0.85rem" }}>{t.detail}</td>
                  <td style={{ color: "var(--muted)" }}>{t.date}</td>
                  <td style={{ fontWeight: 600 }}>{t.amount}</td>
                  <td>
                    <span className="status-dot">
                      <span className="dot dot-green" />
                      Confirmed
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
