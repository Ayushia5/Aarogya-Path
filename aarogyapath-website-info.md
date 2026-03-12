# 🏥 Aarogya Path — Project Documentation

Aarogya Path is a state-of-the-art, premium healthcare fintech application designed to bridge the gap between medical needs and financial clarity. It empowers patients with AI-driven cost estimations, risk analysis, and a personalized healthcare assistant.

---

## 🛠 Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React 19 (Vite), JavaScript (ES6+) |
| **Styling** | Tailwind CSS 3.4, Vanilla CSS (Custom Design System) |
| **Animations** | Framer Motion (Micro-interactions & Page Transitions) |
| **State Management** | Zustand (Persistent Store for Estimator & Auth) |
| **Backend/DB** | Firebase (Firestore, Authentication, Cloud Storage) |
| **AI Engine** | Google Gemini (via `@google/generative-ai` SDK) |
| **Icons** | Lucide React |
| **Form Handling** | React Hook Form + Zod (Validation) |
| **Data Viz** | Recharts (Responsive Health & Spending Trends) |

---

## 🚀 Core Features

### 1. Precision Cost Estimator
A multi-step, logic-driven flow that captures procedure types and user financial profiles to generate real-time cost risk assessments.
- **Procedure Coverage:** Diagnostic, Orthopedic, Cardiology, Maternity, and more.
- **Dynamic Logic:** Costs are adjusted based on market averages and regional data.
- **Validation:** Strict Zod-powered validation ensures data integrity at every step.

### 2. Aarogya Health AI
A deep-integrated healthcare assistant that provides empathetic guidance.
- **Persistent History:** Uses Firebase to save chat sessions globally.
- **Memory Management:** Maintains context throughout the user session for fluid dialogue.
- **Safe Guardrails:** Explicitly configured to provide information while prioritizing professional medical consultation.

### 3. Patient Intelligence Dashboard
A high-fidelity cockpit for managing healthcare data.
- **KPI Tracking:** Real-time monitoring of estimates, saved providers, and financial risk.
- **Risk Gauge:** Visual representation of cost exposure based on monthly income delta.
- **Network Management:** Seamlessly save and manage "In-Network" doctors and hospitals.

### 4. Advanced Provider Discovery
- **Hospital Infrastructure Analysis:** Highlights "Infrastructure Gaps" (e.g., missing ICU or advanced radiology) for informed decision-making.
- **Regional Benchmarking:** Compares facility quality scores against regional averages.

---

## ⚖️ Financial Logic (Risk Model)

Our proprietary risk model evaluates the impact of healthcare costs on a user's liquid financial health:

1. **Monthly Benchmark:** `Annual Income / 12`
2. **Cost Average:** `(Min Cost + Max Cost) / 2`
3. **Risk Score:** `(Average Cost / Monthly Income) * 20` (Capped at 100)
4. **Classification:**
   - **🟢 Safe Zone (<15):** Cost is < 0.75 months of income.
   - **🟠 Caution (15-40):** Cost is 0.75 - 2 months of income.
   - **🔴 High Risk (>40):** Cost exceeds 2 months of income.

---

## 🎨 Design Philosophy: "Medicana"
The application uses a custom-built design system called **Medicana**, characterized by:
- **Glassmorphism:** Frosted overlays and translucent cards for a clean, modern feel.
- **Deep Navy & Teal Palette:** Evokes a sense of trust, professionalism, and high-tech healthcare.
- **Micro-animations:** Purposeful transitions that guide the user through complex data flows.

---

## 👤 Credits
**Developed by:** Ayushi Aggarwal  
**Institution:** GGSIPU (Indraprastha University)  
**Status:** MVP v1.0 (Production Ready)
