import React, { useEffect, useState } from "react";
import { FaHistory } from "react-icons/fa";

const STORAGE_KEY = "dosecalc_entries";

function normalizeEntries(entries) {
  return entries.map((entry) => ({
    ...entry,
    patientFullName: entry.patientFullName || "Unknown Patient"
  }));
}

export default function SavedDataTab() {
  const [entries, setEntries] = useState([]);

  const persistEntries = (nextEntries) => {
    setEntries(nextEntries);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextEntries));
  };

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setEntries(normalizeEntries(JSON.parse(raw)));
    } catch {
      setEntries([]);
    }
  }, []);

  const deleteEntry = (id) => {
    const next = entries.filter((entry) => entry.id !== id);
    persistEntries(next);
  };

  const updatePatientName = (id, value) => {
    const next = entries.map((entry) =>
      entry.id === id
        ? { ...entry, patientFullName: value }
        : entry
    );
    setEntries(next);
  };

  const savePatientName = (id) => {
    const next = entries.map((entry) => {
      if (entry.id !== id) return entry;
      const trimmed = (entry.patientFullName || "").trim();
      return { ...entry, patientFullName: trimmed || "Unknown Patient" };
    });
    persistEntries(next);
  };

  const clearAll = () => {
    const confirmed = window.confirm("Delete all saved entries from this browser?");
    if (!confirmed) return;
    persistEntries([]);
  };

  return (
    <section>
      <h2>
        <FaHistory /> Saved Results
      </h2>
      <p className="muted">Stored locally in this browser only. Do not keep sensitive patient identifiers on shared/public devices.</p>

      {entries.length > 0 && (
        <button type="button" className="secondary-btn" onClick={clearAll}>Delete all saved results</button>
      )}

      {entries.length === 0 ? (
        <p className="muted">No saved results yet.</p>
      ) : (
        <ul className="saved-list">
          {entries.map((entry) => (
            <li className="saved-item" key={entry.id ?? `${entry.createdAt}-${entry.result}`}>
              <p><strong>Date:</strong> {new Date(entry.createdAt).toLocaleString()}</p>
              <p><strong>Patient:</strong> {entry.patientFullName || "Unknown Patient"}</p>
              <p><strong>Medication:</strong> {entry.medication || "N/A"}</p>
              <p><strong>Result:</strong> {entry.result}</p>

              <div className="saved-actions">
                <label className="field">
                  <span>Edit patient full name</span>
                  <input
                    type="text"
                    value={entry.patientFullName || ""}
                    onChange={(e) => updatePatientName(entry.id, e.target.value)}
                  />
                </label>
                <div className="button-row">
                  <button type="button" className="primary-btn" onClick={() => savePatientName(entry.id)}>Save name</button>
                  <button type="button" className="secondary-btn" onClick={() => deleteEntry(entry.id)}>Delete entry</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
