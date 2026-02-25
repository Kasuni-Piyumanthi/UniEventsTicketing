// src/App.jsx
// Root component — wires pages, modal, and state together

import { useState } from "react";
import Navbar       from "./components/Navbar";
import BookingModal from "./components/BookingModal";
import EventsPage   from "./pages/EventsPage";
import MyTicketsPage from "./pages/MyTicketsPage";
import AdminPage    from "./pages/AdminPage";
import { useBooking } from "./hooks/useBooking";
import "./styles/globals.css";

export default function App() {
  const [tab, setTab]         = useState("events");
  const [myTickets, setMyTickets] = useState([]);
  const [toast, setToast]     = useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const onBookingConfirmed = (booking) => {
    setMyTickets((prev) => [booking, ...prev]);
    showToast("✅ Booking confirmed! Check My Tickets.");
  };

  const booking = useBooking(onBookingConfirmed);

  return (
    <div className="app">
      <Navbar activeTab={tab} onTabChange={setTab} />

      {tab === "events" && (
        <EventsPage onBookEvent={booking.openModal} />
      )}

      {tab === "my-tickets" && (
        <MyTicketsPage
          tickets={myTickets}
          onBrowse={() => setTab("events")}
        />
      )}

      {tab === "admin" && (
        <AdminPage onViewEvent={booking.openModal} />
      )}

      {/* Booking modal — rendered on top of everything */}
      {booking.selectedEvent && (
        <BookingModal
          event={booking.selectedEvent}
          modalTab={booking.modalTab}
          switchTab={booking.switchTab}
          step={booking.step}
          setStep={booking.setStep}
          qty={booking.qty}
          updateQty={booking.updateQty}
          selectedStall={booking.selectedStall}
          setSelectedStall={booking.setSelectedStall}
          stallType={booking.stallType}
          setStallType={booking.setStallType}
          form={booking.form}
          updateForm={booking.updateForm}
          totalTicketCost={booking.totalTicketCost}
          canProceed={booking.canProceed}
          confirm={booking.confirm}
          onClose={booking.closeModal}
          showToast={showToast}
        />
      )}

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
