# UniPass — University Events Platform

A web app for purchasing tickets and booking stalls at university events (government & private universities). Only verified students and lecturers can make bookings using their university-issued ID.

---

## Project Structure

```
unipass/
├── public/
│   └── index.html              # HTML shell
├── src/
│   ├── index.js                # React entry point
│   ├── App.jsx                 # Root component — wires all pages & modal
│   │
│   ├── styles/
│   │   └── globals.css         # Design tokens (CSS variables) + shared styles
│   │
│   ├── data/
│   │   └── events.js           # Mock event data, ticket types, filter options
│   │
│   ├── hooks/
│   │   └── useBooking.js       # Custom hook — all booking modal state & logic
│   │
│   ├── components/
│   │   ├── Navbar.jsx          # Top navigation bar
│   │   ├── Navbar.css
│   │   ├── EventCard.jsx       # Single event card (used in grid)
│   │   ├── EventCard.css
│   │   ├── BookingModal.jsx    # Full booking modal (ticket + stall + ID verify)
│   │   └── BookingModal.css
│   │
│   └── pages/
│       ├── EventsPage.jsx      # Browse & filter events (hero + stats + grid)
│       ├── EventsPage.css
│       ├── MyTicketsPage.jsx   # User's confirmed bookings table
│       ├── AdminPage.jsx       # Admin dashboard — KPIs + event management table
│       └── AdminPage.css
│
└── package.json
```

---

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

---

## Features

| Feature | Status |
|---|---|
| Browse events (gov & private universities) | ✅ |
| Filter by type / category | ✅ |
| Ticket purchase with General / VIP tiers | ✅ |
| Stall booking with visual seat grid | ✅ |
| Student / Lecturer ID verification step | ✅ |
| My Tickets — booking history | ✅ |
| Admin dashboard | ✅ |

---

## Next Steps (Backend)

- **Authentication** — JWT login tied to university ID
- **API** — Node.js + Express REST API
- **Database** — PostgreSQL: `universities`, `events`, `users`, `tickets`, `stalls`
- **ID Verification** — Connect to university registrar APIs
- **Payments** — PayHere (LK) or Stripe integration
- **QR Tickets** — Generate scannable QR per booking
- **Email** — Booking confirmation emails via SendGrid / Nodemailer
