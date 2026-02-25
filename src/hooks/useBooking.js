// src/hooks/useBooking.js
// Centralises all booking modal state and logic

import { useState } from "react";

export function useBooking(onConfirmed) {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalTab, setModalTab]           = useState("ticket"); // "ticket" | "stall"
  const [step, setStep]                   = useState(1);
  const [qty, setQty]                     = useState({ general: 1, vip: 0 });
  const [selectedStall, setSelectedStall] = useState(null);
  const [stallType, setStallType]         = useState("business");
  const [form, setForm] = useState({
    idType: "student",
    idNum: "",
    name: "",
    email: "",
    org: "",
  });

  // ── Derived ──────────────────────────────────────────────────
  const totalTicketCost = selectedEvent
    ? qty.general * selectedEvent.price +
      Math.round(qty.vip * selectedEvent.price * 2.5)
    : 0;

  // ── Actions ──────────────────────────────────────────────────
  const openModal = (event) => {
    setSelectedEvent(event);
    setStep(1);
    setQty({ general: 1, vip: 0 });
    setSelectedStall(null);
    setModalTab("ticket");
    setStallType("business");
    setForm({ idType: "student", idNum: "", name: "", email: "", org: "" });
  };

  const closeModal = () => setSelectedEvent(null);

  const switchTab = (tab) => {
    setModalTab(tab);
    setStep(1);
  };

  const updateQty = (id, delta) =>
    setQty((q) => ({ ...q, [id]: Math.max(0, q[id] + delta) }));

  const updateForm = (field, value) =>
    setForm((f) => ({ ...f, [field]: value }));

  const canProceed = () => {
    if (modalTab === "stall"  && !selectedStall)            return false;
    if (modalTab === "ticket" && qty.general + qty.vip < 1) return false;
    return true;
  };

  const confirm = () => {
    if (!form.idNum || !form.name || !form.email) return "missing_fields";

    const booking = {
      id:     Date.now(),
      event:  selectedEvent.name,
      type:   modalTab === "ticket" ? "Ticket" : "Stall",
      detail: modalTab === "ticket"
        ? `${qty.general} General, ${qty.vip} VIP`
        : `Stall #${selectedStall} (${stallType})`,
      date:   selectedEvent.date,
      amount: modalTab === "ticket"
        ? `LKR ${totalTicketCost}`
        : `LKR ${selectedEvent.stallPrice}`,
    };

    onConfirmed(booking);
    closeModal();
    return "ok";
  };

  return {
    // state
    selectedEvent, modalTab, step, qty, selectedStall,
    stallType, form, totalTicketCost,
    // actions
    openModal, closeModal, switchTab,
    setStep, updateQty, setSelectedStall, setStallType,
    updateForm, canProceed, confirm,
  };
}
