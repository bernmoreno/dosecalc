import React, { useEffect, useState } from "react";
import {
  FaHome,
  FaCalculator,
  FaExchangeAlt,
  FaHistory,
  FaBaby,
  FaWeight,
  FaCog,
  FaPills,
  FaThList,
  FaDownload
} from "react-icons/fa";
import DoseCalcCalculatorTab from "./tabs/DoseCalcCalculatorTab";
import ConvertTab from "./tabs/ConvertTab";
import SavedDataTab from "./tabs/SavedDataTab";
import ByAgeTab from "./tabs/ByAgeTab";
import ByWeightTab from "./tabs/ByWeightTab";
import SettingsTab from "./tabs/SettingsTab";
import MedicationCategoriesTab from "./tabs/MedicationCategoriesTab";
import MostCommonMedsTab from "./tabs/MostCommonMedsTab";
import PediatricMedsTab from "./tabs/PediatricMedsTab";
import MainPageTab from "./tabs/MainPageTab";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("main");
  const [convertMedicationId, setConvertMedicationId] = useState("");
  const [calculatorMedicationId, setCalculatorMedicationId] = useState("");
  const [deferredInstallPrompt, setDeferredInstallPrompt] = useState(null);
  const [canInstall, setCanInstall] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showManualInstallHint, setShowManualInstallHint] = useState(false);

  useEffect(() => {
    const standaloneMatch = window.matchMedia("(display-mode: standalone)");

    const refreshInstallState = () => {
      const standaloneFromSafari = window.navigator.standalone === true;
      setIsInstalled(standaloneMatch.matches || standaloneFromSafari);
    };

    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setDeferredInstallPrompt(event);
      setCanInstall(true);
      setShowManualInstallHint(false);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setCanInstall(false);
      setDeferredInstallPrompt(null);
      setShowManualInstallHint(false);
    };

    refreshInstallState();

    const iOS = /iphone|ipad|ipod/i.test(window.navigator.userAgent);
    const inStandalone = standaloneMatch.matches || window.navigator.standalone === true;
    setShowManualInstallHint(iOS && !inStandalone);

    if (standaloneMatch.addEventListener) {
      standaloneMatch.addEventListener("change", refreshInstallState);
    } else if (standaloneMatch.addListener) {
      standaloneMatch.addListener(refreshInstallState);
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      if (standaloneMatch.removeEventListener) {
        standaloneMatch.removeEventListener("change", refreshInstallState);
      } else if (standaloneMatch.removeListener) {
        standaloneMatch.removeListener(refreshInstallState);
      }

      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleConvertMedication = (medicationId) => {
    setConvertMedicationId(medicationId);
    setActiveTab("convert");
  };

  const handleCalculateMedication = (medicationId) => {
    setCalculatorMedicationId(medicationId);
    setActiveTab("calculator");
  };

  const handleInstallClick = async () => {
    if (!deferredInstallPrompt) return;

    deferredInstallPrompt.prompt();
    const choiceResult = await deferredInstallPrompt.userChoice;

    if (choiceResult.outcome !== "accepted") {
      setCanInstall(true);
      return;
    }

    setCanInstall(false);
    setDeferredInstallPrompt(null);
  };

  return (
    <div className="app-root">
      <header className="app-header">
        <h1>dosecalc</h1>
        <p className="app-subtitle">Medication reference and conversion — guidance only.</p>
        <div className="install-row" role="status" aria-live="polite">
          {canInstall && !isInstalled && (
            <button type="button" className="secondary-btn install-btn" onClick={handleInstallClick}>
              <FaDownload /> Install App
            </button>
          )}
          {!canInstall && !isInstalled && showManualInstallHint && (
            <span className="install-hint">iPhone/iPad: Share → Add to Home Screen</span>
          )}
          {isInstalled && <span className="install-hint">App installed ✓</span>}
        </div>
      </header>

      <nav className="app-tabs" aria-label="Main tabs">
        <button
          type="button"
          className={`tab-btn tab-main ${activeTab === "main" ? "is-active" : ""}`}
          onClick={() => setActiveTab("main")}
          aria-current={activeTab === "main" ? "page" : undefined}
        ><FaHome /> Main</button>
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
          className={`tab-btn tab-common ${activeTab === "common" ? "is-active" : ""}`}
          onClick={() => setActiveTab("common")}
          aria-current={activeTab === "common" ? "page" : undefined}
        ><FaPills /> Most Common</button>
        <button
          type="button"
          className={`tab-btn tab-pediatric ${activeTab === "pediatric" ? "is-active" : ""}`}
          onClick={() => setActiveTab("pediatric")}
          aria-current={activeTab === "pediatric" ? "page" : undefined}
        ><FaBaby /> Pediatric Meds</button>
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
        {activeTab === "main" && <MainPageTab initialCalculatorMedicationId={calculatorMedicationId} />}
        {activeTab === "calculator" && <DoseCalcCalculatorTab initialMedicationId={calculatorMedicationId} />}
        {activeTab === "convert" && <ConvertTab initialMedicationId={convertMedicationId} />}
        {activeTab === "saved" && <SavedDataTab />}
        {activeTab === "common" && <MostCommonMedsTab />}
        {activeTab === "pediatric" && <PediatricMedsTab />}
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
