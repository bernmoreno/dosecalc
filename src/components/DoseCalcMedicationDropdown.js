import React from "react";
import { FaPills } from "react-icons/fa";
import { MEDICATION_CATEGORIES } from "../data/medications";

export default function DoseCalcMedicationDropdown({ value, onChange, medicationCategories = MEDICATION_CATEGORIES, label = "Medication" }) {
  const hasOptions = medicationCategories.some((category) => category.medications.length > 0);

  return (
    <label className="field">
      <span>
        <FaPills /> {label}
      </span>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">{hasOptions ? "Select medication" : "No medications available"}</option>
        {medicationCategories.map((category) => (
          <optgroup key={category.category} label={category.category}>
            {category.medications.map((medication) => (
              <option key={medication.id} value={medication.id}>
                {medication.generic} — {medication.forms.join(", ")} — Strengths: {medication.strengths.join(" • ")}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    </label>
  );
}
