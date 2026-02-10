import React, { useState, useCallback, useEffect } from "react";
import  useMagic16  from "../hooks/useMagic16";
import useVoice from "../hooks/useVoice";

const TOTAL_YOGA = 8 * 60;       // 8 minutes
const TOTAL_MEDITATION = 8 * 60; // 8 minutes

export default function Magic16() {
  const {
    phase,
    startSession,
    stopSession,
    nextPhase,
    progress,
    completed,
  } = useMagic16();

  const { speak, stopVoice } = useVoice();

  const [secondsLeft, setSecondsLeft] = useState(TOTAL_YOGA);

  // ==============================
  // Phase timer logic (high-perf)
  // ==============================
  useEffect(() => {
    if (!phase) return;

    const timer = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(timer);
          nextPhase();
          return phase === "yoga" ? TOTAL_MEDITATION : 0;
        }
        return s - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [phase, nextPhase]);

  // ==============================
  // Voice guidance (minimal)
  // ==============================
  useEffect(() => {
    if (phase === "yoga") {
      speak("Let’s begin Magic sixteen. Gentle yoga. Breathe deeply.");
    }
    if (phase === "meditation") {
      speak("Now meditation. Relax your body. Focus on your breath.");
    }
    if (completed) {
      speak("Magic sixteen complete. Your body and mind are aligned.");
    }

    return stopVoice;
  }, [phase, completed, speak, stopVoice]);

  // ==============================
  // UI helpers
  // ==============================
  const formatTime = useCallback((s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  }, []);

  // ==============================
  // Render
  // ==============================
  return (
    <div className="magic16-container">
      <h1 className="title">Magic 16</h1>

      {!phase && !completed && (
        <>
          <p className="subtitle">
            8 minutes yoga · 8 minutes meditation
          </p>
          <button className="primary-btn" onClick={startSession}>
            Start Magic 16
          </button>
        </>
      )}

      {phase && (
        <>
          <h2 className="phase-title">
            {phase === "yoga" ? "🧘 Yoga" : "🧠 Meditation"}
          </h2>

          <div className="timer">{formatTime(secondsLeft)}</div>

          <div className="progress-bar">
            <div
              className="progress"
              style={{ width: `${progress}%` }}
            />
          </div>

          <button className="secondary-btn" onClick={stopSession}>
            Stop
          </button>
        </>
      )}

      {completed && (
        <>
          <h2 className="complete">✨ Session Complete</h2>
          <p className="result">
            You showed up today. That’s power.
          </p>
          <button className="primary-btn" onClick={startSession}>
            Do it again
          </button>
        </>
      )}
    </div>
  );
}
