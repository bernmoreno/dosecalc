import React, { useMemo } from "react";
import {
  MEDICATION_CATEGORIES,
  MOST_COMMON_URGENT_CARE_MED_IDS,
  PEDIATRIC_DOSING_PRIORITY_IDS
} from "../data/medications";

function flattenMedicationCategories(medicationCategories) {
  return medicationCategories.flatMap((category) =>
    category.medications.map((medication) => ({
      ...medication,
      categoryId: category.id,
      categoryName: category.category,
      categoryIcon: category.icon
    }))
  );
}

export default function DoseCalcMedicationDropdown({
  value,
  onChange,
  medicationCategories = MEDICATION_CATEGORIES,
  label = "Medication"
}) {
  const { mostCommonMedications, pediatricMedications, remainingCategories } = useMemo(() => {
    const flattened = flattenMedicationCategories(medicationCategories);
    const medicationMap = new Map(flattened.map((medication) => [medication.id, medication]));

    const mostCommonMedications = MOST_COMMON_URGENT_CARE_MED_IDS
      .map((medicationId) => medicationMap.get(medicationId))
      .filter(Boolean);

    const pediatricMedications = PEDIATRIC_DOSING_PRIORITY_IDS
      .map((medicationId) => medicationMap.get(medicationId))
      .filter(Boolean);

    const featuredIds = new Set([
      ...mostCommonMedications.map((medication) => medication.id),
      ...pediatricMedications.map((medication) => medication.id)
    ]);

    const remainingCategories = medicationCategories
      .map((category) => ({
        ...category,
        medications: category.medications.filter((medication) => !featuredIds.has(medication.id))
      }))
      .filter((category) => category.medications.length > 0);

    return {
      mostCommonMedications,
      pediatricMedications,
      remainingCategories
    };
  }, [medicationCategories]);

  return (
    <label className="field">
      <span>{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="">Select medication</option>

        {mostCommonMedications.length > 0 && (
          <optgroup label="Most Common Medication">
            {mostCommonMedications.map((medication) => (
              <option key={medication.id} value={medication.id}>
                {medication.icon} {medication.generic}
              </option>
            ))}
          </optgroup>
        )}

        {pediatricMedications.length > 0 && (
          <optgroup label="Pediatric Medication">
            {pediatricMedications.map((medication) => (
              <option key={medication.id} value={medication.id}>
                {medication.icon} {medication.generic}
              </option>
            ))}
          </optgroup>
        )}

        {remainingCategories.map((category) => (
          <optgroup key={category.id} label={`${category.icon} ${category.category}`}>
            {category.medications.map((medication) => (
              <option key={medication.id} value={medication.id}>
                {medication.icon} {medication.generic}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    </label>
  );
}