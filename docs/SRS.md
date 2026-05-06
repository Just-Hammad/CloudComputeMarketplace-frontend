# Software Requirements Specification — CloudCompute Marketplace

**Version:** 1.0  ·  **Date:** 2026-05-06  ·  **Course:** Software Engineering, Spring 2026

## 1. Introduction

CloudCompute Marketplace is a peer-to-peer platform for renting idle compute hardware (GPUs/CPUs) by the hour. The system has two surfaces:

- **Frontend** — React 19 SPA (`CloudComputeMarketPlace-frontend/`)
- **Backend** — Express + Mongoose REST API (`CloudComputeMarketPlace-backend/`)

### User personas
- **Renter (buyer)** — browses listings, books rentals, manages active sessions, chats with sellers.
- **Seller** — lists machines, sets pricing, manages active rentals, tracks earnings, chats with renters.

A single account can act as both renter and seller.

## 2. Functional Requirements

### FR-1 Authentication
- FR-1.1 Sign up with name, email, password, profile type.
- FR-1.2 Log in via email/password; receive a JWT.
- FR-1.3 `protect` middleware guards authenticated routes.
- FR-1.4 `authorize(roles…)` middleware restricts seller-only endpoints.

### FR-2 Listings
- FR-2.1 Sellers create listings with specs and hourly rate.
- FR-2.2 Listings have a rating that must be greater than one when set.
- FR-2.3 Renters browse the marketplace and view full Computer Details.

### FR-3 Rentals
- FR-3.1 Renters check out a listing for a date range.
- FR-3.2 Confirmation page surfaces access details once accepted.
- FR-3.3 Renters and sellers see status changes in their dashboards.
- FR-3.4 Past rentals filterable by date in Rental History.

### FR-4 Conversations
- FR-4.1 Renter and seller can open a thread tied to a listing or rental.
- FR-4.2 Messages are persisted; threads are listed in `ConversationsManagement`.

### FR-5 Profile & Avatars
- FR-5.1 Each user gets a generated DiceBear pixel-art avatar.
- FR-5.2 Profile page surfaces history, ratings and listings.
- FR-5.3 Settings page exposes theme + notification preferences.

## 3. Non-Functional Requirements
| ID | Requirement |
|----|-------------|
| NFR-1 | Page time-to-interactive < 2.5s on broadband |
| NFR-2 | Fully responsive (mobile, tablet, desktop) |
| NFR-3 | WCAG 2.1 AA color contrast on all primary surfaces |
| NFR-4 | Dark mode supported across all pages |
| NFR-5 | All authenticated routes protected by JWT middleware |
| NFR-6 | MongoDB indexes maintained on hot-path fields |

## 4. Out of Scope (v1)
- Real payment processing (Stripe planned for v2)
- Live remote-desktop streaming
- Mobile native apps
