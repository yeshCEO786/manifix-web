import React, { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [streak, setStreak] = useState(0);
  const [lastCompletedDate, setLastCompletedDate] = useState(null);
  const [energy, setEnergy] = useState(50);
  const [vibeScore, setVibeScore] = useState(5);

  // Load from localStorage
  useEffect(() => {
    const savedStreak = localStorage.getItem("streak");
    const savedDate = localStorage.getItem("lastCompletedDate");
    const savedEnergy = localStorage.getItem("energy");

    if (savedStreak) setStreak(parseInt(savedStreak));
    if (savedDate) setLastCompletedDate(savedDate);
    if (savedEnergy) setEnergy(parseInt(savedEnergy));
  }, []);

  // Save when changes
  useEffect(() => {
    localStorage.setItem("streak", streak);
    localStorage.setItem("lastCompletedDate", lastCompletedDate);
    localStorage.setItem("energy", energy);
  }, [streak, lastCompletedDate, energy]);

  // 🔥 Complete Ritual Logic
  const completeRitual = () => {
    const today = new Date().toDateString();

    if (lastCompletedDate === today) {
      return; // already completed today
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (lastCompletedDate === yesterday.toDateString()) {
      setStreak(prev => prev + 1);
    } else {
      setStreak(1);
    }

    setLastCompletedDate(today);

    // Increase energy
    setEnergy(prev => Math.min(prev + 10, 100));
  };

  return (
    <AppContext.Provider
      value={{
        streak,
        energy,
        vibeScore,
        setVibeScore,
        completeRitual
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
