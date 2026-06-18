import React, { useEffect, useState } from "react";

const STORAGE_KEY = "dosecalc_entries";

export default function SettingsTab() {
  const [installPromptEvent, setInstallPromptEvent] = useState(null);
  const [installMessage, setInstallMessage] = useState("");

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setInstallPromptEvent(event);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    return () => window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
  }, []);

  const installApp = async () => {
    if (!installPromptEvent) {
      setInstallMessage("Install prompt is not available yet. Use browser menu: Install app / Add to Home Screen.");
      return;
    }

    installPromptEvent.prompt();
    const choice = await installPromptEvent.userChoice;
    if (choice?.outcome === "accepted") {
      setInstallMessage("App installation accepted.");
    } else {
      setInstallMessage("Installation dismissed.");
    }
    setInstallPromptEvent(null);
  };

  const clearLocalSavedData = () => {
    const confirmed = window.confirm("Clear all saved dosecalc data from this browser?");
    if (!confirmed) return;
    localStorage.removeItem(STORAGE_KEY);
    setInstallMessage("Local saved data was cleared from this browser.");
  };

  return (
    <section>
      <h2>Settings</h2>
      <p className="muted">Preferences, deployment, and app download/install options.</p>

      <div className="card">
        <h3>Download / Install App</h3>
        <p>Users can install this app to desktop/mobile from supported browsers.</p>
        <button type="button" className="primary-btn" onClick={installApp}>Install dosecalc app</button>
        {installMessage && <p className="muted">{installMessage}</p>}
        <p className="muted">If button is unavailable, open browser menu and choose <strong>Install app</strong> or <strong>Add to Home Screen</strong>.</p>
      </div>

      <div className="card">
        <h3>Public Data Protection</h3>
        <p>dosecalc stores saved entries in local browser storage only (no server sync in this app).</p>
        <ul>
          <li>Use de-identified names when possible.</li>
          <li>Avoid entering PHI on shared/public devices.</li>
          <li>Clear local saved entries before leaving shared machines.</li>
        </ul>
        <button type="button" className="secondary-btn" onClick={clearLocalSavedData}>Clear local saved data</button>
      </div>
    </section>
  );
}
