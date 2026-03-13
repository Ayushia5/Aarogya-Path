# 🔄 Aarogya Path — Data Flow Breakdown

This document provides a granular technical map of how data is sourced, sent, processed, and displayed within the Aarogya Path ecosystem.

---

## 🔐 1. Authentication Flow
*How user identity is managed from login to persistent session.*

| Stage | Action | Technical Path |
| :--- | :--- | :--- |
| **From (Source)** | User enters credentials or clicks "Google Login". | `Login.jsx` / `Signup.jsx` UI |
| **To (Sent)** | Payload sent via Firebase SDK. | `auth.js` -> `signInWithEmailAndPassword` |
| **Where (Processed)** | Firebase Auth validates tokens; `onAuthStateChanged` triggers. | `auth.js` -> `initAuthListener` |
| **Storage (Sink)** | User state stored in global persistent store. | `useAuthStore.js` (Zustand + LocalStorage) |
| **Display (View)** | Navbar updates with user avatar; Protected routes unlock. | `Layout.jsx` / `App.jsx` (`ProtectedRoute`) |

---

## 💰 2. Cost Estimation Flow
*The journey from procedural input to financial risk visualization.*

| Stage | Action | Technical Path |
| :--- | :--- | :--- |
| **From (Source)** | User selects procedures and enters income data. | `SelectProcedures.jsx` -> `PatientProfile.jsx` |
| **To (Sent)** | Data aggregated into a multi-step store state. | `useEstimatorStore.js` (Zustand) |
| **Where (Processed)** | Risk Model calculates score based on Income vs. Avg Cost. | `Results.jsx` -> `calculateRiskScore()` |
| **Storage (Sink)** | Estimate summary saved for dashboard tracking. | `Firestore` -> `estimates` collection |
| **Display (View)** | Radial Risk Gauge and Procedural Breakdown shown. | `Results.jsx` (D3/Canvas Gauge) |

---

## 🤖 3. Aarogya Health AI Flow
*How the healthcare assistant generates contextual guidance.*

| Stage | Action | Technical Path |
| :--- | :--- | :--- |
| **From (Source)** | User types a query into the chat input. | `AIChat.jsx` Input Field |
| **To (Sent)** | Prompt sent to Gemini with system instructions & context. | `AIChat.jsx` -> `genAI.sendMessage()` |
| **Where (Processed)** | Gemini processes prompt against Medical Safety Guardrails. | `Google Gemini API` (LLM Inference) |
| **Storage (Sink)** | Entire message history updated in real-time. | `Firestore` -> `chats/{userId}` collection |
| **Display (View)** | Chat bubble renders with "Typing" animation and Markdown. | `AIChat.jsx` (Framer Motion List) |

---

## 🏥 4. Provider Discovery Flow
*How medical facilities and analytics are surfaced to the user.*

| Stage | Action | Technical Path |
| :--- | :--- | :--- |
| **From (Source)** | Static dataset of verified hospitals and specialists. | `data/providersData.js` |
| **To (Sent)** | Filter/Search queries applied based on user location/needs. | `Providers.jsx` UI State |
| **Where (Processed)** | Logic identifies "Infrastructure Gaps" (e.g., ICU availability). | `Providers.jsx` -> `infrastructureGaps` Map |
| **Storage (Sink)** | Users "Bookmark" or "Save" specific providers. | `Firestore` -> `users/{userId}/savedProviders` |
| **Display (View)** | Responsive Grid/List showing benchmarking metrics. | `ProviderCard.jsx` / `HospitalCard.jsx` |

---

## 📊 Summary of Data Sinks (Storage)

1.  **Firebase Auth**: Manages credentials and JWT tokens.
2.  **Firestore (`users`)**: Stores settings and saved hospital lists.
3.  **Firestore (`estimates`)**: Analytical storage for financial history.
4.  **Firestore (`chats`)**: Conversation memory for the AI Assistant.
5.  **Browser LocalStorage**: Mirrors Zustand store for instant loads.
