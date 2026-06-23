import React, { useMemo, useState } from "react";
import { MEDICATION_CATEGORIES, MOST_COMMON_URGENT_CARE_MED_IDS } from "../data/medications";

function buildCommonMedicationCategories() {
  return MEDICATION_CATEGORIES
    .map((category) => ({
      ...category,
      medications: category.medications.filter((medication) => MOST_COMMON_URGENT_CARE_MED_IDS.includes(medication.id))
    }))
    .filter((category) => category.medications.length > 0);
}

export default function MostCommonMedsTab({ onCalculateMedication }) {
  const [selectedMedicationId, setSelectedMedicationId] = useState(MOST_COMMON_URGENT_CARE_MED_IDS[0] ?? "");

  const commonCategories = useMemo(() => buildCommonMedicationCategories(), []);
  const commonMedications = useMemo(
    () => commonCategories.flatMap((category) =>
      category.medications.map((medication) => ({
        ...medication,
        categoryName: category.category,
        categoryIcon: category.icon
      }))
    ),
    [commonCategories]
  );

  const openMedicationInCalculator = (medicationId) => {
    setSelectedMedicationId(medicationId);
    onCalculateMedication?.(medicationId);
  };

  return (
    <section>
      <h2>Most Common Meds</h2>
      <p className="muted">
        Quick access to frequently used urgent care medications. Pick a common medication and the app will jump to the main calculator,
        preselect that medicine, and show the dosage result using the calculator inputs.
      </p>

      <div className="most-common-grid">
        {commonMedications.map((medication) => (
          <article
            key={medication.id}
            className={`med-card is-clickable ${selectedMedicationId === medication.id ? "is-selected" : ""}`}
            role="button"
            tabIndex={0}
            onClick={() => openMedicationInCalculator(medication.id)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openMedicationInCalculator(medication.id);
              }
            }}
          >
            <h3>
              <span className="icon-chip" aria-hidden="true">{medication.icon}</span>
              {medication.generic}
            </h3>
            <p><strong>Category:</strong> {medication.categoryIcon} {medication.categoryName}</p>
            {medication.diagnoses?.length > 0 && <p><strong>Common diagnoses:</strong> {medication.diagnoses.join(", ")}</p>}
            <p><strong>Common use:</strong> {medication.commonUse}</p>
            <p><strong>Forms:</strong> {medication.forms.join(", ")}</p>
            <p><strong>Strengths:</strong> {medication.strengths.join(" • ")}</p>
            <button
              type="button"
              className="primary-btn"
              onClick={(event) => {
                event.stopPropagation();
                openMedicationInCalculator(medication.id);
              }}
            >
              Open in calculator
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
