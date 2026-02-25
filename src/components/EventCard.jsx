// src/components/EventCard.jsx
import "./EventCard.css";

export default function EventCard({ event, onClick }) {
  const pct      = Math.round((event.sold / event.tickets) * 100);
  const isSoldOut = event.sold >= event.tickets;
  const stallsLeft = event.stalls - event.stallsTaken.length;

  const bgStyle = {
    background: `linear-gradient(135deg, ${
      event.type === "gov" ? "#1a1a3e, #0d0d25" : "#1e1a10, #150f00"
    })`,
  };

  return (
    <div className="event-card" onClick={onClick}>
      <div className="event-img" style={bgStyle}>
        <span className="event-emoji">{event.emoji}</span>
        <span
          className={`event-badge ${
            isSoldOut
              ? "badge-sold"
              : event.type === "gov"
              ? "badge-gov"
              : "badge-priv"
          }`}
        >
          {isSoldOut ? "Sold Out" : event.type === "gov" ? "Government" : "Private"}
        </span>
      </div>

      <div className="event-body">
        <div className="event-uni">{event.uni}</div>
        <div className="event-name">{event.name}</div>

        <div className="event-meta">
          <span>📅 {event.date}</span>
          <span>⏰ {event.time}</span>
        </div>
        <div className="event-meta">
          <span>📍 {event.location}</span>
        </div>

        <div className="event-footer">
          <div className="event-price">
            {event.price === 0 ? "Free" : `LKR ${event.price}`}
          </div>
          <div className="stall-count">🏪 {stallsLeft} stalls left</div>
        </div>

        <div className="availability-bar">
          <div
            className="availability-fill"
            style={{
              width: `${pct}%`,
              background: pct > 80 ? "var(--danger)" : "var(--accent)",
            }}
          />
        </div>
        <div className="availability-label">
          {pct}% filled · {event.tickets - event.sold} tickets left
        </div>
      </div>
    </div>
  );
}
