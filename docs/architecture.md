# Architecture Overview

## Monorepo layout
```
CloudComputeMarketPlace-frontend/   React 19 + Vite SPA
CloudComputeMarketPlace-backend/    Express + Mongoose REST API
docs/                               SE deliverables
*.md                                Top-level guides (technical, schema, optimization, …)
```

## Backend
```
src/
├── server.js            # process entry — connects DB, starts Express
├── app.js               # Express app + middleware chain
├── config/
│   ├── db.js            # mongoose connection
│   └── indexes.js       # ensure-index runner
├── middleware/
│   ├── auth.js          # protect + authorize (JWT)
│   ├── errorHandler.js  # central error normalizer
│   ├── validator.js     # express-validator wrapper
│   └── performanceMonitor.js
├── models/              # User, Computer, Rental, Conversation, Message
├── controllers/         # one controller per domain
├── routes/
│   ├── index.js         # mounts /api/<domain>
│   └── api/             # auth, computers, rentals, conversations, profile
├── seeds/               # seedDatabase, seedMassData, addAccessDetails
└── scripts/             # updateAvatars
```

Auth flow: client posts credentials → controller signs a JWT → frontend stores token → axios interceptor attaches `Authorization: Bearer <token>` → `protect` middleware verifies and loads `req.user`.

## Frontend
```
src/
├── main.jsx, App.jsx
├── context/             # Auth, Theme, Sidebar, DashboardMode, Notifications, Stats
├── components/          # reusable: Header, Footer, Sidebar, Login/Signup,
│                        # PrivateRoute, PageContainer, LoadingSpinner,
│                        # ConfirmationPopup, ChatBox, ConversationsManagement
├── pages/               # routed views
├── services/api.js      # axios client + endpoint helpers
└── utils/avatar.js      # DiceBear avatar URL helper
```

Provider tree:
```
<ThemeProvider>
  <Router>
    <AuthProvider>
      <NotificationsProvider>
        <DashboardModeProvider>
          <SidebarProvider>
            <StatsProvider>
              <Routes …/>
            </StatsProvider>
          </SidebarProvider>
        </DashboardModeProvider>
      </NotificationsProvider>
    </AuthProvider>
  </Router>
</ThemeProvider>
```

## Data flow
- All HTTP traffic from the SPA goes through `services/api.js`.
- `AuthContext` owns the current user; `PrivateRoute` redirects unauthenticated requests.
- `StatsContext.refreshStats()` is called on rental/listing mutations to invalidate cached stats on dashboards.
