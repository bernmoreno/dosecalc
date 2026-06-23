# dosecalc

A React medication dosing assistant focused on age/weight calculations, dose frequency splitting, and tablet-to-liquid conversion.

> **Clinical safety notice:** This app is for educational/support use and not a prescribing authority. Always verify with official labeling, institutional protocols, and licensed clinicians/pharmacists.

## Features

- Medication selector with categories and medication icons.
- Medication selector now places **all Most Common Medication** options first and **all Pediatric Medication** options second before the rest of the catalog.
- Most Common Meds tab for urgent-care favorites and faster access into the Calculator.
- Pediatric Meds tab with grouped pediatric urgent-care medication lists and high-yield dosing references.
- Medication dropdown now displays all listed strengths for each medication.
- Folder-style, darker high-contrast navigation tabs using the Adobe palette for faster visual scanning.
- Main page with two floating sections: Calculator and Pediatric Medicine.
- Embedded "My Manual Calculator" frame at the bottom of the main page with a fallback link to the standalone calculator.
- Main page redesigned with compact medicine buttons, a full calculator on the right, and a floating in-page Epocrates external-reference viewer with dark controls.
- Main page now includes a Pediatric Medicine quick section directly below Most Common Medicines, with section colors matched to their tab themes.
- Main page calculator section now uses the same color family as the top Calculator tab for a more consistent visual workflow.
- Main page sections now include **Refresh** buttons so users can quickly reset the common/pediatric picks and reload the embedded calculator or reference frames without refreshing the whole app.
- Pediatric antibiotic workflow now shows diagnosis-specific dosing guidance in both the pediatric reference area and the calculator when supported.
- Bottom manual calculator app restored, with a full embedded view and mobile-friendly floating behavior near the bottom of the main page.
- Responsive layout tuned for small Android phones, iPhones, and mobile browsers with stacked panels, scrollable tabs, and touch-friendly controls.
- Mobile-first responsive layout tuned for smartphones and iPhones (safe-area spacing + touch-friendly controls).
- Phone-size breakpoints now collapse grids earlier, keep tabs horizontally scrollable on smaller widths, and reduce iframe/card heights for tighter mobile screens.
- **Weight-based dose math**:
  - convert lb → kg
  - calculate daily dose from mg/kg/day
  - split into per-dose amount by frequency
  - select tablet/pill and liquid strengths in Calculator so conversions use the exact chosen strength
  - age/weight numeric inputs hide default `0` to keep entry fields clean
- **Age-aware dosing workflow** with pediatric/adult handling.
- **Pediatric reference equations**:
  - Clark’s rule
  - Fried’s rule
  - Young’s rule
- **BSA support** (Mosteller formula).
- **Form conversion**:
  - mg → tablets (by mg/tablet)
  - mg → mL (by mg/mL)
  - calculator shows solid-form estimate and liquid equivalent when a matching concentration is available
  - source/target form selection (tablet, pill, liquid)
  - medication strength dropdown selection for conversion
  - show conversion button with warning alert to double-check inputs
- Category browser tab listing medications, forms, strengths, and dosing range text.
- Clickable medication cards in Categories with quick actions:
  - **Calculate dosage now** (opens Calculator with selected medication)
  - **Convert medicine** (opens Convert with selected medication)
- Clicking a medication in **Most Common Meds** now opens the main **Calculator** tab with that medicine preselected and the dose result shown using the calculator inputs.
- Clicking **Use in pediatric calculator** now opens the main **Calculator** tab with that pediatric medication preselected.
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

- **Main**: landing page with two floating sections for Calculator and Pediatric Medicine.
- **Main**: includes a Most Common Medicines section and a Pediatric Medicine quick section stacked on the left, each styled to match its corresponding tab color.
- **Most Common Medicines**: compact button list showing 5 common meds first, with a More button for the rest and a linked detail panel.
- **Calculator**: full calculator view on the right side with extra padding for easier use.
- **External Link**: floating public-reference viewer under the calculator with dark visible link buttons, an in-page scroll/view area, and an explicit **Open new tab** fallback.
- **Pediatric diagnosis dosing**: supported pediatric antibiotics and selected respiratory medications now show indication-specific dosing ranges and notes.
- **Manual Calculator App**: full embedded calculator at the bottom of the page, with mobile sticky-bottom behavior for quicker access.
- **My Manual Calculator**: framed external calculator at the bottom of the Main page for quick manual math checks.
- **Calculator**: select medication + age + weight + frequency and get calculated result.

## Mobile and browser support

- Optimized for narrow mobile screens with stacked content panels and single-column cards where needed.
- Sticky, horizontally scrollable tab navigation on smaller phones to reduce crowding.
- Touch-friendly buttons and inputs sized to work better on iPhone Safari, Chrome on Android, and other modern mobile browsers.
- Production build tested locally after the responsive updates.

## Deployment

- GitHub Pages deployment is handled by GitHub Actions.
- Every push to `main` automatically builds and deploys the latest app to GitHub Pages.
- VS Code workspace settings now enable **Auto Save** after a short delay so local edits are saved automatically while you work.
- The repo now uses a single React app deployment workflow for Pages.
- Local changes are published to the GitHub Pages site after they are committed and pushed to the repository.
- The app now unregisters service workers on load so GitHub Pages updates, including CSS styling changes, refresh more reliably.
  - medication dropdown includes all listed strengths for quick review
  - includes an "All available medication strengths" dropdown
  - shows separated strength dropdowns by form: tablet, pill, capsule, and liquid
  - conversion results use selected strengths for more accurate dosing conversion
  - includes age/person icon guide: infant, teens, female, male, adult, senior
- **Convert**: convert mg/day into per-dose mg, tablets/pills, and mL, plus use supported age/weight/diagnosis guidance to show correct tablet-to-liquid and pill-to-liquid equivalents for the selected medication.
  - choose source form and target form (tablet/pill/liquid)
  - choose strength from medication strength dropdowns
  - alert reminder: "double check input before submitting result"
- **Categories**: browse all medications by category with strengths/forms.
  - each medication card is clickable and includes Calculate/Convert buttons
- **Most Common Meds**: quick urgent-care medication list that sends the selected medicine into the main Calculator tab for dosing and conversion review.
- **Pediatric Meds**: grouped pediatric urgent-care lists for antibiotics, respiratory, allergy/rash, eye/ear, and skin medications, plus a focused pediatric dosing calculator for high-yield meds.
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

### VS Code auto-save

- Workspace auto-save is enabled in `.vscode/settings.json`
- Save mode: `afterDelay`
- Delay: `1000ms`
- This saves local file edits automatically in VS Code, but GitHub Pages still updates only after changes are **committed and pushed to `main`**

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
5. Implement Calculator and Convert tabs plus medication workflow screens.
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

### One-time GitHub setup

1. Go to **Repository → Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Push to `main` (or rerun the workflow under **Actions**).
4. After successful run, your site URL appears in:
   - **Actions** logs (deploy job output)
   - **Settings → Pages**

### Deployment checklist (public availability)

1. Ensure your default branch is `main`.
2. Push all files, including `.github/workflows/deploy-pages.yml`.
3. Confirm Pages source is set to **GitHub Actions**.
4. Wait for workflow `Deploy dosecalc to GitHub Pages` to finish successfully.
5. Open the generated URL from **Settings → Pages** and verify tabs + icons.

---

## Make dosecalc downloadable on all devices

Once deployed on GitHub Pages with HTTPS, dosecalc works as an installable web app (PWA).

### Android phones/tablets (Chrome/Edge)

- Open `https://bernmoreno.github.io/dosecalc/`
- Tap **Install App** (inside app header) or browser menu → **Install app**
- App appears on home screen and app drawer

### iPhone / iPad (Safari)

- Open `https://bernmoreno.github.io/dosecalc/` in Safari
- Tap **Share**
- Tap **Add to Home Screen**
- The app opens like a standalone app icon

### Desktop / Laptop (Windows, macOS, Chromebook)

- Open `https://bernmoreno.github.io/dosecalc/` in Chrome or Edge
- Click the **Install** icon in the address bar (or app menu)
- App installs as a standalone desktop app window

### Works offline after first load

- The service worker caches app shell files after first successful online load
- If network is lost later, users can still open the installed app

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
