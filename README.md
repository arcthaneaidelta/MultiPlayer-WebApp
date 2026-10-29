# QUESTROOM — Interactive Multiplayer Game Platform Demo

An interactive, high-fidelity web application demo built for presenting a prospective client with a custom multiplayer stage-based game night platform.

---

## 1. Project Overview

QUESTROOM is an interactive prototype where groups of **2–5 participants** join a shared private game session via invitation link or scannable QR code. Each player connects on their mobile phone, tablet, or desktop.

Participants experience timed, multi-stage mysteries with **asymmetric clues**—each investigator sees different department records, timestamps, and witness statements. Solving each stage requires live discussion, clue cross-referencing, progressive hint deduction, and collective code submission.

### Key Interactive Areas
1. **Discover Experience (`/`)**: Product introduction, feature pillars, 3-step walkthrough, and instant demo launchers.
2. **Playable Mystery Game (`/play`)**:
   - Title: *"The Missing Hour"* (A museum's final hour of security feeds and archive telemetry has vanished).
   - **Multiplayer Lobby (`/play/lobby`)**: Room code, SVG QR code, player avatars, ready-up status, and simulated squad members.
   - **Active Game (`/play/game`)**: Timed countdown with pause/resume, individual clue dossiers, in-game party radio chatter, answer submission, progressive hint deduction, and stage transitions.
   - **Results Screen (`/play/results`)**: Final score breakdown, elapsed time, hint deductions, copyable summary, and confetti celebration.
3. **Admin Suite (`/admin`)**:
   - **Executive Dashboard (`/admin`)**: Key metrics (games, sessions, completion rates) and platform activity charts.
   - **Interactive Game & Clue Editor (`/admin/games/:id`)**: Edit stage narrative, timer durations, expected answers, progressive hints, scripted chat messages, and **clues for each player perspective (Player A through E)** in real time with local persistence!
   - **Session Monitoring (`/admin/sessions`)**: Filter sessions (Waiting, In Progress, Completed, Abandoned), inspect participant statuses, submitted answers, and live event timelines.
   - **Reports & Real CSV Export (`/admin/reports`)**: Date filters, aggregate difficulty analysis, and a **real, downloadable RFC 4180 CSV export**.
   - **Shopify Pipeline Architecture (`/admin/store-integration`)**: Visual 7-step blueprint illustrating verified webhook ingestion and session generation.
   - **Settings (`/admin/settings`)**: Preferences, default timers, and full sandbox state reset.
4. **Shopify Purchase Simulation (`/store-demo`)**:
   - Product detail page ($29 Standard, $49 Deluxe).
   - Simulated checkout modal with payment method.
   - Order confirmation with personal invite code, direct invitation URL, and a **realistic order-confirmation email preview**.
5. **Invitation Landing Experience (`/invite/:code`)**:
   - Dynamic landing screen for squad members who scan the QR code or click an invite link.

---

## 2. Reviewer Toolkit (Discreet Demo Controls)

When reviewing the playable game or lobby, click the **"Demo Controls"** pill in the bottom-right corner to:
- **Switch Player Perspective**: Toggle between Player A (Detective Hayes), Player B (Dr. Elena Vance), Player C (Marcus Chen), Player D (Sarah Jenkins), and Player E (Alex Rivera) to see how different clues assemble into the solution.
- **Simulate Player Joins/Leaves**: Add or remove simulated participants dynamically (up to 5).
- **Toggle Player Ready States**: Test how the lobby reacts as players ready up.
- **Timer Speedup**: Accelerate the countdown timer (1x, 2x, 5x speed).
- **Auto-Submit / Fast-Forward**: Instantly submit the correct stage answer to test the full walkthrough in under 2 minutes.

---

## 3. Technology Stack

- **Runtime & Framework**: React 19, TypeScript, Vite
- **Routing**: Client-side HashRouter with automated `404.html` SPA fallback (guarantees zero-404 refreshes on any static host)
- **Icons**: Lucide React
- **Celebration Effects**: Canvas Confetti
- **QR Engine**: Portable high-resolution SVG matrix generator (zero network/CDN dependency)
- **Data Persistence**: Resilient browser `localStorage` with factory-reset safeguards
- **CSV Engine**: Browser Blob RFC 4180 CSV generator with automated file download

---

## 4. Local Development & Build

### Prerequisites
- Node.js (v18 or higher recommended; v24 verified)
- `npm` or `pnpm`

### Installation
```bash
npm install
```

### Run Locally in Development Mode
```bash
npm run dev
```
Open `http://localhost:5173/` in your browser.

### Build Production Bundle
```bash
npm run build
```
This compiles the production assets into `dist/` and automatically creates `dist/404.html` for static hosting fallback.

### Preview Production Build
```bash
npm run preview
```

---

## 5. Deployment Instructions (Hatchable & Portable Static Hosting)

The application is completely self-contained with **zero Netlify-specific assumptions**, zero serverless functions, and zero paid third-party APIs.

### Deployment Configuration for Hatchable:
1. **Build Command**: `npm run build`
2. **Publish / Output Directory**: `dist`
3. **Node Version**: `20.x` or `24.x`
4. **Environment Variables**: None required.
5. **Routing / SPA Fallback**: The build automatically outputs both `index.html` and `404.html` in `dist/`. The client router uses Hash-based paths (`/#/play`, `/#/admin`, etc.), ensuring all direct URLs and page refreshes work cleanly on Hatchable or any static web host.

---

## 6. Simulated Features vs. Production Boundaries

To provide a client-ready walkthrough without requiring costly cloud databases or live payment merchant accounts, the following boundaries are isolated cleanly in service adapters (`src/services/`):

| Capability | Demo Behavior (Current Prototype) | Future Production Implementation |
| :--- | :--- | :--- |
| **Multiplayer Sync** | Locally simulated squad activity with believable roles & chat | Server-authoritative WebSocket / WebRTC engine (Node.js/Go or managed Ably/Pusher) |
| **Answer Validation** | Client-side normalized validation in `GameService.ts` | Server-side validation where answers are never exposed in browser payloads |
| **Timer Authority** | Client-side countdown with pause/resume and speedup | Authoritative server clock synchronized across all connected devices |
| **Shopify Integration** | Client-side checkout modal creating local order & session | HTTPS webhook endpoint verifying `X-Shopify-Hmac-Sha256` signatures with Redis idempotency |
| **Email Delivery** | High-fidelity email client preview modal with invite code | Transactional email provider (SendGrid, Postmark, AWS SES) with dynamic HTML templates |
| **Admin Authentication** | Simulated two-step login with mock 2FA authenticator bypass | Secure session cookies, OAuth 2.0 / SAML, and TOTP-backed two-factor authentication |
| **Session Storage** | Resilient browser `localStorage` with full reset capability | Persistent SQL/NoSQL database (PostgreSQL / Firestore) |

---

## 7. Recommended Production Architecture

When deploying the full commercial platform for live player audiences:
1. **Frontend**: The existing React + TypeScript client deployed via Hatchable or CDN.
2. **Real-Time Gateway**: A WebSocket cluster (Socket.io or FastAPI WebSockets) managing room state, presence, and chat broadcasts.
3. **Backend API**: A REST/GraphQL API for session lifecycle, stage progression, hint purchases, and admin management.
4. **Shopify Webhook Ingestion**: A dedicated webhook handler verifying Shopify HMAC signatures, recording order IDs into an idempotent ledger, and auto-provisioning game rooms.
5. **Database**: PostgreSQL with row-level security for game definitions, stage configurations, player telemetry, and order links.
