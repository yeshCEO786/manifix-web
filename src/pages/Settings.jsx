import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import {
  updateTheme,
  updateNotifications,
  updateLanguage,
} from "../store/slices/settingsSlice";

export default function Settings() {
  const dispatch = useAppDispatch();
  const { theme, notifications, language } = useAppSelector(
    (state) => state.settings
  );

  const [localTheme, setLocalTheme] = useState(theme);
  const [localNotifications, setLocalNotifications] = useState(notifications);
  const [localLanguage, setLocalLanguage] = useState(language);

  const handleSave = () => {
    dispatch(updateTheme(localTheme));
    dispatch(updateNotifications(localNotifications));
    dispatch(updateLanguage(localLanguage));
    alert("Settings saved ✅");
  };

  return (
    <div className="settings-container">
      <h1>Settings ⚙️</h1>

      <div>
        <label>Theme</label>
        <select
          value={localTheme}
          onChange={(e) => setLocalTheme(e.target.value)}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="system">System</option>
        </select>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            checked={localNotifications}
            onChange={() => setLocalNotifications(!localNotifications)}
          />
          Enable notifications
        </label>
      </div>

      <div>
        <label>Language</label>
        <select
          value={localLanguage}
          onChange={(e) => setLocalLanguage(e.target.value)}
        >
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="es">Spanish</option>
        </select>
      </div>

      <button onClick={handleSave}>Save Settings</button>
    </div>
  );
}
