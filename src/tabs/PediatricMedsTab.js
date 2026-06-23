import React, { useMemo, useState } from "react";
import DoseCalcCalculatorTab from "./DoseCalcCalculatorTab";
import {
  MEDICATION_CATEGORIES,
  PEDIATRIC_DOSING_PRIORITY_IDS,
  PEDIATRIC_URGENT_CARE_GROUPS
} from "../data/medications";
import { getDiagnosisGuidance, getDosingProfile } from "../utils/dosing";

function buildPediatricCalculatorCategories() {
  return MEDICATION_CATEGORIES
    .map((category) => ({
      ...category,
      medications: category.medications.filter((medication) => PEDIATRIC_DOSING_PRIORITY_IDS.includes(medication.id))
    }))
    .filter((category) => category.medications.length > 0);
}

export default function PediatricMedsTab({
  heading = "Pediatric Meds",
  description = "Pediatric urgent care quick list focused on the medications most commonly prescribed for otitis media, strep, sinusitis, wheezing, croup, common rashes, and minor eye/ear infections.",
  showCalculator = true,
  onCalculateMedication
}) {
  const [selectedMedicationId, setSelectedMedicationId] = useState(PEDIATRIC_DOSING_PRIORITY_IDS[0] ?? "");

  const pediatricCalculatorCategories = useMemo(() => buildPediatricCalculatorCategories(), []);
  const medicationMap = useMemo(() => {
    const flattened = MEDICATION_CATEGORIES.flatMap((category) =>
      category.medications.map((medication) => ({
        ...medication,
        categoryName: category.category,
        categoryIcon: category.icon
      }))
    );

    return Object.fromEntries(flattened.map((medication) => [medication.id, medication]));
  }, []);

  const openMedicationInCalculator = (medicationId) => {
    setSelectedMedicationId(medicationId);
    onCalculateMedication?.(medicationId);
  };

  return (
    <section>
      <h2>{heading}</h2>
      <p className="muted">{description}</p>

      <div className="pediatric-priority-card card">
        <h3>High-yield pediatric meds to memorize</h3>
        <div className="tag-grid" role="list" aria-label="High-yield pediatric medications">
          {PEDIATRIC_DOSING_PRIORITY_IDS.map((medicationId) => {
            const medication = medicationMap[medicationId];
            if (!medication) return null;

            return (
              <button
                key={medicationId}
                type="button"
                role="listitem"
                className={`tag-chip ${selectedMedicationId === medicationId ? "is-active" : ""}`}
                onClick={() => setSelectedMedicationId(medicationId)}
              >
                {medication.icon} {medication.generic}
              </button>
            );
          })}
        </div>
      </div>

      <div className="pediatric-sections">
        {PEDIATRIC_URGENT_CARE_GROUPS.map((group) => (
          <section key={group.id} className="pediatric-section card">
            <h3>{group.icon} {group.title}</h3>
            <div className="pediatric-med-list">
              {group.items.map((item) => {
                const medication = medicationMap[item.medicationId];
                const calculatorReady = Boolean(getDosingProfile(item.medicationId));
                const diagnosisGuidance = getDiagnosisGuidance(item.medicationId);

                return (
                  <article key={item.medicationId} className="pediatric-med-card">
                    <div className="pediatric-med-header">
                      <h4>{item.label}</h4>
                      {medication?.categoryName && <span className="mini-chip">{medication.categoryName}</span>}
                    </div>

                    {medication?.commonUse && <p><strong>Common use:</strong> {medication.commonUse}</p>}
                    <ul>
                      {item.useCases.map((useCase) => (
                        <li key={useCase}>{useCase}</li>
                      ))}
                    </ul>

                    {medication?.forms?.length > 0 && <p><strong>Forms:</strong> {medication.forms.join(", ")}</p>}
                    {medication?.strengths?.length > 0 && <p><strong>Strengths:</strong> {medication.strengths.join(" • ")}</p>}
                    {medication?.dosingRange && <p><strong>Reference range:</strong> {medication.dosingRange}</p>}

                    {diagnosisGuidance.length > 0 && (
                      <div className="diagnosis-dose-list">
                        <strong>Pediatric diagnosis dosing:</strong>
                        <ul>
                          {diagnosisGuidance.map((option) => (
                            <li key={option.id}>
                              <strong>{option.diagnosis}:</strong> {option.referenceRange}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {calculatorReady ? (
                      <button
                        type="button"
                        className="primary-btn"
                        onClick={() => openMedicationInCalculator(item.medicationId)}
                      >
                        Use in pediatric calculator
                      </button>
                    ) : (
                      <p className="muted"><strong>Reference only:</strong> no mg/kg calculator profile yet for this topical/otic/ophthalmic medication.</p>
                    )}
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      {showCalculator && (
        <DoseCalcCalculatorTab
          key={selectedMedicationId || "pediatric-meds-calculator"}
          initialMedicationId={selectedMedicationId}
          medicationCategories={pediatricCalculatorCategories}
          heading="Pediatric Dose + Conversion"
          description="Use the high-yield pediatric medication calculator for rapid weight-based dosing review, including solid-form and liquid equivalents when available."
          medicationLabel="Pediatric medication"
        />
      )}
    </section>
  );
}
