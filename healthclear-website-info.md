# HealthClear (Aarogya Path) - Website Documentation

## 🌟 Overview
HealthClear (also known as Aarogya Path) is a comprehensive web application designed to bring transparency, predictability, and AI-driven guidance to the healthcare experience. By empowering patients with accurate cost estimations and an empathetic AI assistant, HealthClear helps users make informed financial and medical decisions before stepping foot in a hospital.

## 🚀 Key Features & Benefits

### 1. Hospital Cost Estimator
The core utility of the application is a multi-step cost estimator that calculates the financial impact of upcoming medical procedures based on the user's specific income profile.
**Benefits:**
- **Transparency:** Eliminates the shock of hidden healthcare fees by providing accurate price ranges for various procedures (Diagnostic, Orthopedic, Cardiology, etc.).
- **Financial Planning:** Helps users understand if they can afford a procedure out-of-pocket or if they need to seek financial assistance or verified payment plans.
- **Customized Risk Analysis:** Tailors the financial risk warnings explicitly to the user's annual income.

### 2. Aarogya Health AI (AI Chat)
A dedicated, intelligent chatbot integrated directly into the platform, accessible to logged-in users.
**Benefits:**
- **Instant Answers:** Powered by Google's Gemma 3 Large Language Model, the AI provides immediate, customized answers to health, procedure, and cost-related questions.
- **Context-Aware:** The AI remembers the context of the entire conversation session, providing a fluid and cohesive chat experience.
- **Persistent History:** Chat history is securely saved to Firebase, allowing users to pick up conversations right where they left off across different sessions.
- **Empathetic Demeanor:** Specifically instructed to act as an empathetic assistant while maintaining safety by advising users to consult real medical professionals for serious concerns.

### 3. Patient Dashboard
A centralized hub for users to view their health metrics and cost histories.
**Benefits:**
- **Overview Metrics:** Displays key performance indicators such as Total Healthcare Spending, Active Claims, and Upcoming Appointments.
- **Visual Analytics:** Interactive charts to track spending trends over time.

---

## 🧮 How Things are Calculated (The Formulas)

The application utilizes dynamic formulas to provide personalized financial risk assessments during the Cost Estimator flow.

### Financial Risk Score
The Financial Risk Score dictates whether a user is in the "Safe Zone", "Medium Risk", or "High Risk" category when paying for medical procedures. It compares the cost of the procedures against the user's monthly income.

**1. Calculate Total Estimated Cost:**
The system looks at all selected procedures, takes the minimum and maximum cost for each, and calculates the average.
`Total Minimum Cost = Sum(Minimum costs of all selected procedures)`
`Total Maximum Cost = Sum(Maximum costs of all selected procedures)`
**`Average Total Cost`** `= (Total Minimum Cost + Total Maximum Cost) / 2`

**2. Calculate Monthly Income:**
The user inputs their Annual Income via a slider (up to ₹25,00,000+).
**`Monthly Income`** `= Annual Income / 12`

**3. Calculate the Risk Score:**
The logic determines how many months of income the procedure will cost. The baseline is that a procedure costing 5 months of income equals a maximum score of 100.
**`Raw Risk Score`** `= (Average Total Cost / Monthly Income) * 20`
**`Final Risk Score`** `= Math.min(Raw Risk Score, 100)` *(The score is capped at a maximum of 100)*

### Risk Categorization Logic
Based on the `Final Risk Score`, the UI triggers different alerts, gauge colors, and statuses:

- **🟢 SAFE ZONE (Low Risk):** `Score < 15`
  - *Implication:* The cost is less than ~0.75 months of income. Standard insurance or out-of-pocket payment should be manageable.
- **🟠 MEDIUM RISK:** `15 <= Score < 40`
  - *Implication:* The cost ranges between roughly 0.75 to 2 months of income. Users are warned that out-of-pocket costs may exceed their immediate monthly savings.
- **🔴 HIGH RISK:** `Score >= 40`
  - *Implication:* The cost exceeds 2 months of income. Users receive a critical warning recommending they explore financial assistance or payment plans.

---

## 🛠 Technology Stack
- **Frontend Framework:** React (Vite)
- **Styling:** Tailwind CSS + Custom CSS (for premium aesthetics)
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **State Management:** Zustand
- **Authentication & Database:** Firebase (Auth & Firestore)
- **AI Integration:** Google Generative AI SDK (`gemma-3-27b-it` model via Google AI Studio)
