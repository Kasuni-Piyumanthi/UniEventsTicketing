// src/components/BookingModal.jsx
import { TICKET_TYPES, STALL_TYPES } from "../data/events";
import "./BookingModal.css";

export default function BookingModal({
  event,
  modalTab, switchTab,
  step, setStep,
  qty, updateQty,
  selectedStall, setSelectedStall,
  stallType, setStallType,
  form, updateForm,
  totalTicketCost,
  canProceed, confirm,
  onClose, showToast,
}) {
  const stallArray = Array.from({ length: event.stalls }, (_, i) => i + 1);

  const handleNext = () => {
    if (step === 1) {
      if (!canProceed()) {
        showToast(
          modalTab === "stall"
            ? "⚠️ Please select a stall first"
            : "⚠️ Select at least 1 ticket"
        );
        return;
      }
      setStep(2);
    } else {
      const result = confirm();
      if (result === "missing_fields") showToast("⚠️ Please fill all required fields");
    }
  };

  return (
    <div className="overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal">

        {/* Header */}
        <div className="modal-header">
          <div>
            <div className="modal-uni">{event.uni}</div>
            <div className="modal-title">{event.emoji} {event.name}</div>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        {/* Body */}
        <div className="modal-body">

          {/* Tab switcher */}
          <div className="tab-group">
            <button className={`tab-btn ${modalTab === "ticket" ? "active" : ""}`} onClick={() => switchTab("ticket")}>🎫 Buy Ticket</button>
            <button className={`tab-btn ${modalTab === "stall"  ? "active" : ""}`} onClick={() => switchTab("stall")}>🏪 Book Stall</button>
          </div>

          {/* ── Step 1: Ticket ── */}
          {step === 1 && modalTab === "ticket" && (
            <TicketStep event={event} qty={qty} updateQty={updateQty} totalTicketCost={totalTicketCost} />
          )}

          {/* ── Step 1: Stall ── */}
          {step === 1 && modalTab === "stall" && (
            <StallStep
              event={event}
              stallArray={stallArray}
              selectedStall={selectedStall}
              setSelectedStall={setSelectedStall}
              stallType={stallType}
              setStallType={setStallType}
            />
          )}

          {/* ── Step 2: ID Verification ── */}
          {step === 2 && (
            <VerifyStep
              form={form}
              updateForm={updateForm}
              modalTab={modalTab}
              selectedStall={selectedStall}
              totalTicketCost={totalTicketCost}
              event={event}
            />
          )}
        </div>

        {/* Footer */}
        <div className="modal-footer">
          {step === 2 && (
            <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => setStep(1)}>
              ← Back
            </button>
          )}
          <button className="btn btn-primary" style={{ flex: 2 }} onClick={handleNext}>
            {step === 1 ? "Continue →" : "Confirm & Pay"}
          </button>
        </div>

      </div>
    </div>
  );
}

/* ─────────────────────────────────────────── */
/*  Sub-sections                               */
/* ─────────────────────────────────────────── */

function TicketStep({ event, qty, updateQty, totalTicketCost }) {
  return (
    <>
      <div className="event-info-row">
        <span>📅 {event.date} · {event.time}</span>
        <span>📍 {event.location}</span>
      </div>

      {TICKET_TYPES.map((tt) => (
        <div key={tt.id} className="ticket-card">
          <div className="ticket-icon">🎟️</div>
          <div className="ticket-info">
            <div className="ticket-name">{tt.label}</div>
            <div className="ticket-sub">{tt.desc}</div>
          </div>
          <div className="ticket-right">
            <div className="ticket-price">
              {event.price === 0
                ? "Free"
                : `LKR ${Math.round(event.price * tt.priceMultiplier)}`}
            </div>
            <div className="qty-control">
              <button className="qty-btn" onClick={() => updateQty(tt.id, -1)}>−</button>
              <span className="qty-val">{qty[tt.id]}</span>
              <button className="qty-btn" onClick={() => updateQty(tt.id, +1)}>+</button>
            </div>
          </div>
        </div>
      ))}

      <div className="divider" />
      <div className="summary-row"><span>General ({qty.general}×)</span><span>LKR {qty.general * event.price}</span></div>
      <div className="summary-row"><span>VIP ({qty.vip}×)</span><span>LKR {Math.round(qty.vip * event.price * 2.5)}</span></div>
      <div className="summary-row total"><span>Total</span><span>LKR {totalTicketCost}</span></div>
    </>
  );
}

function StallStep({ event, stallArray, selectedStall, setSelectedStall, stallType, setStallType }) {
  return (
    <>
      <p className="stall-intro">
        Select your stall position. Available for Leo / Rotaract clubs and small businesses.
      </p>

      <div className="form-group">
        <label className="form-label">Booking Type</label>
        <select className="form-select" value={stallType} onChange={(e) => setStallType(e.target.value)}>
          {STALL_TYPES.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
      </div>

      <label className="form-label">Choose Stall (tap to select)</label>
      <div className="stall-grid">
        {stallArray.map((n) => {
          const taken = event.stallsTaken.includes(n);
          return (
            <div
              key={n}
              className={`stall-cell ${taken ? "taken" : selectedStall === n ? "selected" : "available"}`}
              onClick={() => !taken && setSelectedStall(n)}
            >
              {taken ? "✗" : `#${n}`}
            </div>
          );
        })}
      </div>

      <div className="stall-legend">
        <div className="legend-item"><div className="legend-dot selected-dot" /> Selected</div>
        <div className="legend-item"><div className="legend-dot taken-dot" />    Taken</div>
        <div className="legend-item"><div className="legend-dot avail-dot" />    Available</div>
      </div>

      {selectedStall && (
        <div className="stall-selected-notice">
          ✅ Stall #{selectedStall} selected — <strong>LKR {event.stallPrice.toLocaleString()}</strong>
        </div>
      )}
    </>
  );
}

function VerifyStep({ form, updateForm, modalTab, selectedStall, totalTicketCost, event }) {
  return (
    <>
      <div className="verify-box">
        <div className="verify-icon">🪪</div>
        <p>Verify your identity with your university-issued ID. Only registered students and lecturers can make bookings.</p>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">ID Type</label>
          <select className="form-select" value={form.idType} onChange={(e) => updateForm("idType", e.target.value)}>
            <option value="student">Student ID</option>
            <option value="lecturer">Lecturer ID</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">ID Number *</label>
          <input className="form-input" placeholder="e.g. SC/2021/001" value={form.idNum} onChange={(e) => updateForm("idNum", e.target.value)} />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Full Name *</label>
        <input className="form-input" placeholder="Your full name" value={form.name} onChange={(e) => updateForm("name", e.target.value)} />
      </div>

      <div className="form-group">
        <label className="form-label">Email *</label>
        <input className="form-input" type="email" placeholder="university email" value={form.email} onChange={(e) => updateForm("email", e.target.value)} />
      </div>

      {modalTab === "stall" && (
        <div className="form-group">
          <label className="form-label">Organization / Club Name *</label>
          <input className="form-input" placeholder="e.g. Leo Club of Colombo" value={form.org} onChange={(e) => updateForm("org", e.target.value)} />
        </div>
      )}

      <div className="divider" />
      <div className="summary-row">
        <span>{modalTab === "ticket" ? "Tickets" : `Stall #${selectedStall}`}</span>
        <span>{modalTab === "ticket" ? `LKR ${totalTicketCost}` : `LKR ${event.stallPrice}`}</span>
      </div>
      <div className="summary-row total">
        <span>Total Payable</span>
        <span>{modalTab === "ticket" ? `LKR ${totalTicketCost}` : `LKR ${event.stallPrice}`}</span>
      </div>
    </>
  );
}
