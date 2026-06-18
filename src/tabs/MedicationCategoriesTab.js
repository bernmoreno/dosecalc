import React, { useMemo, useState } from "react";
import { MEDICATION_CATEGORIES } from "../data/medications";

export default function MedicationCategoriesTab({ onConvertMedication, onCalculateMedication }) {
  const [activeCategoryId, setActiveCategoryId] = useState(MEDICATION_CATEGORIES[0]?.id ?? "");
  const [selectedMedicationId, setSelectedMedicationId] = useState("");
  const [showAllCategories, setShowAllCategories] = useState(false);

  const activeCategory = useMemo(
    () => MEDICATION_CATEGORIES.find((category) => category.id === activeCategoryId) ?? MEDICATION_CATEGORIES[0],
    [activeCategoryId]
  );

  if (!activeCategory) {
    return <p className="muted">No medication categories available.</p>;
  }

  const categoriesToRender = showAllCategories ? MEDICATION_CATEGORIES : [activeCategory];

  return (
    <section>
      <h2>Medication Categories</h2>
      <p className="muted">Browse all hospital medications by category, with forms, strengths, and typical dosing ranges.</p>

      <div className="category-tabs" role="tablist" aria-label="Medication category tabs">
        {MEDICATION_CATEGORIES.map((category) => {
          const isActive = category.id === activeCategory.id;
          return (
            <button
              key={category.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`category-tab ${isActive ? "is-active" : ""}`}
              onClick={() => setActiveCategoryId(category.id)}
            >
              <span className="icon-chip" aria-hidden="true">{category.icon}</span>
              {category.category}
            </button>
          );
        })}
      </div>

      <div className="button-row">
        <button
          type="button"
          className="secondary-btn"
          onClick={() => setShowAllCategories((current) => !current)}
        >
          {showAllCategories ? "Show selected category only" : "Show all medication lists"}
        </button>
      </div>

      {categoriesToRender.map((category) => (
        <div key={category.id} role="tabpanel" aria-label={`${category.category} medications`}>
          {showAllCategories && <h3>{category.icon} {category.category}</h3>}
          <div className="med-grid">
            {category.medications.map((medication) => (
              <article
                className={`med-card is-clickable ${selectedMedicationId === medication.id ? "is-selected" : ""}`}
                key={medication.id}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedMedicationId(medication.id)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setSelectedMedicationId(medication.id);
                  }
                }}
              >
                <h3>
                  <span className="icon-chip" aria-hidden="true">{medication.icon}</span>
                  {medication.generic}
                </h3>
                <p><strong>Use:</strong> {medication.commonUse}</p>
                <p><strong>Forms:</strong> {medication.forms.join(", ")}</p>
                <p><strong>Strengths:</strong> {medication.strengths.join(" • ")}</p>
                <p><strong>Typical dose:</strong> {medication.dosingRange}</p>
                <div className="med-card-actions">
                  <button
                    type="button"
                    className="primary-btn"
                    onClick={(event) => {
                      event.stopPropagation();
                      onCalculateMedication?.(medication.id);
                    }}
                  >
                    Calculate dosage now
                  </button>
                  <button
                    type="button"
                    className="secondary-btn"
                    onClick={(event) => {
                      event.stopPropagation();
                      onConvertMedication?.(medication.id);
                    }}
                  >
                    Convert medicine
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
