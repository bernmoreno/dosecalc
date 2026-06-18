# dosecalc

A React medication dosing assistant focused on age/weight calculations, dose frequency splitting, and tablet-to-liquid conversion.

> **Clinical safety notice:** This app is for educational/support use and not a prescribing authority. Always verify with official labeling, institutional protocols, and licensed clinicians/pharmacists.

## Features

- Medication selector with categories and medication icons.
- Medication dropdown now displays all listed strengths for each medication.
- Color-coded navigation tabs for faster visual scanning.
- Mobile-first responsive layout tuned for smartphones and iPhones (safe-area spacing + touch-friendly controls).
- **Weight-based dose math**:
  - convert lb → kg
  - calculate daily dose from mg/kg/day
  - split into per-dose amount by frequency
  - select tablet/pill and liquid strengths in Calculator so conversions use the exact chosen strength
- **Age-aware dosing workflow** with pediatric/adult handling.
- **Pediatric reference equations**:
  - Clark’s rule
  - Fried’s rule
  - Young’s rule
- **BSA support** (Mosteller formula).
- **Form conversion**:
  - mg → tablets (by mg/tablet)
  - mg → mL (by mg/mL)
  - source/target form selection (tablet, pill, liquid)
  - medication strength dropdown selection for conversion
  - show conversion button with warning alert to double-check inputs
- Category browser tab listing medications, forms, strengths, and dosing range text.
- Clickable medication cards in Categories with quick actions:
  - **Calculate dosage now** (opens Calculator with selected medication)
  - **Convert medicine** (opens Convert with selected medication)
- Save calculated results to local storage and review in Saved tab.
- Save entries with patient full name, edit patient names later, and delete individual/all saved entries.

---

## How dose math works in this app

### 1) Weight conversion

$\text{kg} = \frac{\text{lb}}{2.2}$

### 2) Total daily dose (weight-based)

$\text{Daily dose (mg/day)} = \text{Weight (kg)} \times \text{Dose rate (mg/kg/day)}$

### 3) Dose frequency split

$\text{Dose per administration (mg)} = \frac{\text{Daily dose (mg/day)}}{\text{Doses per day}}$

### 4) Liquid conversion

$\text{mL per dose} = \frac{\text{Dose per administration (mg)}}{\text{Concentration (mg/mL)}}$

### 5) Tablet conversion

$\text{Tablets per dose} = \frac{\text{Dose per administration (mg)}}{\text{Tablet strength (mg/tablet)}}$

### 6) BSA (Mosteller)

$$
\text{BSA} = \sqrt{\frac{\text{Height (cm)}\times\text{Weight (kg)}}{3600}}
$$

### 7) Pediatric reference rules

- Clark’s: $\frac{\text{Weight (lb)}}{150}\times\text{Adult dose}$
- Fried’s: $\frac{\text{Age (months)}}{150}\times\text{Adult dose}$
- Young’s: $\frac{\text{Age (years)}}{\text{Age (years)}+12}\times\text{Adult dose}$

---

## Tabs overview

- **Calculator**: select medication + age + weight + frequency and get calculated result.
  - medication dropdown includes all listed strengths for quick review
  - includes an "All available medication strengths" dropdown
  - shows separated strength dropdowns by form: tablet, pill, capsule, and liquid
  - conversion results use selected strengths for more accurate dosing conversion
  - includes age/person icon guide: infant, teens, female, male, adult, senior
- **Convert**: convert mg/day into per-dose mg, tablets/pills, and mL.
  - choose source form and target form (tablet/pill/liquid)
  - choose strength from medication strength dropdowns
  - alert reminder: "double check input before submitting result"
- **Categories**: browse all medications by category with strengths/forms.
  - each medication card is clickable and includes Calculate/Convert buttons
- **By Age**: age-group-oriented workflow with dose output.
- **By Weight**: mg/kg/day-focused workflow.
- **Saved**: previously saved calculation snapshots.
  - includes patient full name editing and delete controls

---

## Project structure

- `src/App.js` – main layout and tabs
- `src/data/medications.js` – medication catalog and age groups
- `src/utils/dosing.js` – core dosing and conversion formulas
- `src/tabs/*.js` – tab screens
- `src/components/DoseCalcMedicationDropdown.js` – medication selector
- `public/dosecalc-icon.svg` – custom medical calculator app icon (favicon + manifest)
- `.github/workflows/deploy-pages.yml` – GitHub Pages deployment workflow

---

## Local development

### Requirements

- Node.js 18+ (Node 20 recommended)
- npm 9+

### Run locally

```bash
npm install
npm start
```

Open: `http://localhost:3000`

### Build

```bash
npm run build
```

Note: service worker caching is enabled in production only. During local development, service workers are automatically unregistered to prevent stale UI/data screens.

---

## How to create this app (step-by-step)

1. Create a React app scaffold (Create React App).
2. Add tab-based UI shell in `App.js`.
3. Add medication catalog (`src/data/medications.js`) grouped by category.
4. Build reusable dosing functions in `src/utils/dosing.js`.
5. Implement Calculator / Convert / By Age / By Weight tabs.
6. Add conversion support for tablets and liquid concentration.
7. Add local storage persistence for saved results.
8. Add category browser tab with icons per category and medication.
9. Add styling in `src/App.css`.
10. Add GitHub Pages workflow in `.github/workflows/deploy-pages.yml`.

---

## GitHub deployment (push code)

1. Create a new GitHub repository (for example: `dosecalc`).
2. In your local project root:

```bash
git init
git add .
git commit -m "Initial dosecalc app"
git branch -M main
git remote add origin https://github.com/<YOUR_USERNAME>/<YOUR_REPO>.git
git push -u origin main
```

Replace `<YOUR_USERNAME>` and `<YOUR_REPO>`.

---

## GitHub Pages deployment (for users)

This repo includes `.github/workflows/deploy-pages.yml` to auto-deploy on pushes to `main`.

It also supports repositories that still use `master`.

### One-time GitHub setup

1. Go to **Repository → Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Push to `main` (or rerun the workflow under **Actions**).
4. After successful run, your site URL appears in:
   - **Actions** logs (deploy job output)
   - **Settings → Pages**

### Deployment checklist (public availability)

1. Ensure your default branch is `main` or `master`.
2. Push all files, including `.github/workflows/deploy-pages.yml`.
3. Confirm Pages source is set to **GitHub Actions**.
4. Wait for workflow `Deploy dosecalc to GitHub Pages` to finish successfully.
5. Open the generated URL from **Settings → Pages** and verify tabs + icons.

---

## Data protection for public use

- Saved entries are stored in **browser local storage** (client-side only in this app).
- Default behavior now supports **de-identified patient name saving** unless full-name storage is explicitly enabled.
- For shared/public devices:
  - avoid entering protected identifiers,
  - clear local saved entries after use from **Settings** or **Saved** tab.
- Always follow your facility privacy and compliance requirements.

---

## References used for formula alignment

- MedCentral calculator guide (requested reference; access may require browser permissions)
- GoodRx weight-based dosing overview
- NCBI StatPearls (Clark’s rule)
- Davis Drug Guide pediatric dosage examples
- Omni dosage calculator formula patterns

---

## Disclaimer

This software does not replace professional judgment. Medication dosing must be confirmed by qualified healthcare professionals using current clinical resources and institutional standards.

---

## Copyright

© Bernadette A Moreno. All rights reserved.
Owner and Developer of the dosecalc app: Bernadette A Moreno.
