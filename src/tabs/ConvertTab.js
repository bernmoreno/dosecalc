import React, { useEffect, useMemo, useState } from "react";
import { MEDICATION_CATEGORIES } from "../data/medications";
import { convertDoseToForms, getDosingProfile } from "../utils/dosing";

function parseSolidStrengthOption(strength, formType, medicationForms = []) {
  const formsLower = medicationForms.map((form) => String(form).toLowerCase());
  const strengthLower = String(strength).toLowerCase();
  const solidMatch = strength.match(/(\d+(\.\d+)?)\s*mg/i);
  if (!solidMatch) return null;

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
    mg: Number(solidMatch[1])
  };
}

function parseLiquidStrengthOption(strength, medicationForms = []) {
  const formsLower = medicationForms.map((form) => String(form).toLowerCase());
  const hasLiquidFormInMedication = formsLower.some((form) => form.includes("liquid"));
  const liquidMatch = strength.match(/(\d+(\.\d+)?)\s*mg\s*\/\s*(\d+(\.\d+)?)\s*mL/i);
  const isLiquid = /liquid|syrup|suspension/i.test(strength) || /mg\s*\/\s*\d+(\.\d+)?\s*mL/i.test(strength);
  if ((!isLiquid && !hasLiquidFormInMedication) || !liquidMatch) return null;
  const mg = Number(liquidMatch[1]);
  const ml = Number(liquidMatch[3]);
  if (!Number.isFinite(mg) || !Number.isFinite(ml) || ml <= 0) return null;
  return {
    key: `liquid-${strength}`,
    label: strength,
    mgPerMl: mg / ml
  };
}

export default function ConvertTab({ initialMedicationId = "" }) {
  const allMedications = useMemo(
    () => MEDICATION_CATEGORIES.flatMap((category) => category.medications.map((medication) => ({ ...medication, category: category.category }))),
    []
  );

  const [medicationId, setMedicationId] = useState(allMedications[0]?.id ?? "");
  const [totalDailyDoseMg, setTotalDailyDoseMg] = useState(500);
  const [frequencyPerDay, setFrequencyPerDay] = useState(2);
  const [tabletStrengthMg, setTabletStrengthMg] = useState(500);
  const [liquidConcentrationMgPerMl, setLiquidConcentrationMgPerMl] = useState(40);
  const [tabletCountPerDoseInput, setTabletCountPerDoseInput] = useState(1);
  const [liquidMlPerDoseInput, setLiquidMlPerDoseInput] = useState(5);
  const [sourceForm, setSourceForm] = useState("tablet");
  const [targetForm, setTargetForm] = useState("liquid");
  const [selectedTabletStrengthKey, setSelectedTabletStrengthKey] = useState("");
  const [selectedPillStrengthKey, setSelectedPillStrengthKey] = useState("");
  const [selectedCapsuleStrengthKey, setSelectedCapsuleStrengthKey] = useState("");
  const [selectedLiquidStrengthKey, setSelectedLiquidStrengthKey] = useState("");
  const [selectedAnyStrengthKey, setSelectedAnyStrengthKey] = useState("");
  const [showConversion, setShowConversion] = useState(false);

  const selectedMedication = allMedications.find((medication) => medication.id === medicationId) ?? null;

  useEffect(() => {
    if (!initialMedicationId) return;
    const exists = allMedications.some((medication) => medication.id === initialMedicationId);
    if (exists) setMedicationId(initialMedicationId);
  }, [initialMedicationId, allMedications]);

  const defaults = useMemo(() => {
    if (!selectedMedication) return null;
    const profile = getDosingProfile(selectedMedication.id) ?? {};
    return {
      defaultFrequencyPerDay: profile.defaultFrequencyPerDay ?? 1,
      defaultTabletMg: profile.tabletMg ?? null,
      defaultLiquidMgPerMl: profile.liquidMgPerMl ?? null
    };
  }, [selectedMedication]);

  const allStrengthOptions = useMemo(
    () => (selectedMedication?.strengths ?? []).map((strength) => ({ key: strength, label: strength })),
    [selectedMedication]
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

  const selectedLiquidStrength = useMemo(
    () => liquidStrengthOptions.find((option) => option.key === selectedLiquidStrengthKey) ?? null,
    [liquidStrengthOptions, selectedLiquidStrengthKey]
  );

  const selectedSolidStrength = useMemo(() => {
    if (sourceForm === "tablet") return selectedTabletStrength;
    if (sourceForm === "pill") return selectedPillStrength;
    if (sourceForm === "capsule") return selectedCapsuleStrength;

    if (targetForm === "tablet") return selectedTabletStrength;
    if (targetForm === "pill") return selectedPillStrength;
    if (targetForm === "capsule") return selectedCapsuleStrength;

    return selectedTabletStrength ?? selectedPillStrength ?? selectedCapsuleStrength ?? null;
  }, [sourceForm, targetForm, selectedTabletStrength, selectedPillStrength, selectedCapsuleStrength]);

  const targetFormOptions = useMemo(() => {
    if (sourceForm === "tablet") return ["liquid", "pill", "capsule"];
    if (sourceForm === "pill") return ["liquid", "tablet", "capsule"];
    if (sourceForm === "capsule") return ["liquid", "tablet", "pill"];
    return ["tablet", "pill", "capsule"];
  }, [sourceForm]);

  useEffect(() => {
    setTargetForm((current) => (targetFormOptions.includes(current) ? current : targetFormOptions[0]));
  }, [targetFormOptions]);

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
  }, [
    allStrengthOptions,
    tabletStrengthOptions,
    pillStrengthOptions,
    capsuleStrengthOptions,
    liquidStrengthOptions,
    selectedAnyStrengthKey,
    selectedTabletStrengthKey,
    selectedPillStrengthKey,
    selectedCapsuleStrengthKey,
    selectedLiquidStrengthKey
  ]);

  useEffect(() => {
    if (selectedSolidStrength?.mg) setTabletStrengthMg(selectedSolidStrength.mg);
  }, [selectedSolidStrength]);

  useEffect(() => {
    if (selectedLiquidStrength?.mgPerMl) setLiquidConcentrationMgPerMl(selectedLiquidStrength.mgPerMl);
  }, [selectedLiquidStrength]);

  const conversion = useMemo(
    () => convertDoseToForms({ totalDailyDoseMg, frequencyPerDay, tabletStrengthMg, liquidConcentrationMgPerMl }),
    [totalDailyDoseMg, frequencyPerDay, tabletStrengthMg, liquidConcentrationMgPerMl]
  );

  const directConversion = useMemo(() => {
    const safeFrequency = Number.isFinite(frequencyPerDay) && frequencyPerDay > 0 ? frequencyPerDay : 1;
    const tabletStrength = Number.isFinite(tabletStrengthMg) && tabletStrengthMg > 0 ? tabletStrengthMg : null;
    const liquidConcentration = Number.isFinite(liquidConcentrationMgPerMl) && liquidConcentrationMgPerMl > 0
      ? liquidConcentrationMgPerMl
      : null;

    if (!tabletStrength || !liquidConcentration) {
      return {
        ok: false,
        reason: "Select valid medication strengths for solid form and liquid form."
      };
    }

    if (sourceForm === "tablet" || sourceForm === "pill" || sourceForm === "capsule") {
      if (!Number.isFinite(tabletCountPerDoseInput) || tabletCountPerDoseInput <= 0) {
        return { ok: false, reason: "Enter tablet/pill/capsule count per dose greater than 0." };
      }

      const mgPerDose = tabletCountPerDoseInput * tabletStrength;
      const convertedDose = targetForm === "liquid" ? mgPerDose / liquidConcentration : mgPerDose / tabletStrength;

      return {
        ok: true,
        mgPerDose,
        sourceUnitsPerDose: tabletCountPerDoseInput,
        sourceForm,
        targetForm,
        convertedPerDose: convertedDose,
        mgPerDay: mgPerDose * safeFrequency,
        sourceUnitsPerDay: tabletCountPerDoseInput * safeFrequency,
        convertedPerDay: convertedDose * safeFrequency,
        frequency: safeFrequency
      };
    }

    if (!Number.isFinite(liquidMlPerDoseInput) || liquidMlPerDoseInput <= 0) {
      return { ok: false, reason: "Enter liquid mL per dose greater than 0." };
    }

    const mgPerDose = liquidMlPerDoseInput * liquidConcentration;
    const convertedDose = mgPerDose / tabletStrength;

    return {
      ok: true,
      mgPerDose,
      sourceUnitsPerDose: liquidMlPerDoseInput,
      sourceForm,
      targetForm,
      convertedPerDose: convertedDose,
      mgPerDay: mgPerDose * safeFrequency,
      sourceUnitsPerDay: liquidMlPerDoseInput * safeFrequency,
      convertedPerDay: convertedDose * safeFrequency,
      frequency: safeFrequency
    };
  }, [
    frequencyPerDay,
    tabletStrengthMg,
    liquidConcentrationMgPerMl,
    sourceForm,
    targetForm,
    tabletCountPerDoseInput,
    liquidMlPerDoseInput
  ]);

  const applyDefaults = () => {
    if (!defaults) return;
    setFrequencyPerDay(defaults.defaultFrequencyPerDay);
    if (defaults.defaultTabletMg) setTabletStrengthMg(defaults.defaultTabletMg);
    if (defaults.defaultLiquidMgPerMl) setLiquidConcentrationMgPerMl(defaults.defaultLiquidMgPerMl);
  };

  const handleShowConversion = () => {
    alert("double check input before submitting result");
    setShowConversion(true);
  };

  useEffect(() => {
    setShowConversion(false);
  }, [
    medicationId,
    selectedAnyStrengthKey,
    selectedTabletStrengthKey,
    selectedPillStrengthKey,
    selectedCapsuleStrengthKey,
    selectedLiquidStrengthKey,
    totalDailyDoseMg,
    frequencyPerDay,
    tabletStrengthMg,
    liquidConcentrationMgPerMl,
    sourceForm,
    targetForm,
    tabletCountPerDoseInput,
    liquidMlPerDoseInput
  ]);

  return (
    <section>
      <h2>Convert</h2>
      <p className="muted">Convert total daily dose and directly convert tablets/pills to liquid (and vice versa).</p>

      <div className="form-grid">
        <label className="field">
          <span>Medication</span>
          <select value={medicationId} onChange={(e) => setMedicationId(e.target.value)}>
            {allMedications.map((medication) => (
              <option key={medication.id} value={medication.id}>
                {medication.generic} ({medication.category}) — {medication.forms.join(", ")}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          <span>Total daily dose (mg/day)</span>
          <input type="number" min="0" step="0.1" value={totalDailyDoseMg} onChange={(e) => setTotalDailyDoseMg(Number(e.target.value))} />
        </label>

        <label className="field">
          <span>Doses per day</span>
          <input type="number" min="1" step="1" value={frequencyPerDay} onChange={(e) => setFrequencyPerDay(Number(e.target.value))} />
        </label>

        <label className="field">
          <span>Tablet strength (mg/tablet)</span>
          <input type="number" min="0" step="0.1" value={tabletStrengthMg} onChange={(e) => setTabletStrengthMg(Number(e.target.value))} />
        </label>

        <label className="field">
          <span>Liquid concentration (mg/mL)</span>
          <input type="number" min="0" step="0.01" value={liquidConcentrationMgPerMl} onChange={(e) => setLiquidConcentrationMgPerMl(Number(e.target.value))} />
        </label>
      </div>

      <div className="button-row">
        <button type="button" className="primary-btn" onClick={applyDefaults}>Use medication defaults</button>
        <button type="button" className="secondary-btn" onClick={handleShowConversion}>Show conversion</button>
      </div>

      {showConversion ? (
        <div className="card">
          <h3>Conversion Result</h3>
          <p><strong>Per dose:</strong> {conversion.dosePerAdministrationMg} mg</p>
          <p><strong>Schedule:</strong> {conversion.frequencyPerDay} times/day</p>

          {conversion.tabletsPerDose != null && (
            <p><strong>Tablets/Pills:</strong> {conversion.tabletsPerDose} per dose ({conversion.tabletsPerDay} per day)</p>
          )}

          {conversion.liquidMlPerDose != null && (
            <p><strong>Liquid:</strong> {conversion.liquidMlPerDose} mL/dose ({conversion.liquidMlPerDay} mL/day)</p>
          )}
        </div>
      ) : (
        <p className="muted">Tap <strong>Show conversion</strong> to view liquid and tablet/pill conversion results.</p>
      )}

      <div className="card">
        <h3>Tablet ⇄ Liquid Converter (Per Dose)</h3>
        <p className="muted">Choose source form and target form. Convert tablet/pill to liquid or liquid back to tablet/pill.</p>

        <div className="form-grid">
          <label className="field">
            <span>Source form</span>
            <select value={sourceForm} onChange={(e) => setSourceForm(e.target.value)}>
              <option value="tablet">Tablet</option>
              <option value="pill">Pill</option>
              <option value="capsule">Capsule</option>
              <option value="liquid">Liquid</option>
            </select>
          </label>

          <label className="field">
            <span>Target form</span>
            <select value={targetForm} onChange={(e) => setTargetForm(e.target.value)}>
              {targetFormOptions.map((option) => (
                <option key={option} value={option}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span>All medication strengths</span>
            <select value={selectedAnyStrengthKey} onChange={(e) => setSelectedAnyStrengthKey(e.target.value)}>
              {allStrengthOptions.length > 0 ? (
                allStrengthOptions.map((option) => (
                  <option key={option.key} value={option.key}>{option.label}</option>
                ))
              ) : (
                <option>No strengths listed</option>
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
                <option value="">No tablet strengths available</option>
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
                <option value="">No pill strengths available</option>
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
                <option value="">No capsule strengths available</option>
              )}
            </select>
          </label>

          <label className="field">
            <span>Liquid strength</span>
            <select value={selectedLiquidStrengthKey} onChange={(e) => setSelectedLiquidStrengthKey(e.target.value)}>
              {liquidStrengthOptions.length > 0 ? (
                liquidStrengthOptions.map((option) => (
                  <option key={option.key} value={option.key}>{option.label}</option>
                ))
              ) : (
                <option value="">No liquid strengths available</option>
              )}
            </select>
          </label>

          {sourceForm === "tablet" || sourceForm === "pill" || sourceForm === "capsule" ? (
            <label className="field">
              <span>Tablets/Pills/Capsules per dose</span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={tabletCountPerDoseInput}
                onChange={(e) => setTabletCountPerDoseInput(Number(e.target.value))}
              />
            </label>
          ) : (
            <label className="field">
              <span>Liquid mL per dose</span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={liquidMlPerDoseInput}
                onChange={(e) => setLiquidMlPerDoseInput(Number(e.target.value))}
              />
            </label>
          )}
        </div>

        {showConversion && directConversion.ok ? (
          <div className="result-stack">
            <p><strong>Equivalent mg per dose:</strong> {directConversion.mgPerDose.toFixed(2)} mg</p>
            <p>
              <strong>Source dose:</strong> {directConversion.sourceUnitsPerDose.toFixed(2)} {directConversion.sourceForm === "liquid" ? "mL" : `${directConversion.sourceForm}(s)`} per dose
            </p>
            <p>
              <strong>Converted dose:</strong> {directConversion.convertedPerDose.toFixed(2)} {directConversion.targetForm === "liquid" ? "mL" : `${directConversion.targetForm}(s)`} per dose
            </p>
            <p><strong>Daily totals ({directConversion.frequency} doses/day):</strong></p>
            <ul>
              <li>{directConversion.mgPerDay.toFixed(2)} mg/day</li>
              <li>{directConversion.sourceUnitsPerDay.toFixed(2)} {directConversion.sourceForm === "liquid" ? "mL" : `${directConversion.sourceForm}(s)`}/day</li>
              <li>{directConversion.convertedPerDay.toFixed(2)} {directConversion.targetForm === "liquid" ? "mL" : `${directConversion.targetForm}(s)`}/day</li>
            </ul>
          </div>
        ) : showConversion ? (
          <p className="muted">{directConversion.reason}</p>
        ) : (
          <p className="muted">Select direction and click <strong>Show conversion</strong>.</p>
        )}
      </div>

      <p className="warning-note">Always verify dose conversions against a pharmacist or approved dosing reference.</p>
    </section>
  );
}
