# ApnaProfessor (KYPE) – Interview Guide

## 1) 60-Second Elevator Pitch
- **Problem:** Students often choose professors with little trusted feedback.
- **Solution:** ApnaProfessor is a review platform where users discover colleges/professors, add professors, submit reviews, and upvote useful reviews.
- **Core value:** Community-sourced transparency for professor/course decisions.
- **Tech stack:** React + Vite + Redux Toolkit + Firebase Auth (frontend), Node.js + Express + MongoDB/Mongoose (backend), deployed with Vercel.

---

## 2) Suggested Interview Demo Flow (Live Product Walkthrough)
1. Open home page (`/`) and explain platform purpose.
2. Search/browse colleges (`/colleges`) with pagination.
3. Open a college and show professor list (`/colleges/:college_id`), average ratings, review counts.
4. Open a professor page (`/colleges/:college_id/:professor_id`) and show review feed + pagination.
5. Login with Google (`/login`) and explain Firebase authentication flow.
6. Add a new college (`/add/college`) and show location selection.
7. Add a professor (`/add/professor`) linked to selected college.
8. Add a review (`/add/review/:professor_id`) with rating, text, course, attendance.
9. Upvote a review and show immediate UI feedback + backend persistence.
10. Logout and show protected-route behavior for add flows.

---

## 3) High-Level Architecture

### Frontend (React SPA)
- Router-based single-page app with nested routes (`frontend/src/main.jsx`).
- Shared layout shell (`frontend/src/components/Layout/Layout.jsx`) + route outlet.
- Global state via Redux Toolkit (`frontend/src/app/store.js`).
- Session persistence with `redux-persist` (user + colleges state).
- API communication via Axios using `VITE_API_BASE_URL`.

### Backend (Express API)
- Central server entry (`backend/server.js`).
- Route modules under `/api/*` (`backend/src/routers/index.js`).
- Domain routers:
  - `/api/college` (`backend/src/routers/College.js`)
  - `/api/professor` (`backend/src/routers/Professor.js`)
  - `/api/review` (`backend/src/routers/Review.js`)
  - `/api/user` (`backend/src/routers/User.js`)
- MongoDB with Mongoose models + pagination plugin.

### Data Store
- MongoDB collections:
  - `College` (`backend/src/models/College.js`)
  - `Professor` (`backend/src/models/Professor.js`)
  - `Review` (`backend/src/models/Review.js`)
  - `User` (`backend/src/models/User.js`)

### Deployment
- Frontend Vercel rewrite for SPA (`frontend/vercel.json`).
- Backend serverless route mapping (`backend/vercel.json`).

---

## 4) Low-Level Implementation Deep Dive

### A) Routing and App Shell
- Browser router and nested route tree in `frontend/src/main.jsx`.
- Guarded “add” routes using `PrivateRoutes` (`frontend/src/utils/PrivateRoutes.jsx`).
- Root app preloads colleges into Redux (`fetchAllColleges` in `frontend/src/App.jsx`).

### B) Authentication (Firebase + App User Sync)
- Firebase initialized in `frontend/src/firebase.js`.
- Google sign-in popup in `frontend/src/components/Auth/Auth.jsx`.
- On auth state change:
  - frontend sends user profile to backend (`POST /user`),
  - backend performs upsert by `uid` (`backend/src/routers/User.js`),
  - frontend stores returned user in Redux (`userSlice`).

### C) College Discovery
- Route loader in `frontend/src/components/Colleges/Colleges.jsx` fetches paginated/search results.
- Backend `GET /api/college` supports:
  - free-text query (`q`) via regex,
  - pagination via `mongoose-paginate-v2`.

### D) Professor Listing and Rating Display
- Frontend fetches `GET /api/college/:id?page=N` in `frontend/src/components/Professors/Professors.jsx`.
- Backend returns:
  - college metadata,
  - paginated professor docs.
- Average rating is computed client-side using `total_rating.star1..star5` distribution.

### E) Review System
- Add review UI (`frontend/src/components/AddReview/AddReview.jsx`) captures:
  - rating (1–5),
  - text,
  - course,
  - mandatory attendance flag.
- Backend `POST /api/review`:
  - inserts review,
  - updates reviewer’s `profs_reviewed`,
  - increments professor `review_count` and star bucket counter.

### F) Voting System
- Frontend review card (`frontend/src/components/Professors/Review.jsx`) toggles upvote.
- Backend `POST /api/review/:id` updates:
  - user `reviews_voted` array,
  - review `votes` count (+1 / -1).
- UI optimistically updates local vote icon and count.

---

## 5) Data Model Design Choices
- **Pre-aggregated rating buckets (`star1..star5`)** in Professor model:
  - makes reads fast for listing screens,
  - avoids expensive aggregate pipeline on every request.
- **Counters (`prof_count`, `review_count`)**:
  - denormalization for quick display and pagination metadata.
- **Relational references via ObjectId**:
  - consistent linkage between users, professors, colleges, and reviews.

---

## 6) Major Decisions, Trade-offs, and Why
1. **Firebase for authentication**
   - Chosen for fast Google OAuth integration and reduced auth backend complexity.
2. **Mongoose + MongoDB**
   - Flexible schema evolution and quick iteration for an early-stage product.
3. **Redux + session persistence**
   - Avoid repeated full reload state loss; improves UX after navigation/login.
4. **Server-side pagination**
   - Scales better than fetching all documents.
5. **Denormalized counters**
   - Faster reads at the cost of multi-document update complexity.

---

## 7) Challenges Faced and How We Solved Them
1. **Keeping related entities in sync**
   - Example: creating review updates both `User` and `Professor`.
   - Solution: perform chained updates in review route handlers.
2. **Protecting mutation routes in UI**
   - Solution: `PrivateRoutes` wrapper redirects unauthenticated users to login.
3. **Keeping UX responsive while writing backend state**
   - Solution: local state updates for votes + Redux updates.
4. **Pagination and query consistency**
   - Solution: backend pagination standardization via `mongoose-paginate-v2`.

---

## 8) Known Gaps / Improvement Roadmap (Good to Mention in Interview)
- Add backend auth middleware to verify Firebase tokens on protected APIs (currently mostly UI-guarded).
- Wrap multi-step DB updates in transactions for stronger consistency.
- Add validation/sanitization across request payloads.
- Add tests (unit + integration) for routers and reducers.
- Improve search UX and fix query URL formatting edge cases.
- Reduce frontend bundle size via route-based code splitting.
- Improve role-based admin flows (`checkUserRole` path needs cleanup).

---

## 9) Hydra.js / Volto Discussion (Interview Clarity Section)
**Important:** This repository is a React + Express + MongoDB project and does **not** currently include Plone/Volto/Hydra stack artifacts (no `hydra.js`, Volto configs, or `@plone/*` packages in codebase).

If interviewer asks:
- Position this as a **custom MERN-style product**, not a Volto implementation.
- Explain equivalent concepts:
  - API contract handling here is done with Axios + custom routes, not Hydra client abstractions.
  - Frontend composition is plain React routing/components, not Volto block architecture.
- Mention how migration could be approached conceptually (content API standardization, auth adaptation, component mapping), but clarify it is out-of-scope for current implementation.

---

## 10) Interview Q&A Bank

### Product & Architecture
1. **Q:** Why did you choose this architecture?  
   **A:** It balances speed of development and scalability: React SPA for fast UI iteration, Express modular APIs, MongoDB flexible schema, Firebase for low-friction auth.

2. **Q:** How do frontend and backend communicate?  
   **A:** Via Axios calls to REST endpoints under `/api/*`, with environment-configured base URL.

3. **Q:** How did you structure your backend?  
   **A:** Domain-based routers (college/professor/review/user) with dedicated Mongoose models and pagination support.

### Data & Performance
4. **Q:** How do you compute ratings efficiently?  
   **A:** Maintain star distribution counters on each professor and compute averages directly from those counters.

5. **Q:** How do you handle large datasets?  
   **A:** Server-side pagination for colleges/professors/reviews and lightweight paged responses.

### Security & Reliability
6. **Q:** Is your API fully protected?  
   **A:** UI routes are protected; backend token verification middleware is a known next step.

7. **Q:** How do you avoid duplicate upvotes?  
   **A:** Track voted review IDs in user profile and toggle vote with corresponding increment/decrement logic.

8. **Q:** Any consistency risks?  
   **A:** Multi-document writes can drift on partial failure; transaction-based updates are a planned enhancement.

### Engineering Process
9. **Q:** What part are you most proud of?  
   **A:** End-to-end review lifecycle and state synchronization across Redux, API, and denormalized DB counters.

10. **Q:** If you had 2 more weeks, what would you add first?  
    **A:** Backend auth middleware, route tests, transactional writes, and bundle splitting/perf improvements.

---

## 11) File-to-Feature Mapping (Quick Reference During Interview)
- App routes: `frontend/src/main.jsx`
- Auth logic: `frontend/src/components/Auth/Auth.jsx`, `frontend/src/firebase.js`
- Route protection: `frontend/src/utils/PrivateRoutes.jsx`
- Global store: `frontend/src/app/store.js`
- Colleges search/list: `frontend/src/components/Colleges/Colleges.jsx`
- Professors list: `frontend/src/components/Professors/Professors.jsx`
- Professor details + review feed: `frontend/src/components/Professors/Professor.jsx`
- Vote UI: `frontend/src/components/Professors/Review.jsx`
- Add college/professor/review forms:
  - `frontend/src/components/AddCollege/AddCollege.jsx`
  - `frontend/src/components/AddProfessor/AddProfessor.jsx`
  - `frontend/src/components/AddReview/AddReview.jsx`
- API server bootstrap: `backend/server.js`
- Routers: `backend/src/routers/*.js`
- Data models: `backend/src/models/*.js`

---

## 12) Final Interview Delivery Script (Simple Sequence)
1. Start with problem and one-line solution.
2. Show live demo in user journey order.
3. Draw architecture: client, API, DB, auth provider.
4. Drill down into one flow (login or add review) end-to-end with files.
5. Explain key technical decisions/trade-offs.
6. Mention current limitations honestly + concrete roadmap.
7. Close with impact: better decision-making for students through transparent professor insights.
