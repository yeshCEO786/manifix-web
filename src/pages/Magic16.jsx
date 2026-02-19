// src/pages/Magic16.jsx

import { useRef, useEffect } from "react";
import { useTimer, useDetection, useStreak } from "../hooks";
import "./magic16.css";

import logo from "../assets/logo.png";

// images
import yoga1 from "../assets/steps/yoga-01.png";
import yoga2 from "../assets/steps/yoga-02.png";
import yoga3 from "../assets/steps/yoga-03.png";
import yoga4 from "../assets/steps/yoga-04.png";
import yoga5 from "../assets/steps/yoga-05.png";
import yoga6 from "../assets/steps/yoga-06.png";
import yoga7 from "../assets/steps/yoga-07-1.png";
import yoga8 from "../assets/steps/yoga-08.png";
import med1 from "../assets/steps/med-01.png";
import med2 from "../assets/steps/med-02.png";
import med3 from "../assets/steps/med-03.png";
import med4 from "../assets/steps/med-04.png";
import med5 from "../assets/steps/med-05.png";
import med6 from "../assets/steps/med-06.png";
import med7 from "../assets/steps/med-07.png";

export default function Magic16() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // 16-minute flow
  const steps = [
    { img: yoga1, text: "Mountain Pose. Stand tall.", duration: 60 },
    { img: yoga2, text: "Forward Fold. Relax.", duration: 60 },
    { img: yoga3, text: "Half Lift.", duration: 60 },
    { img: yoga4, text: "Plank Pose.", duration: 60 },
    { img: yoga5, text: "Cobra Pose.", duration: 60 },
    { img: yoga6, text: "Downward Dog.", duration: 60 },
    { img: yoga7, text: "Warrior Pose.", duration: 120 },
    { img: yoga8, text: "Tree Pose.", duration: 60 },
    { img: med1, text: "Close your eyes.", duration: 60 },
    { img: med2, text: "Focus on breath.", duration: 60 },
    { img: med3, text: "Release tension.", duration: 120 },
    { img: med4, text: "Calm energy.", duration: 60 },
    { img: med5, text: "Let thoughts pass.", duration: 60 },
    { img: med6, text: "Stay present.", duration: 60 },
    { img: med7, text: "Visualize success.", duration: 60 },
  ];

  // ---------------- TIMER ----------------
  const {
    totalTime,
    stepTime,
    stepIndex,
    playing,
    completed,
    start,
    stop,
    reset,
  } = useTimer(steps, 16 * 60);

  // ---------------- DETECTION ----------------
  const {
    postureScore,
    faceScore,
    healthScore,
    start: startDetection,
    stop: stopDetection,
    calculateFinalScore,
  } = useDetection(videoRef, canvasRef);

  // ---------------- STREAK ----------------
  const {
    currentStreak,
    longestStreak,
    completeToday,
  } = useStreak();

  // Start / Stop detection with timer
  useEffect(() => {
    if (playing) startDetection();
    else stopDetection();
  }, [playing]);

  // When session completes
  useEffect(() => {
    if (completed) {
      stopDetection();
      calculateFinalScore();
      completeToday();
    }
  }, [completed]);

  const format = (s) =>
    `${Math.floor(s / 60)
      .toString()
      .padStart(2, "0")}:${(s % 60)
      .toString()
      .padStart(2, "0")}`;

  // ---------------- RESULT SCREEN ----------------
  if (completed) {
    return (
      <div className="result-overlay">
        <div className="result-card">
          <h2>✨ Ritual Complete</h2>
          <h1>{healthScore}%</h1>
          <p>Overall Wellness Score</p>

          <p>🧍 Posture: {postureScore}%</p>
          <p>😌 Calmness: {faceScore}%</p>

          <div style={{ marginTop: 20 }}>
            <p>🔥 Current Streak: {currentStreak} days</p>
            <p>🏆 Longest Streak: {longestStreak} days</p>
          </div>

          <button onClick={reset}>Start Again</button>
        </div>
      </div>
    );
  }

  // ---------------- MAIN UI ----------------
  return (
    <div className="magic16-container">
      <img src={logo} alt="ManifiX Logo" className="magic16-logo" />

      <h2>Magic 16 Ritual</h2>

      <img
        src={steps[stepIndex].img}
        alt="step"
        className="magic16-image"
      />

      <h3>{steps[stepIndex].text}</h3>

      <div className="timer-box">
        <p>Total Time: {format(totalTime)}</p>
        <p>Step Time: {format(stepTime)}</p>
      </div>

      {/* Live AI Score Panel */}
      {playing && (
        <div className="live-score-panel">
          <p>Health: {healthScore}%</p>
          <p>Posture: {postureScore}%</p>
          <p>Calm: {faceScore}%</p>
        </div>
      )}

      <button onClick={playing ? stop : start}>
        {playing ? "Pause" : "Start"}
      </button>

      <div className="camera-wrapper">
        <video ref={videoRef} width="640" height="480" autoPlay muted hidden />
        <canvas ref={canvasRef} width="640" height="480" />
      </div>
    </div>
  );
}
