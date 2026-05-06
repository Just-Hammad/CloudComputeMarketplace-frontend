# Sprint Log — Spring 2026

Single 16-day sprint from **2026-04-21** to **2026-05-06**.

## Team
| Member | GitHub | Primary area |
|--------|--------|--------------|
| Muhammad Ahmed | @Muhammadahmed43 | Project setup, backend skeleton + middleware, top-level docs |
| Ahsan Riaz | @AhsanRiaz786 | Header, Footer, Sidebar, presentational component tests |
| Abeeha Khan | @Abeeha5 | Auth (frontend modals + backend controller), contexts, conversations |
| Hammad | @Just-Hammad | Landing & Pricing pages, branding, page tests |
| Abdul Wahab | @Abdul-Wahab-17 | Dashboards (renter & seller), Profile, Settings, avatar utility |
| Ahmad Hassan | @ahmadhassan44 | Backend domain (Computer/Rental), checkout/rental flow, backend tests |

## Daily log
| Date | Focus |
|------|-------|
| Apr 21 | Repo init, backend bootstrap |
| Apr 22 | Express app + middleware, User model, auth controller |
| Apr 23 | Computer + Rental domain, Conversation models |
| Apr 24 | Conversation + Profile controllers, route mounting |
| Apr 25 | Frontend Vite scaffold, App router, six React contexts |
| Apr 26 | Header, Footer, Sidebar; Login/Signup popups; reusable layout pieces |
| Apr 27 | Landing + Pricing pages |
| Apr 28 | Dashboard, Seller Dashboard, My Listings |
| Apr 29 | Profile, Settings |
| Apr 30 | Add Computer, Computer Form, Computer Details |
| May 1  | Checkout, Rentals, Rental Confirmation, Rental History |
| May 2  | ChatBox, ConversationsManagement, services/api.js, utils/avatar.js |
| May 3  | Sidebar a11y, branding, signup form fix, rating fix, profile pics |
| May 4  | Backend indexes + mass data seeders, top-level technical docs |
| May 5  | Backend middleware tests, Vitest infra, context/component tests |
| May 6  | Page tests, SRS, architecture, test plan, sprint log, README rewrite |

## Retrospective
- **What went well:** monorepo with one folder per surface kept ownership clean; strong context layer made provider/test wiring boilerplate predictable.
- **What we'd change:** wire payment processing earlier; add an API integration test layer rather than only unit-testing middleware.
- **Risks for v2:** real payments, live remote-desktop sessions, mobile-first refactor, switching from JWT to refresh-token flow.
