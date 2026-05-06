# CloudCompute Marketplace

A peer-to-peer marketplace for renting idle compute power (GPUs/CPUs) by the hour. Sellers list their machines; renters book them for ML training, rendering, simulation, or any other workload.

> **Software Engineering** project — Spring 2026.
> Sprint: **2026-04-21 → 2026-05-06**.

This repository is a **monorepo**:

- [`CloudComputeMarketPlace-frontend/`](./CloudComputeMarketPlace-frontend) — React 19 + Vite SPA
- [`CloudComputeMarketPlace-backend/`](./CloudComputeMarketPlace-backend) — Express + Mongoose REST API

## Stack
- **Frontend:** React 19, Vite 6, React Router v7, TailwindCSS 4, MUI 7, axios
- **Backend:** Node.js, Express, Mongoose, JWT, bcrypt
- **Tests:** Vitest + Testing Library (frontend), Jest (backend)

## Quick start

### Backend
```bash
cd CloudComputeMarketPlace-backend
cp .env.example .env       # set MONGO_URI and JWT_SECRET
npm install
npm run dev                # nodemon on src/server.js
npm test                   # jest
```

### Frontend
```bash
cd CloudComputeMarketPlace-frontend
npm install
npm run dev
npm test
```

## Documentation
- [Software Requirements Specification](docs/SRS.md)
- [Architecture Overview](docs/architecture.md)
- [Test Plan](docs/test-plan.md)
- [Sprint Log](docs/sprint-log.md)
- [Technical Documentation](technical-documentation.md)
- [Database Schema](schema.md), [Schema v2](schema2.md)
- [Optimization Notes](optimization.md)
- [Search Feature](search-feature.md)
- [Rental Connection Guide](rental-connection-guide.md)
- [Mass Data Seeder](CloudComputeMarketPlace-backend/MASS_DATA_SEEDER.md)

## Team
| Member | GitHub | Area |
|--------|--------|------|
| Muhammad Ahmed | [@Muhammadahmed43](https://github.com/Muhammadahmed43) | Setup, backend infra, docs |
| Ahsan Riaz | [@AhsanRiaz786](https://github.com/AhsanRiaz786) | Layout (Header/Footer/Sidebar) |
| Abeeha Khan | [@Abeeha5](https://github.com/Abeeha5) | Auth, contexts, conversations |
| Hammad | [@Just-Hammad](https://github.com/Just-Hammad) | Landing, Pricing, branding |
| Abdul Wahab | [@Abdul-Wahab-17](https://github.com/Abdul-Wahab-17) | Dashboards, Profile, Settings |
| Ahmad Hassan | [@ahmadhassan44](https://github.com/ahmadhassan44) | Backend domain, checkout/rental flow |
