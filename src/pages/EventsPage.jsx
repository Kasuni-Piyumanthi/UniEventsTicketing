// src/pages/EventsPage.jsx
import { useState } from "react";
import EventCard from "../components/EventCard";
import { EVENTS, FILTER_OPTIONS } from "../data/events";
import "./EventsPage.css";

export default function EventsPage({ onBookEvent }) {
  const [filter, setFilter] = useState("All");

  const filtered = EVENTS.filter((e) => {
    if (filter === "All")        return true;
    if (filter === "Government") return e.type === "gov";
    if (filter === "Private")    return e.type === "priv";
    if (filter === "Free")       return e.price === 0;
    return e.tags.includes(filter);
  });

  return (
    <>
      {/* Hero */}
      <div className="hero">
        <div className="hero-tag">🎓 For Students &amp; Lecturers Only</div>
        <h1>Your Campus.<br /><em>Your Events.</em></h1>
        <p>
          Book tickets and reserve stalls for events across government and private
          universities — verified by your Student or Lecturer ID.
        </p>
        <div className="hero-actions">
          <button className="btn btn-primary">Browse Events</button>
          <button className="btn btn-outline">How it Works</button>
        </div>
      </div>

      {/* Stats bar */}
      <div className="stats-bar">
        {[
          { val: "42",  label: "Active Events"  },
          { val: "18",  label: "Universities"   },
          { val: "1.2K", label: "Tickets Sold"  },
          { val: "340", label: "Stalls Booked"  },
        ].map((s) => (
          <div key={s.label} className="stat">
            <div className="stat-val">{s.val}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Event grid */}
      <div className="main">
        <div className="section-header">
          <div className="section-title">Upcoming Events</div>
          <span className="section-link">{EVENTS.length} events</span>
        </div>

        <div className="filter-row">
          {FILTER_OPTIONS.map((f) => (
            <button
              key={f}
              className={`filter-chip ${filter === f ? "active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="event-grid">
          {filtered.map((event) => (
            <EventCard key={event.id} event={event} onClick={() => onBookEvent(event)} />
          ))}
        </div>
      </div>
    </>
  );
}
