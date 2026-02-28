# Cost Estimator Technical Documentation

This document provides a detailed breakdown of how the Aarogya Path Cost Estimator functions, including state management, cost calculation logic, and backend integration.

## 1. State Management (Frontend)

The application uses **Zustand** (`useEstimatorStore.js`) to manage the state across the multi-step flow. This ensures that data entered in Step 1 (Profile) and Step 2 (Procedures) is preserved and accessible in the final Results stage.

- **Patient Data**: Stores age, location (ZIP), income bracket, and insurance details.
- **Selected Procedures**: An array of strings representing the medical tests or treatments the user wants to estimate.

## 2. Cost Calculation Logic

Currently, the cost estimation is performed on the frontend in `Results.jsx` using a mapping strategy. 

### A. Procedure Price Mapping
Each procedure is mapped to a predefined price range representing regional averages (Public vs. Private sectors).

| Procedure | Public Sector Est. | Private Sector Est. |
| :--- | :--- | :--- |
| **ECG** | ₹500 - ₹1,200 | ₹1,500 - ₹3,000 |
| **Cardiac Catheterization** | ₹3,500 - ₹5,500 | ₹8,000 - ₹12,000 |
| **Angioplasty** | ₹11,500 - ₹13,500 | ₹25,000 - ₹45,000 |
| **Others** | ₹800 - ₹2,500 | ₹3,000 - ₹7,000 |

### B. Risk Score Calculation
The **Financial Risk Score** is determined by the ratio of **Estimated Out-of-Pocket (OOP) Costs** to the user's **Annual Discretionary Income**.

#### Mathematical Formula:
`Risk Score = (Total Estimated Cost / (Annual Income * 0.15)) * 100`

*Where 15% of annual income is used as the threshold for 'Major Medical Expenditure'.*

### C. Risk Zone Parameters
The gauge color and label transition based on the following specific value ranges:

| Risk Zone | Score Range | Description | Primary Color |
| :--- | :--- | :--- | :--- |
| **SAFE** | 0 - 25 | Cost is well within monthly budget (~2% of income). | Green (`#4CAF7D`) |
| **LOW** | 26 - 45 | Manageable but requires minor budgeting. | Light Green/Yellow |
| **MEDIUM** | 46 - 70 | Significant impact; exceeds 10% of annual income. | Amber (`#F5A623`) |
| **HIGH** | 71 - 100+ | Potential for medical debt; exceeds 15% of income. | Red (`#E05252`) |

#### Secondary Parameters:
- **ZIP Code Weighting**: Adds a +/- 5% variance based on regional healthcare cost indices (Tier 1 vs Tier 3 cities).
- **Procedure Complexity**: High-complexity procedures (e.g., Angioplasty) have a baseline risk multiplier of 1.2x due to potential unforeseen facility fees.

## 3. Backend & Data Persistence

The system integrates with **Firebase Firestore** to ensure user data is tracked and analyzed.

- **Storage**: When a user views their results, a document is automatically created in the `estimates` collection.
- **Payload**:
  ```json
  {
    "userId": "auth_user_id",
    "procedures": ["ECG", "Angioplasty"],
    "createdAt": "server_timestamp",
    "type": "cost_estimate"
  }
  ```
- **Aggregation**: The **Dashboard** retrieves the total number of estimates performed by the specific user using the `getCountFromServer` utility, ensuring the "Total Estimates" KPI is always accurate.

## 4. PDF Export Mechanism

Unlike traditional PDF libraries that increase bundle size, we utilize the native **Browser Print Engine** with custom **CSS Media Queries** (`@media print`).

- **Selective Rendering**: The engine detects the print action and automatically hides:
  - Navigation Bars
  - "Back" and "Edit" buttons
  - Feedback banners
  - Interactive footers
- **Optimization**: It forces a clean, white-background layout optimized for A4 paper, ensuring the resulting PDF/Paper document looks like a professional medical estimate.
