This is a Next.js project built to monitor Datadog alerts and display service health status grouped by business sections (Corporate & Digital).

---

## 📊 About the Project

This dashboard centralizes Datadog alerts and displays:

- ✅ Service Status (OK | WARN | ALERT)
- 🚨 Active alert count
- 🏢 Organized sections (Corp & Digital)
- 🔄 Automatic revalidation (every 60 seconds)
- 🧱 Clean architecture (Action → Service → Repository)

It was structured to be production-ready and scalable.

---

## 🏗️ Architecture

The project follows a layered architecture pattern:

```
src/
│
├── actions/
│   └── get-service-status.action.ts
│
├── services/
│   └── datadog.service.ts
│
├── repositories/
│   └── datadog.repository.ts
│
├── constants/
│   └── sections.constants.ts
│
├── types/
│   └── service-status.ts
│
└── app/
    └── page.tsx
```

### Layer Responsibilities

- **Repository** → Handles external API communication (Datadog).
- **Service** → Business logic and data normalization.
- **Action** → Server Actions used by the UI.
- **Constants** → Sections and service definitions.
- **Types** → Shared TypeScript types.

---

## ⏱️ Revalidation Strategy

The dashboard uses:

```ts
export const revalidate = 60;
```

This ensures:

- API is not called excessively
- Data updates every 1 minute
- Better performance and cost control

---

## 🚀 Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev

Open http://localhost:3000 with your browser to see the result.

You can start editing the page by modifying:

```

app/page.tsx

````

The page auto-updates as you edit the file.

---

## 📦 Production Build

To build for production:

```bash
npm run build
npm start
````

---

## 🧠 Key Concepts Used

- Next.js App Router
- Server Actions
- ISR (Incremental Static Regeneration)
- Clean Architecture pattern
- Datadog API integration
- Type-safe service definitions

---

## 🛠 Future Improvements

- Authentication layer
- Role-based access
- Caching layer (Redis)
- Real-time updates via WebSockets
- UI improvements with loading states
- Monitor drill-down view

---
