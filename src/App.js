import React, { useState } from "react";
import {
  FaCalculator,
  FaExchangeAlt,
  FaHistory,
  FaBaby,
  FaWeight,
  FaCog,
  FaPills,
  FaThList
} from "react-icons/fa";
import DoseCalcCalculatorTab from "./tabs/DoseCalcCalculatorTab";
import ConvertTab from "./tabs/ConvertTab";
import SavedDataTab from "./tabs/SavedDataTab";
import ByAgeTab from "./tabs/ByAgeTab";
import ByWeightTab from "./tabs/ByWeightTab";
import SettingsTab from "./tabs/SettingsTab";
import MedicationCategoriesTab from "./tabs/MedicationCategoriesTab";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("calculator");
  const [convertMedicationId, setConvertMedicationId] = useState("");
  const [calculatorMedicationId, setCalculatorMedicationId] = useState("");

  const handleConvertMedication = (medicationId) => {
    setConvertMedicationId(medicationId);
    setActiveTab("convert");
  };

  const handleCalculateMedication = (medicationId) => {
    setCalculatorMedicationId(medicationId);
    setActiveTab("calculator");
  };

  return (
    <div className="app-root">
      <header className="app-header">
        <h1>dosecalc</h1>
        <p className="app-subtitle">Medication reference and conversion — guidance only.</p>
      </header>

      <nav className="app-tabs" aria-label="Main tabs">
        <button
          type="button"
          className={`tab-btn tab-calculator ${activeTab === "calculator" ? "is-active" : ""}`}
          onClick={() => setActiveTab("calculator")}
          aria-current={activeTab === "calculator" ? "page" : undefined}
        ><FaCalculator /> Calculator</button>
        <button
          type="button"
          className={`tab-btn tab-convert ${activeTab === "convert" ? "is-active" : ""}`}
          onClick={() => setActiveTab("convert")}
          aria-current={activeTab === "convert" ? "page" : undefined}
        ><FaExchangeAlt /> Convert</button>
        <button
          type="button"
          className={`tab-btn tab-saved ${activeTab === "saved" ? "is-active" : ""}`}
          onClick={() => setActiveTab("saved")}
          aria-current={activeTab === "saved" ? "page" : undefined}
        ><FaHistory /> Saved</button>
        <button
          type="button"
          className={`tab-btn tab-categories ${activeTab === "categories" ? "is-active" : ""}`}
          onClick={() => setActiveTab("categories")}
          aria-current={activeTab === "categories" ? "page" : undefined}
        ><FaThList /> Categories</button>
        <button
          type="button"
          className={`tab-btn tab-by-age ${activeTab === "byAge" ? "is-active" : ""}`}
          onClick={() => setActiveTab("byAge")}
          aria-current={activeTab === "byAge" ? "page" : undefined}
        ><FaBaby /> By Age</button>
        <button
          type="button"
          className={`tab-btn tab-by-weight ${activeTab === "byWeight" ? "is-active" : ""}`}
          onClick={() => setActiveTab("byWeight")}
          aria-current={activeTab === "byWeight" ? "page" : undefined}
        ><FaWeight /> By Weight</button>
        <button
          type="button"
          className={`tab-btn tab-settings ${activeTab === "settings" ? "is-active" : ""}`}
          onClick={() => setActiveTab("settings")}
          aria-current={activeTab === "settings" ? "page" : undefined}
        ><FaCog /> Settings</button>
      </nav>

      <main className="app-content">
        {activeTab === "calculator" && <DoseCalcCalculatorTab initialMedicationId={calculatorMedicationId} />}
        {activeTab === "convert" && <ConvertTab initialMedicationId={convertMedicationId} />}
        {activeTab === "saved" && <SavedDataTab />}
        {activeTab === "categories" && (
          <MedicationCategoriesTab
            onConvertMedication={handleConvertMedication}
            onCalculateMedication={handleCalculateMedication}
          />
        )}
        {activeTab === "byAge" && <ByAgeTab />}
        {activeTab === "byWeight" && <ByWeightTab />}
        {activeTab === "settings" && <SettingsTab />}
      </main>

      <footer className="app-footer">
        <small>
          <FaPills /> © {new Date().getFullYear()} Bernadette A Moreno — Owner & Developer of dosecalc.
        </small>
      </footer>
    </div>
  );
}

export default App;
