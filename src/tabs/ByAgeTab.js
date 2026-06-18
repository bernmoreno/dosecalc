import React, { useMemo, useState } from "react";
import { AGE_GROUPS, MEDICATION_CATEGORIES } from "../data/medications";
import { calculateRecommendedDose } from "../utils/dosing";

export default function ByAgeTab() {
  const medications = useMemo(
    () => MEDICATION_CATEGORIES.flatMap((category) =>
      category.medications.map((medication) => ({
        ...medication,
        category: category.category,
        categoryIcon: category.icon
      }))
    ),
    []
  );

  const [ageGroupId, setAgeGroupId] = useState(AGE_GROUPS[2]?.id ?? "child");
  const [ageYears, setAgeYears] = useState(8);
  const [weightKg, setWeightKg] = useState(25);
  const [medicationId, setMedicationId] = useState(medications[0]?.id ?? "");
  const [frequencyPerDay, setFrequencyPerDay] = useState(2);

  const selectedAgeGroup = AGE_GROUPS.find((group) => group.id === ageGroupId) ?? null;
  const selectedMedication = medications.find((medication) => medication.id === medicationId) ?? null;

  const calculated = useMemo(
    () => calculateRecommendedDose({ medication: selectedMedication, weightKg, ageYears, frequencyPerDay }),
    [selectedMedication, weightKg, ageYears, frequencyPerDay]
  );

  const applyAgeGroup = (newGroupId) => {
    setAgeGroupId(newGroupId);
    const group = AGE_GROUPS.find((item) => item.id === newGroupId);
    if (!group) return;
    const approxAge = group.minAgeYears < 1
      ? Number((group.minAgeYears + 0.2).toFixed(2))
      : Math.round((group.minAgeYears + Math.min(group.maxAgeYears, group.minAgeYears + 4)) / 2);
    setAgeYears(approxAge);
  };

  return (
    <section>
      <h2>By Age</h2>
      <p className="muted">Choose age group + medication and calculate a weight-adjusted per-dose recommendation.</p>

      <div className="age-group-row">
        {AGE_GROUPS.map((group) => (
          <button
            key={group.id}
            type="button"
            className={`chip-btn ${ageGroupId === group.id ? "is-active" : ""}`}
            onClick={() => applyAgeGroup(group.id)}
          >
            {group.icon} {group.label}
          </button>
        ))}
      </div>

      <div className="form-grid">
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
          <span>Weight (kg)</span>
          <input
            type="number"
            min="0"
            step="0.1"
            value={weightKg === 0 ? "" : weightKg}
            onChange={(e) => setWeightKg(e.target.value === "" ? 0 : Number(e.target.value))}
          />
        </label>
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
          <span>Doses per day</span>
          <input type="number" min="1" step="1" value={frequencyPerDay} onChange={(e) => setFrequencyPerDay(Number(e.target.value))} />
        </label>
      </div>

      <div className="card">
        <h3>Age-Based Result</h3>
        <p><strong>Selected age group:</strong> {selectedAgeGroup?.icon} {selectedAgeGroup?.label}</p>
        <p><strong>Group note:</strong> {selectedAgeGroup?.note}</p>
        {calculated.ok ? (
          <>
            <p><strong>Total daily dose:</strong> {calculated.totalDailyDoseMg} mg/day</p>
            <p><strong>Per dose:</strong> {calculated.dosePerAdministrationMg} mg/dose ({calculated.frequencyPerDay} times/day)</p>
            {calculated.liquidMlPerDose != null && <p><strong>Liquid:</strong> {calculated.liquidMlPerDose} mL per dose</p>}
            {calculated.tabletsPerDose != null && <p><strong>Tablets:</strong> {calculated.tabletsPerDose} tablets per dose</p>}
          </>
        ) : (
          <p className="muted">{calculated.reason}</p>
        )}
      </div>
    </section>
  );
}
