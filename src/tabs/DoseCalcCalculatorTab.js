import React, { useEffect, useMemo, useState } from "react";
import { MEDICATION_CATEGORIES, PATIENT_ICON_GUIDE } from "../data/medications";
import DoseCalcMedicationDropdown from "../components/DoseCalcMedicationDropdown";
import { calculateRecommendedDose, calculateBSA, getDiagnosisGuidance, lbToKg } from "../utils/dosing";

const STORAGE_KEY = "dosecalc_entries";

function anonymizePatientName(name) {
  const cleaned = String(name ?? "").trim();
  if (!cleaned) return "Anonymous Patient";
  const parts = cleaned.split(/\s+/).filter(Boolean);
  const initials = parts.slice(0, 3).map((p) => p[0]?.toUpperCase() ?? "").join("");
  return initials ? `Patient ${initials}` : "Anonymous Patient";
}

function parseSolidStrengthOption(strength, formType, medicationForms = []) {
  const formsLower = medicationForms.map((form) => String(form).toLowerCase());
  const strengthLower = String(strength).toLowerCase();
  const match = strength.match(/(\d+(\.\d+)?)\s*mg/i);
  if (!match) return null;

  const formMatcher = {
    tablet: /\btab(let)?s?\b/i,
    pill: /\bpills?\b/i,
    capsule: /\bcapsules?\b/i
  };

  const explicitOtherSolid = {
    tablet: /\bpills?\b|\bcapsules?\b/i,
    pill: /\btab(let)?s?\b|\bcapsules?\b/i,
    capsule: /\btab(let)?s?\b|\bpills?\b/i
  };

  const explicitMatch = formMatcher[formType]?.test(strengthLower) ?? false;
  const hasFormInMedication = formsLower.some((form) => form.includes(formType));
  const appearsLiquid = /mg\s*\/\s*\d+(\.\d+)?\s*mL/i.test(strength) || /liquid|syrup|suspension/i.test(strength);
  const appearsOtherSolid = explicitOtherSolid[formType]?.test(strengthLower) ?? false;

  if (appearsLiquid) return null;
  if (!explicitMatch && (!hasFormInMedication || appearsOtherSolid)) return null;

  return {
    key: `${formType}-${strength}`,
    label: strength,
    mg: Number(match[1])
  };
}

function parseLiquidStrengthOption(strength, medicationForms = []) {
  const formsLower = medicationForms.map((form) => String(form).toLowerCase());
  const hasLiquidFormInMedication = formsLower.includes("liquid");
  const match = strength.match(/(\d+(\.\d+)?)\s*mg\s*\/\s*(\d+(\.\d+)?)\s*mL/i);
  const isLiquid = /liquid|syrup|suspension/i.test(strength) || /mg\s*\/\s*\d+(\.\d+)?\s*mL/i.test(strength);
  if ((!isLiquid && !hasLiquidFormInMedication) || !match) return null;
  const mg = Number(match[1]);
  const ml = Number(match[3]);
  if (!Number.isFinite(mg) || !Number.isFinite(ml) || ml <= 0) return null;
  return {
    key: `liquid-${strength}`,
    label: strength,
    mgPerMl: mg / ml
  };
}

export default function DoseCalcCalculatorTab({
  initialMedicationId = "",
  medicationCategories = MEDICATION_CATEGORIES,
  heading = "Calculator",
  description = "Calculates dose by age + weight using mg/kg/day logic, then splits by doses/day and converts to tablets or liquid where available.",
  medicationLabel = "Medication"
}) {
  const [selectedMedicationId, setSelectedMedicationId] = useState("");
  const [selectedSolidStrengthKey, setSelectedSolidStrengthKey] = useState("");
  const [selectedAnyStrengthKey, setSelectedAnyStrengthKey] = useState("");
  const [selectedTabletStrengthKey, setSelectedTabletStrengthKey] = useState("");
  const [selectedPillStrengthKey, setSelectedPillStrengthKey] = useState("");
  const [selectedCapsuleStrengthKey, setSelectedCapsuleStrengthKey] = useState("");
  const [selectedLiquidStrengthKey, setSelectedLiquidStrengthKey] = useState("");
  const [selectedDiagnosisId, setSelectedDiagnosisId] = useState("");
  const [patientFullName, setPatientFullName] = useState("");
  const [allowFullNameStorage, setAllowFullNameStorage] = useState(false);
  const [ageYears, setAgeYears] = useState(8);
  const [weightValue, setWeightValue] = useState(25);
  const [weightUnit, setWeightUnit] = useState("kg");
  const [frequencyPerDay, setFrequencyPerDay] = useState(2);
  const [heightCm, setHeightCm] = useState(120);
  const [savedMessage, setSavedMessage] = useState("");
  const [summaryMessage, setSummaryMessage] = useState("");
  const [showResult, setShowResult] = useState(false);

  const selectedMedication = useMemo(() => {
    for (const category of medicationCategories) {
      const found = category.medications.find((med) => med.id === selectedMedicationId);
      if (found) {
        return {
          ...found,
          categoryId: category.id,
          categoryName: category.category,
          categoryIcon: category.icon
        };
      }
    }
    return null;
  }, [selectedMedicationId, medicationCategories]);

  const diagnosisGuidanceOptions = useMemo(
    () => (selectedMedication ? getDiagnosisGuidance(selectedMedication.id) : []),
    [selectedMedication]
  );

  const selectedDiagnosisGuidance = useMemo(
    () => diagnosisGuidanceOptions.find((option) => option.id === selectedDiagnosisId) ?? null,
    [diagnosisGuidanceOptions, selectedDiagnosisId]
  );

  const tabletStrengthOptions = useMemo(() => {
    const strengths = selectedMedication?.strengths ?? [];
    const forms = selectedMedication?.forms ?? [];
    return strengths.map((strength) => parseSolidStrengthOption(strength, "tablet", forms)).filter(Boolean);
  }, [selectedMedication]);

  const pillStrengthOptions = useMemo(() => {
    const strengths = selectedMedication?.strengths ?? [];
    const forms = selectedMedication?.forms ?? [];
    return strengths.map((strength) => parseSolidStrengthOption(strength, "pill", forms)).filter(Boolean);
  }, [selectedMedication]);

  const capsuleStrengthOptions = useMemo(() => {
    const strengths = selectedMedication?.strengths ?? [];
    const forms = selectedMedication?.forms ?? [];
    return strengths.map((strength) => parseSolidStrengthOption(strength, "capsule", forms)).filter(Boolean);
  }, [selectedMedication]);

  const allStrengthOptions = useMemo(
    () => (selectedMedication?.strengths ?? []).map((strength) => ({ key: strength, label: strength })),
    [selectedMedication]
  );

  const liquidStrengthOptions = useMemo(() => {
    const strengths = selectedMedication?.strengths ?? [];
    const forms = selectedMedication?.forms ?? [];
    return strengths.map((strength) => parseLiquidStrengthOption(strength, forms)).filter(Boolean);
  }, [selectedMedication]);

  const selectedTabletStrength = useMemo(
    () => tabletStrengthOptions.find((option) => option.key === selectedTabletStrengthKey) ?? null,
    [tabletStrengthOptions, selectedTabletStrengthKey]
  );

  const selectedPillStrength = useMemo(
    () => pillStrengthOptions.find((option) => option.key === selectedPillStrengthKey) ?? null,
    [pillStrengthOptions, selectedPillStrengthKey]
  );

  const selectedCapsuleStrength = useMemo(
    () => capsuleStrengthOptions.find((option) => option.key === selectedCapsuleStrengthKey) ?? null,
    [capsuleStrengthOptions, selectedCapsuleStrengthKey]
  );

  const selectedLegacySolidStrength = useMemo(() => {
    if (!selectedSolidStrengthKey) return null;
    const combined = [...tabletStrengthOptions, ...pillStrengthOptions, ...capsuleStrengthOptions];
    return combined.find((option) => option.key === selectedSolidStrengthKey) ?? null;
  }, [tabletStrengthOptions, pillStrengthOptions, capsuleStrengthOptions, selectedSolidStrengthKey]);

  const selectedSolidStrength = selectedTabletStrength ?? selectedPillStrength ?? selectedCapsuleStrength ?? selectedLegacySolidStrength ?? null;

  const selectedLiquidStrength = useMemo(
    () => liquidStrengthOptions.find((option) => option.key === selectedLiquidStrengthKey) ?? null,
    [liquidStrengthOptions, selectedLiquidStrengthKey]
  );

  const selectedSolidFormLabel = selectedTabletStrength
    ? "tablet"
    : selectedPillStrength
      ? "pill"
      : selectedCapsuleStrength
        ? "capsule"
        : "solid unit";

  useEffect(() => {
    if (!initialMedicationId) return;
    let exists = false;
    for (const category of medicationCategories) {
      if (category.medications.some((med) => med.id === initialMedicationId)) {
        exists = true;
        break;
      }
    }
    if (exists) {
      setSelectedMedicationId(initialMedicationId);
    }
  }, [initialMedicationId, medicationCategories]);

  const weightKg = useMemo(() => {
    if (!Number.isFinite(weightValue) || weightValue <= 0) return NaN;
    return weightUnit === "lb" ? lbToKg(weightValue) : weightValue;
  }, [weightUnit, weightValue]);

  const calculation = useMemo(
    () => calculateRecommendedDose({
      medication: selectedMedication,
      weightKg,
      ageYears,
      frequencyPerDay,
      diagnosisId: selectedDiagnosisId,
      tabletStrengthMgOverride: selectedSolidStrength?.mg,
      liquidConcentrationMgPerMlOverride: selectedLiquidStrength?.mgPerMl
    }),
    [selectedMedication, weightKg, ageYears, frequencyPerDay, selectedDiagnosisId, selectedSolidStrength, selectedLiquidStrength]
  );

  const bsa = useMemo(() => calculateBSA(weightKg, heightCm), [weightKg, heightCm]);

  useEffect(() => {
    setShowResult(false);
  }, [selectedMedicationId, selectedDiagnosisId, selectedAnyStrengthKey, selectedTabletStrengthKey, selectedPillStrengthKey, selectedCapsuleStrengthKey, selectedLiquidStrengthKey, patientFullName, allowFullNameStorage, ageYears, weightValue, weightUnit, frequencyPerDay, heightCm]);

  useEffect(() => {
    if (diagnosisGuidanceOptions.length > 0) {
      if (!diagnosisGuidanceOptions.some((option) => option.id === selectedDiagnosisId)) {
        setSelectedDiagnosisId(diagnosisGuidanceOptions[0].id);
      }
    } else if (selectedDiagnosisId) {
      setSelectedDiagnosisId("");
    }
  }, [diagnosisGuidanceOptions, selectedDiagnosisId]);

  useEffect(() => {
    if (allStrengthOptions.length > 0 && !allStrengthOptions.some((option) => option.key === selectedAnyStrengthKey)) {
      setSelectedAnyStrengthKey(allStrengthOptions[0].key);
    }
    if (allStrengthOptions.length === 0) {
      setSelectedAnyStrengthKey("");
    }

    if (tabletStrengthOptions.length > 0 && !tabletStrengthOptions.some((option) => option.key === selectedTabletStrengthKey)) {
      setSelectedTabletStrengthKey(tabletStrengthOptions[0].key);
    }
    if (tabletStrengthOptions.length === 0) {
      setSelectedTabletStrengthKey("");
    }

    if (pillStrengthOptions.length > 0 && !pillStrengthOptions.some((option) => option.key === selectedPillStrengthKey)) {
      setSelectedPillStrengthKey(pillStrengthOptions[0].key);
    }
    if (pillStrengthOptions.length === 0) {
      setSelectedPillStrengthKey("");
    }

    if (capsuleStrengthOptions.length > 0 && !capsuleStrengthOptions.some((option) => option.key === selectedCapsuleStrengthKey)) {
      setSelectedCapsuleStrengthKey(capsuleStrengthOptions[0].key);
    }
    if (capsuleStrengthOptions.length === 0) {
      setSelectedCapsuleStrengthKey("");
    }

    if (liquidStrengthOptions.length > 0 && !liquidStrengthOptions.some((option) => option.key === selectedLiquidStrengthKey)) {
      setSelectedLiquidStrengthKey(liquidStrengthOptions[0].key);
    }
    if (liquidStrengthOptions.length === 0) {
      setSelectedLiquidStrengthKey("");
    }

    const legacySolidOptions = [...tabletStrengthOptions, ...pillStrengthOptions, ...capsuleStrengthOptions];
    if (legacySolidOptions.length > 0 && !legacySolidOptions.some((option) => option.key === selectedSolidStrengthKey)) {
      setSelectedSolidStrengthKey(legacySolidOptions[0].key);
    }
    if (legacySolidOptions.length === 0) {
      setSelectedSolidStrengthKey("");
    }
  }, [
    allStrengthOptions,
    tabletStrengthOptions,
    pillStrengthOptions,
    capsuleStrengthOptions,
    liquidStrengthOptions,
    selectedSolidStrengthKey,
    selectedAnyStrengthKey,
    selectedTabletStrengthKey,
    selectedPillStrengthKey,
    selectedCapsuleStrengthKey,
    selectedLiquidStrengthKey
  ]);

  const saveResult = () => {
    if (!calculation.ok || !selectedMedication) return;
    const patientName = patientFullName.trim() || "Unknown Patient";
    const protectedPatientName = allowFullNameStorage ? patientName : anonymizePatientName(patientName);
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    const entry = {
      id: `${Date.now()}-${selectedMedication.id}`,
      createdAt: new Date().toISOString(),
      patientFullName: protectedPatientName,
      medicationId: selectedMedication.id,
      medication: selectedMedication.generic,
      ageYears,
      weightKg: Number.isFinite(weightKg) ? Number(weightKg.toFixed(2)) : null,
      result: `${calculation.dosePerAdministrationMg} mg/dose x ${calculation.frequencyPerDay}/day = ${calculation.totalDailyDoseMg} mg/day`
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify([entry, ...existing].slice(0, 50)));
    setSavedMessage(allowFullNameStorage
      ? "Saved to Saved Results tab."
      : "Saved to Saved Results tab with de-identified patient name.");
  };

  const summaryText = useMemo(() => {
    if (!selectedMedication || !calculation.ok) return "";

    const summaryPatientName = allowFullNameStorage
      ? (patientFullName.trim() || "Unknown Patient")
      : anonymizePatientName(patientFullName);

    return [
      "dosecalc medication summary",
      `Generated: ${new Date().toLocaleString()}`,
      "",
      `Patient: ${summaryPatientName}`,
      `Medication: ${selectedMedication.generic}`,
      `Used for: ${selectedDiagnosisGuidance?.purpose ?? selectedMedication.commonUse ?? "n/a"}`,
      `Diagnosis: ${selectedDiagnosisGuidance?.diagnosis ?? selectedMedication.diagnoses?.join(" • ") ?? "n/a"}`,
      `Category: ${selectedMedication.categoryName ?? "N/A"}`,
      `Age: ${ageYears} years`,
      `Weight: ${Number.isFinite(weightKg) ? `${weightKg.toFixed(2)} kg` : "n/a"}`,
      `Dose frequency: ${calculation.frequencyPerDay} times/day`,
      `Total daily dose: ${calculation.totalDailyDoseMg} mg/day`,
      `Per dose: ${calculation.dosePerAdministrationMg} mg/dose`,
      selectedTabletStrength?.label ? `Selected tablet strength: ${selectedTabletStrength.label}` : "Selected tablet strength: n/a",
      selectedPillStrength?.label ? `Selected pill strength: ${selectedPillStrength.label}` : "Selected pill strength: n/a",
      selectedCapsuleStrength?.label ? `Selected capsule strength: ${selectedCapsuleStrength.label}` : "Selected capsule strength: n/a",
      selectedLiquidStrength?.label ? `Selected liquid strength: ${selectedLiquidStrength.label}` : "Selected liquid strength: n/a",
      calculation.tabletsPerDose != null
        ? `Solid-form estimate: ${calculation.tabletsPerDose} ${selectedSolidFormLabel}${calculation.tabletsPerDose === 1 ? "" : "s"}/dose (${calculation.tabletStrengthMg} mg each)`
        : "Solid-form estimate: n/a",
      calculation.liquidMlPerDose != null
        ? `Liquid conversion: ${calculation.liquidMlPerDose} mL/dose (${calculation.liquidConcentrationMgPerMl} mg/mL)`
        : "Liquid conversion: n/a",
      selectedDiagnosisGuidance?.referenceRange ? `Diagnosis dose reference: ${selectedDiagnosisGuidance.referenceRange}` : null,
      selectedDiagnosisGuidance?.note ? `Diagnosis note: ${selectedDiagnosisGuidance.note}` : null,
      `Reference range: ${selectedMedication.dosingRange}`,
      Number.isFinite(bsa) ? `BSA: ${bsa.toFixed(2)} m²` : "BSA: n/a",
      "",
      "Pediatric reference rules",
      `Clark: ${calculation.pediatricRules.clarkRuleDailyMg ?? "n/a"} mg/day`,
      `Fried: ${calculation.pediatricRules.friedRuleDailyMg ?? "n/a"} mg/day`,
      `Young: ${calculation.pediatricRules.youngRuleDailyMg ?? "n/a"} mg/day`,
      "",
      "Safety notice: Educational calculation support only. Verify with licensed clinician/pharmacist and official label/protocol.",
      "Final note: Review medication guide now."
    ].join("\n");
  }, [
    selectedMedication,
    calculation,
    selectedDiagnosisGuidance,
    ageYears,
    weightKg,
    bsa,
    patientFullName,
    allowFullNameStorage,
    selectedTabletStrength,
    selectedPillStrength,
    selectedCapsuleStrength,
    selectedLiquidStrength,
    selectedSolidFormLabel
  ]);

  const downloadSummary = () => {
    if (!summaryText) return;
    const blob = new Blob([summaryText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const safeName = (patientFullName.trim() || "patient")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    a.download = `dosecalc-summary-${safeName}-${selectedMedication?.id ?? "medication"}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    setSummaryMessage("Summary downloaded.");
  };

  const copySummary = async () => {
    if (!summaryText) return;
    try {
      await navigator.clipboard.writeText(summaryText);
      setSummaryMessage("Summary copied to clipboard.");
    } catch {
      setSummaryMessage("Unable to copy automatically. Please use Download instead.");
    }
  };

  const printSummary = () => {
    if (!summaryText) return;
    const printWindow = window.open("", "_blank", "width=900,height=700");
    if (!printWindow) {
      setSummaryMessage("Popup blocked. Allow popups to print summary.");
      return;
    }
    printWindow.document.write(`<pre style="font:14px/1.5 Arial,sans-serif;white-space:pre-wrap;">${summaryText.replace(/</g, "&lt;")}</pre>`);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <section>
      <h2>{heading}</h2>
      <p className="muted">
        {description}
      </p>

      <div className="patient-icon-guide" aria-label="Age and patient icons">
        {PATIENT_ICON_GUIDE.map((item) => (
          <span key={item.id} className="icon-guide-chip" title={item.label}>{item.icon} {item.label}</span>
        ))}
      </div>

      <DoseCalcMedicationDropdown value={selectedMedicationId} onChange={setSelectedMedicationId} label={medicationLabel} medicationCategories={medicationCategories} />

      {diagnosisGuidanceOptions.length > 0 && (
        <label className="field diagnosis-field">
          <span>Diagnosis / antibiotic use</span>
          <select value={selectedDiagnosisId} onChange={(e) => setSelectedDiagnosisId(e.target.value)}>
            {diagnosisGuidanceOptions.map((option) => (
              <option key={option.id} value={option.id}>{option.diagnosis}</option>
            ))}
          </select>
          <small className="muted diagnosis-helper">
            {selectedDiagnosisGuidance?.purpose}
          </small>
        </label>
      )}

      <div className="form-grid">
        <label className="field">
          <span>Patient full name</span>
          <input
            type="text"
            value={patientFullName}
            onChange={(e) => setPatientFullName(e.target.value)}
            placeholder="Enter patient full name"
          />
        </label>

        <label className="field">
          <span>Data protection</span>
          <label className="privacy-toggle">
            <input
              type="checkbox"
              checked={allowFullNameStorage}
              onChange={(e) => setAllowFullNameStorage(e.target.checked)}
            />
            Allow saving full patient name in this browser
          </label>
        </label>

        <label className="field">
          <span>Age (years)</span>
          <input
            type="number"
            min="0"
            step="0.1"
            value={ageYears === 0 ? "" : ageYears}
            onChange={(e) => setAgeYears(e.target.value === "" ? 0 : Number(e.target.value))}
          />
        </label>

        <label className="field">
          <span>Weight</span>
          <input
            type="number"
            min="0"
            step="0.1"
            value={weightValue === 0 ? "" : weightValue}
            onChange={(e) => setWeightValue(e.target.value === "" ? 0 : Number(e.target.value))}
          />
        </label>

        <label className="field">
          <span>Weight unit</span>
          <select value={weightUnit} onChange={(e) => setWeightUnit(e.target.value)}>
            <option value="kg">kg</option>
            <option value="lb">lb</option>
          </select>
        </label>

        <label className="field">
          <span>Doses per day</span>
          <input type="number" min="1" step="1" value={frequencyPerDay} onChange={(e) => setFrequencyPerDay(Number(e.target.value))} />
        </label>

        <label className="field">
          <span>All available medication strengths</span>
          <select value={selectedAnyStrengthKey} onChange={(e) => setSelectedAnyStrengthKey(e.target.value)} disabled={allStrengthOptions.length === 0}>
            {allStrengthOptions.length > 0 ? (
              allStrengthOptions.map((option) => (
                <option key={option.key} value={option.key}>{option.label}</option>
              ))
            ) : (
              <option value="">No strengths listed</option>
            )}
          </select>
        </label>

        <label className="field">
          <span>Tablet strengths</span>
          <select value={selectedTabletStrengthKey} onChange={(e) => setSelectedTabletStrengthKey(e.target.value)} disabled={tabletStrengthOptions.length === 0}>
            {tabletStrengthOptions.length > 0 ? (
              tabletStrengthOptions.map((option) => (
                <option key={option.key} value={option.key}>{option.label}</option>
              ))
            ) : (
              <option value="">No tablet strengths listed</option>
            )}
          </select>
        </label>

        <label className="field">
          <span>Pill strengths</span>
          <select value={selectedPillStrengthKey} onChange={(e) => setSelectedPillStrengthKey(e.target.value)} disabled={pillStrengthOptions.length === 0}>
            {pillStrengthOptions.length > 0 ? (
              pillStrengthOptions.map((option) => (
                <option key={option.key} value={option.key}>{option.label}</option>
              ))
            ) : (
              <option value="">No pill strengths listed</option>
            )}
          </select>
        </label>

        <label className="field">
          <span>Capsule strengths</span>
          <select value={selectedCapsuleStrengthKey} onChange={(e) => setSelectedCapsuleStrengthKey(e.target.value)} disabled={capsuleStrengthOptions.length === 0}>
            {capsuleStrengthOptions.length > 0 ? (
              capsuleStrengthOptions.map((option) => (
                <option key={option.key} value={option.key}>{option.label}</option>
              ))
            ) : (
              <option value="">No capsule strengths listed</option>
            )}
          </select>
        </label>

        <label className="field">
          <span>Liquid strength for conversion</span>
          <select value={selectedLiquidStrengthKey} onChange={(e) => setSelectedLiquidStrengthKey(e.target.value)} disabled={liquidStrengthOptions.length === 0}>
            {liquidStrengthOptions.length > 0 ? (
              liquidStrengthOptions.map((option) => (
                <option key={option.key} value={option.key}>{option.label}</option>
              ))
            ) : (
              <option value="">No liquid strengths listed</option>
            )}
          </select>
        </label>

        <label className="field">
          <span>Height (cm) for BSA</span>
          <input type="number" min="20" step="0.1" value={heightCm} onChange={(e) => setHeightCm(Number(e.target.value))} />
        </label>
      </div>

      <div className="button-row">
        <button
          type="button"
          className="primary-btn"
          onClick={() => setShowResult(true)}
          disabled={!selectedMedication || !calculation.ok}
        >
          Show result
        </button>
      </div>

      {selectedMedication && calculation.ok && showResult ? (
        <div className="card">
          <h3>{selectedMedication.generic}</h3>
          <p><strong>Used for:</strong> {selectedDiagnosisGuidance?.purpose ?? selectedMedication.commonUse}</p>
          {selectedDiagnosisGuidance && <p><strong>Diagnosis selected:</strong> {selectedDiagnosisGuidance.diagnosis}</p>}
          <p><strong>Patient:</strong> {patientFullName.trim() || "Unknown Patient"}</p>
          {!allowFullNameStorage && <p className="muted"><strong>Privacy:</strong> Saved records use de-identified patient name by default.</p>}
          <p><strong>Category:</strong> {selectedMedication.categoryName ?? "N/A"}</p>
          <p><strong>Age group:</strong> {calculation.ageGroup?.icon} {calculation.ageGroup?.label}</p>
          <p><strong>Method:</strong> {calculation.usedWeightBased ? "Weight-based (mg/kg/day)" : "Adult/fixed profile"}</p>
          <p><strong>Total daily dose:</strong> {calculation.totalDailyDoseMg} mg/day</p>
          <p><strong>Per dose:</strong> {calculation.dosePerAdministrationMg} mg every {Math.round(24 / calculation.frequencyPerDay)} hours</p>
          <p><strong>Selected tablet strength:</strong> {selectedTabletStrength?.label ?? "n/a"}</p>
          <p><strong>Selected pill strength:</strong> {selectedPillStrength?.label ?? "n/a"}</p>
          <p><strong>Selected capsule strength:</strong> {selectedCapsuleStrength?.label ?? "n/a"}</p>
          <p><strong>Selected liquid strength:</strong> {selectedLiquidStrength?.label ?? "n/a"}</p>

          {calculation.tabletsPerDose != null && (
            <p><strong>Solid-form estimate:</strong> {calculation.tabletsPerDose} {selectedSolidFormLabel}{calculation.tabletsPerDose === 1 ? "" : "s"}/dose ({calculation.tabletStrengthMg} mg each)</p>
          )}

          {calculation.liquidMlPerDose != null && (
            <p><strong>Liquid estimate:</strong> {calculation.liquidMlPerDose} mL/dose ({calculation.liquidConcentrationMgPerMl} mg/mL)</p>
          )}

          <p><strong>Reference range:</strong> {selectedMedication.dosingRange}</p>
          {selectedDiagnosisGuidance?.referenceRange && <p><strong>Diagnosis dose reference:</strong> {selectedDiagnosisGuidance.referenceRange}</p>}
          {selectedDiagnosisGuidance?.note && <p className="muted"><strong>Diagnosis note:</strong> {selectedDiagnosisGuidance.note}</p>}
          <p><strong>BSA (Mosteller):</strong> {Number.isFinite(bsa) ? `${bsa.toFixed(2)} m²` : "Enter valid height/weight"}</p>

          <div className="rule-grid">
            <div><strong>Clark’s rule:</strong> {calculation.pediatricRules.clarkRuleDailyMg ?? "n/a"} mg/day</div>
            <div><strong>Fried’s rule:</strong> {calculation.pediatricRules.friedRuleDailyMg ?? "n/a"} mg/day</div>
            <div><strong>Young’s rule:</strong> {calculation.pediatricRules.youngRuleDailyMg ?? "n/a"} mg/day</div>
          </div>

          <button type="button" className="primary-btn" onClick={saveResult}>Save result</button>
          {savedMessage && <p className="muted">{savedMessage}</p>}

          <div className="summary-panel">
            <h4>Prescription Summary</h4>
            <pre>{summaryText}</pre>
            <div className="button-row">
              <button type="button" className="primary-btn" onClick={downloadSummary}>Download Summary</button>
              <button type="button" className="secondary-btn" onClick={copySummary}>Copy Summary</button>
              <button type="button" className="secondary-btn" onClick={printSummary}>Print Summary</button>
            </div>
            {summaryMessage && <p className="muted">{summaryMessage}</p>}
          </div>

          <p className="warning-note">
            Safety notice: educational calculations only. Always verify against official product labeling and institutional protocols.
          </p>
        </div>
      ) : selectedMedication && !calculation.ok ? (
        <p className="muted">{calculation.reason}</p>
      ) : selectedMedication ? (
        <p className="muted">Click <strong>Show result</strong> to display the calculation.</p>
      ) : (
        <p className="muted">Choose a medication and enter age/weight to compute a dose.</p>
      )}
    </section>
  );
}
