import React, { useMemo, useRef, useState } from "react";
import DoseCalcCalculatorTab from "./DoseCalcCalculatorTab";
import {
  MEDICATION_CATEGORIES,
  MOST_COMMON_URGENT_CARE_MED_IDS,
  PEDIATRIC_URGENT_CARE_GROUPS
} from "../data/medications";

const PREVIEW_MEDICATION_LIMIT = 5;
const MANUAL_CALCULATOR_URL = "https://bernmoreno.github.io/calculator-app-pycharm/";
const EXTERNAL_LINKS = [
  {
    id: "drugs",
    label: "Epocrates Drugs",
    description: "Public browse landing page for drug reference access.",
    url: "https://www.epocrates.com/online/drugs"
  },
  {
    id: "online-home",
    label: "Epocrates Online",
    description: "Public online portal home page with search and news.",
    url: "https://www.epocrates.com/online/"
  }
];

function buildMedicationPreview(medication) {
  const lines = [
    medication.commonUse,
    medication.diagnoses?.length ? `Use: ${medication.diagnoses.slice(0, 2).join(" • ")}` : null,
    medication.forms?.length ? `Forms: ${medication.forms.join(", ")}` : null
  ].filter(Boolean);

  return lines.join(" ");
}

export default function MainPageTab({ initialCalculatorMedicationId = "" }) {
  const [showAllCommonMeds, setShowAllCommonMeds] = useState(false);
  const [selectedExternalLinkId, setSelectedExternalLinkId] = useState(EXTERNAL_LINKS[0]?.id ?? "");
  const externalViewerRef = useRef(null);

  const medicationMap = useMemo(() => {
    const flattened = MEDICATION_CATEGORIES.flatMap((category) =>
      category.medications.map((medication) => ({
        ...medication,
        categoryId: category.id,
        categoryName: category.category,
        categoryIcon: category.icon
      }))
    );

    return Object.fromEntries(flattened.map((medication) => [medication.id, medication]));
  }, []);

  const [selectedMedicationId, setSelectedMedicationId] = useState(initialCalculatorMedicationId || MOST_COMMON_URGENT_CARE_MED_IDS[0] || "");

  const commonMedications = useMemo(
    () => MOST_COMMON_URGENT_CARE_MED_IDS.map((medicationId) => medicationMap[medicationId]).filter(Boolean),
    [medicationMap]
  );

  const pediatricQuickGroups = useMemo(
    () => PEDIATRIC_URGENT_CARE_GROUPS.map((group) => ({
      ...group,
      items: group.items
        .map((item) => ({
          ...item,
          medication: medicationMap[item.medicationId]
        }))
        .filter((item) => item.medication)
        .slice(0, 3)
    })),
    [medicationMap]
  );

  const visibleCommonMedications = showAllCommonMeds
    ? commonMedications
    : commonMedications.slice(0, PREVIEW_MEDICATION_LIMIT);

  const selectedMedication = medicationMap[selectedMedicationId] ?? commonMedications[0] ?? null;
  const selectedExternalLink = EXTERNAL_LINKS.find((link) => link.id === selectedExternalLinkId) ?? EXTERNAL_LINKS[0] ?? null;

  const scrollToExternalViewer = () => {
    externalViewerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section>
      <h2>Main Page</h2>
      <p className="muted">
        Quick access workspace with compact medication buttons on the left, a full calculator on the right, and a small floating external reference section.
      </p>

      <div className="dashboard-grid">
        <div className="dashboard-left-stack">
          <div className="floating-panel floating-panel-medicines medicine-quick-panel panel-theme-common">
            <div className="compact-panel-header">
              <div>
                <h2>Most Common Medicines</h2>
                <p className="muted">
                  Quick-pick buttons from the medication information already in this app. Five show first; use <strong>More</strong> for the rest.
                </p>
              </div>
            </div>

            <div className="medicine-button-grid" aria-label="Most common medicines">
              {visibleCommonMedications.map((medication) => (
                <button
                  key={medication.id}
                  type="button"
                  className={`medicine-quick-btn ${selectedMedication?.id === medication.id ? "is-active" : ""}`}
                  onClick={() => setSelectedMedicationId(medication.id)}
                >
                  <span className="medicine-quick-title">{medication.icon} {medication.generic}</span>
                  <span className="medicine-quick-description">{buildMedicationPreview(medication)}</span>
                </button>
              ))}
            </div>

            {commonMedications.length > PREVIEW_MEDICATION_LIMIT && (
              <button
                type="button"
                className="secondary-btn compact-more-btn"
                onClick={() => setShowAllCommonMeds((current) => !current)}
              >
                {showAllCommonMeds ? "Show fewer medicines" : `More medicines (${commonMedications.length - PREVIEW_MEDICATION_LIMIT} more)`}
              </button>
            )}
          </div>

          <div className="floating-panel floating-panel-pediatric pediatric-quick-panel panel-theme-pediatric">
            <div className="compact-panel-header">
              <div>
                <h2>Pediatric Medicine</h2>
                <p className="muted">
                  Quick pediatric picks under the most common medicines area. Tap a medication to load it into the calculator and detail panel.
                </p>
              </div>
            </div>

            <div className="pediatric-quick-groups" aria-label="Pediatric medicine quick groups">
              {pediatricQuickGroups.map((group) => (
                <section key={group.id} className="pediatric-quick-group">
                  <h3>{group.icon} {group.title}</h3>
                  <div className="pediatric-quick-button-list">
                    {group.items.map((item) => (
                      <button
                        key={item.medicationId}
                        type="button"
                        className={`pediatric-quick-btn ${selectedMedication?.id === item.medicationId ? "is-active" : ""}`}
                        onClick={() => setSelectedMedicationId(item.medicationId)}
                      >
                        <span className="pediatric-quick-title">{item.medication.icon} {item.label}</span>
                        <span className="pediatric-quick-description">{item.useCases.slice(0, 2).join(" • ")}</span>
                      </button>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>

          {selectedMedication && (
            <div className="floating-panel floating-panel-details medication-detail-panel">
              <h2>{selectedMedication.generic}</h2>
              <p className="muted medication-detail-summary">{buildMedicationPreview(selectedMedication)}</p>

              <div className="medication-detail-grid">
                <p><strong>Category:</strong> {selectedMedication.categoryIcon} {selectedMedication.categoryName}</p>
                <p><strong>Typical dose:</strong> {selectedMedication.dosingRange}</p>
                <p><strong>Forms:</strong> {selectedMedication.forms.join(", ")}</p>
                <p><strong>Strengths:</strong> {selectedMedication.strengths.join(" • ")}</p>
                {selectedMedication.diagnoses?.length > 0 && (
                  <p><strong>Common diagnoses:</strong> {selectedMedication.diagnoses.join(" • ")}</p>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="dashboard-side-stack">
          <div className="floating-panel floating-panel-calculator full-calculator-panel panel-theme-calculator">
            <DoseCalcCalculatorTab
              initialMedicationId={selectedMedication?.id || initialCalculatorMedicationId}
              heading="Calculator"
              description="Full calculator view with extra padding for quick dose, strength, and liquid-conversion review while you keep the app open."
              medicationLabel="Medication"
            />
          </div>

          <div className="floating-panel floating-panel-external external-link-panel">
            <div className="external-link-header">
              <div>
                <h2>External Link</h2>
                <p className="muted">
                  Floating public reference viewer inside the page. Choose a public Epocrates page below, scroll it here, or open it in a separate tab when needed.
                </p>
              </div>
            </div>

            <div className="external-link-button-list" aria-label="External reference links">
              {EXTERNAL_LINKS.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  className={`external-link-card ${selectedExternalLink?.id === link.id ? "is-active" : ""}`}
                  onClick={() => setSelectedExternalLinkId(link.id)}
                >
                  <strong>{link.label}</strong>
                  <span>{link.description}</span>
                </button>
              ))}
            </div>

            {selectedExternalLink && (
              <>
                <div className="external-link-actions">
                  <button type="button" className="secondary-btn external-action-btn" onClick={scrollToExternalViewer}>
                    Scroll to viewer
                  </button>
                  <a
                    className="secondary-btn external-action-btn external-action-link"
                    href={selectedExternalLink.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open new tab
                  </a>
                </div>

                <div className="external-link-viewer-wrap" ref={externalViewerRef}>
                  <div className="external-link-viewer-header">
                    <strong>{selectedExternalLink.label}</strong>
                    <span>{selectedExternalLink.description}</span>
                  </div>
                  <div className="external-scroll-cue" aria-hidden="true">
                    <span className="external-scroll-cue-text">Scroll</span>
                    <span className="external-scroll-cue-line" />
                  </div>
                  <iframe
                    className="external-link-frame"
                    src={selectedExternalLink.url}
                    title={`${selectedExternalLink.label} viewer`}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    scrolling="yes"
                  />
                </div>
              </>
            )}

            <p className="muted quick-link-frame-note">
              Public pages can be viewed inside dosecalc when the site allows embedding. If a section is restricted, use <strong>Open new tab</strong>. Proprietary or gated Epocrates drug-monograph content is not copied into dosecalc.
            </p>
          </div>
        </div>
      </div>

      <div className="floating-panel floating-panel-manual manual-calculator-panel">
        <div className="manual-calculator-header">
          <div>
            <h2>Manual Calculator App</h2>
            <p className="muted">
              Full manual calculator view at the bottom of the page with a larger embedded frame so users can work in a fuller view with less scrolling.
            </p>
          </div>
          <a
            className="secondary-btn manual-calculator-link"
            href={MANUAL_CALCULATOR_URL}
            target="_blank"
            rel="noreferrer"
          >
            Open full calculator
          </a>
        </div>

        <div className="manual-calculator-frame-wrap">
          <iframe
            className="manual-calculator-frame"
            src={MANUAL_CALCULATOR_URL}
            title="Manual calculator app"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            scrolling="no"
          />
        </div>
      </div>
    </section>
  );
}
