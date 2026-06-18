import React, { useMemo, useState } from "react";
import { MEDICATION_CATEGORIES } from "../data/medications";
import { convertDoseToForms, lbToKg } from "../utils/dosing";

export default function ByWeightTab() {
  const medications = useMemo(
    () => MEDICATION_CATEGORIES.flatMap((category) =>
      category.medications.map((medication) => ({ ...medication, category: category.category }))
    ),
    []
  );

  const [medicationId, setMedicationId] = useState(medications[0]?.id ?? "");
  const [weightValue, setWeightValue] = useState(25);
  const [weightUnit, setWeightUnit] = useState("kg");
  const [mgPerKgPerDay, setMgPerKgPerDay] = useState(15);
  const [frequencyPerDay, setFrequencyPerDay] = useState(3);
  const [tabletStrengthMg, setTabletStrengthMg] = useState(250);
  const [liquidConcentrationMgPerMl, setLiquidConcentrationMgPerMl] = useState(40);

  const selectedMedication = medications.find((medication) => medication.id === medicationId) ?? null;
  const weightKg = weightUnit === "lb" ? lbToKg(weightValue) : weightValue;
  const totalDailyDoseMg = Number.isFinite(weightKg) ? weightKg * mgPerKgPerDay : NaN;

  const conversion = useMemo(
    () => convertDoseToForms({ totalDailyDoseMg, frequencyPerDay, tabletStrengthMg, liquidConcentrationMgPerMl }),
    [totalDailyDoseMg, frequencyPerDay, tabletStrengthMg, liquidConcentrationMgPerMl]
  );

  return (
    <section>
      <h2>By Weight</h2>
      <p className="muted">Enter mg/kg/day to compute total daily dose, then convert into dose schedule and forms.</p>

      <div className="form-grid">
        <label className="field">
          <span>Medication</span>
          <select value={medicationId} onChange={(e) => setMedicationId(e.target.value)}>
            {medications.map((medication) => (
              <option key={medication.id} value={medication.id}>
                {medication.icon} {medication.generic} ({medication.category})
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          <span>Weight</span>
          <input type="number" min="0" step="0.1" value={weightValue} onChange={(e) => setWeightValue(Number(e.target.value))} />
        </label>

        <label className="field">
          <span>Weight unit</span>
          <select value={weightUnit} onChange={(e) => setWeightUnit(e.target.value)}>
            <option value="kg">kg</option>
            <option value="lb">lb</option>
          </select>
        </label>

        <label className="field">
          <span>Dose rate (mg/kg/day)</span>
          <input type="number" min="0" step="0.1" value={mgPerKgPerDay} onChange={(e) => setMgPerKgPerDay(Number(e.target.value))} />
        </label>

        <label className="field">
          <span>Doses per day</span>
          <input type="number" min="1" step="1" value={frequencyPerDay} onChange={(e) => setFrequencyPerDay(Number(e.target.value))} />
        </label>

        <label className="field">
          <span>Tablet strength (mg)</span>
          <input type="number" min="0" step="0.1" value={tabletStrengthMg} onChange={(e) => setTabletStrengthMg(Number(e.target.value))} />
        </label>

        <label className="field">
          <span>Liquid concentration (mg/mL)</span>
          <input type="number" min="0" step="0.01" value={liquidConcentrationMgPerMl} onChange={(e) => setLiquidConcentrationMgPerMl(Number(e.target.value))} />
        </label>
      </div>

      <div className="card">
        <h3>Weight-Based Result</h3>
        <p><strong>Medication:</strong> {selectedMedication?.generic}</p>
        <p><strong>Weight in kg:</strong> {Number.isFinite(weightKg) ? weightKg.toFixed(2) : "n/a"}</p>
        <p><strong>Total daily dose:</strong> {Number.isFinite(totalDailyDoseMg) ? totalDailyDoseMg.toFixed(2) : "n/a"} mg/day</p>
        <p><strong>Per dose:</strong> {conversion.dosePerAdministrationMg} mg/dose ({conversion.frequencyPerDay} times/day)</p>
        <p><strong>Tablet conversion:</strong> {conversion.tabletsPerDose} tablets/dose ({conversion.tabletsPerDay} tablets/day)</p>
        <p><strong>Liquid conversion:</strong> {conversion.liquidMlPerDose} mL/dose ({conversion.liquidMlPerDay} mL/day)</p>
      </div>
    </section>
  );
}
