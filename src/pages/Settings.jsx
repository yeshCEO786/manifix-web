import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from '@/store';
import {
  updateTheme,
  updateNotifications,
  updateLanguage,
} from "@/store/slices/settingsSlice";

export default function Settings() {
  const dispatch = useAppDispatch();
  const { theme, notifications, language } = useAppSelector(
    (state) => state.settings
  );

  const [localTheme, setLocalTheme] = useState(theme);
  const [localNotifications, setLocalNotifications] = useState(
    notifications
  );
  const [localLanguage, setLocalLanguage] = useState(language);

  // ==========================
  // Handlers
  // ==========================
  const handleSave = () => {
    dispatch(updateTheme(localTheme));
    dispatch(updateNotifications(localNotifications));
    dispatch(updateLanguage(localLanguage));
    alert("Settings saved ✅");
  };

  const toggleNotifications = () =>
    setLocalNotifications(!localNotifications);

  // ==========================
  // Render
  // ==========================
  return (
    <div className="settings-container">
      <h1 className="title">Settings ⚙️</h1>

      <div className="settings-section">
        <h2>Theme</h2>
        <select
          value={localTheme}
          onChange={(e) => setLocalTheme(e.target.value)}
        >
          <option value="light">Light 🌞</option>
          <option value="dark">Dark 🌙</option>
          <option value="system">System</option>
        </select>
      </div>

      <div className="settings-section">
        <h2>Notifications</h2>
        <label>
          <input
            type="checkbox"
            checked={localNotifications}
            onChange={toggleNotifications}
          />
          Enable notifications
        </label>
      </div>

      <div className="settings-section">
        <h2>Language</h2>
        <select
          value={localLanguage}
          onChange={(e) => setLocalLanguage(e.target.value)}
        >
          <option value="en">English 🇬🇧</option>
          <option value="hi">Hindi 🇮🇳</option>
          <option value="es">Spanish 🇪🇸</option>
        </select>
      </div>

      <button className="primary-btn" onClick={handleSave}>
        Save Settings
      </button>
    </div>
  );
}
