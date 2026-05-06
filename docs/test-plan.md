# Test Plan

## Strategy

Two test suites, one per package:

| Layer | Tooling | Scope |
|-------|---------|-------|
| Backend | **Jest** + jsonwebtoken (mocked Mongoose) | Middleware: auth, errorHandler, authorize |
| Frontend | **Vitest** + @testing-library/react + jsdom | Contexts, presentational components, page smoke tests, utility functions |

## Running
```bash
# Backend
cd CloudComputeMarketPlace-backend
npm install
npm test

# Frontend
cd CloudComputeMarketPlace-frontend
npm install
npm test
```

## Inventory

### Backend (`CloudComputeMarketPlace-backend/tests/`)
| File | Owner | What it covers |
|------|-------|----------------|
| `errorHandler.test.js` | Hassan | CastError → 404, dup-key → 400, ValidationError → 400, fallback → 500 |
| `auth.middleware.test.js` | Hassan | `protect` 401 / 401 invalid / valid token / missing user · `authorize` allow / deny |

### Frontend (`CloudComputeMarketPlace-frontend/src/**/__tests__/`)
| File | Owner | What it covers |
|------|-------|----------------|
| `context/__tests__/ThemeContext.test.jsx` | Abeeha | default mode, toggle, error guard |
| `context/__tests__/SidebarContext.test.jsx` | Abeeha | initial state, toggle, close-when-closed |
| `context/__tests__/DashboardModeContext.test.jsx` | Abeeha | default, switch, error guard |
| `context/__tests__/StatsContext.test.jsx` | Abeeha | initial version, increment on refresh |
| `utils/__tests__/avatar.test.js` | Wahab | URL encoding + anonymous fallback |
| `components/LoadingSpinner/__tests__/LoadingSpinner.test.jsx` | Ahsan | renders Loading text |
| `components/ConfirmationPopup/__tests__/ConfirmationPopup.test.jsx` | Ahsan | hidden when closed, Confirm + Cancel handlers |
| `components/Footer/__tests__/Footer.test.jsx` | Ahsan | renders inside router |
| `pages/landingPage/__tests__/landingPage.test.jsx` | Hammad | mounts inside required providers |
| `pages/pricingPage/__tests__/pricingPage.test.jsx` | Hammad | mounts inside required providers |

## Coverage targets (v1)
- Backend middleware: ≥80% line coverage
- Frontend contexts: 100% statement coverage
- Frontend components/pages: smoke coverage on every shipped surface

## Out of scope (v1)
- End-to-end flows (Cypress/Playwright) — deferred until backend is in a hosted env
- Load testing — deferred to v2 alongside payments
