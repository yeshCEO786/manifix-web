import React, { createContext, useContext, useEffect, useState } from "react";
import authService from "../services/auth.service";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // =========================================
  // 🔐 AUTH STATE
  // =========================================
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // =========================================
  // 🔥 RITUAL STATE
  // =========================================
  const [streak, setStreak] = useState(0);
  const [lastCompletedDate, setLastCompletedDate] = useState(null);
  const [energy, setEnergy] = useState(50);
  const [vibeScore, setVibeScore] = useState(5);

  // =========================================
  // 🔄 AUTH HYDRATION (REFRESH SAFE)
  // =========================================
  useEffect(() => {
    let unsubscribe;

    const initAuth = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error("Auth hydration error:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }

      unsubscribe = authService.onAuthChange((updatedUser) => {
        setUser(updatedUser);
      });
    };

    initAuth();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  // =========================================
  // 💾 LOAD RITUAL DATA (LOCAL)
  // =========================================
  useEffect(() => {
    const savedStreak = localStorage.getItem("streak");
    const savedDate = localStorage.getItem("lastCompletedDate");
    const savedEnergy = localStorage.getItem("energy");
    const savedVibe = localStorage.getItem("vibeScore");

    if (savedStreak) setStreak(parseInt(savedStreak));
    if (savedDate) setLastCompletedDate(savedDate);
    if (savedEnergy) setEnergy(parseInt(savedEnergy));
    if (savedVibe) setVibeScore(parseInt(savedVibe));
  }, []);

  // =========================================
  // 💾 SAVE RITUAL DATA
  // =========================================
  useEffect(() => {
    localStorage.setItem("streak", streak);
    localStorage.setItem("lastCompletedDate", lastCompletedDate || "");
    localStorage.setItem("energy", energy);
    localStorage.setItem("vibeScore", vibeScore);
  }, [streak, lastCompletedDate, energy, vibeScore]);

  // =========================================
  // 🔥 COMPLETE RITUAL LOGIC
  // =========================================
  const completeRitual = () => {
    const today = new Date().toDateString();

    if (lastCompletedDate === today) return;

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (lastCompletedDate === yesterday.toDateString()) {
      setStreak((prev) => prev + 1);
    } else {
      setStreak(1);
    }

    setLastCompletedDate(today);

    // Increase energy safely
    setEnergy((prev) => Math.min(prev + 10, 100));
  };

  // =========================================
  // 🧹 RESET RITUAL (OPTIONAL)
  // =========================================
  const resetRitual = () => {
    setStreak(0);
    setLastCompletedDate(null);
    setEnergy(50);
    setVibeScore(5);
  };

  // =========================================
  // 🚪 LOGOUT WRAPPER
  // =========================================
  const logout = async () => {
    await authService.signOut();
    resetRitual();
  };

  return (
    <AppContext.Provider
      value={{
        // Auth
        user,
        setUser,
        loading,
        logout,

        // Ritual
        streak,
        energy,
        vibeScore,
        setVibeScore,
        completeRitual,
        resetRitual,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
