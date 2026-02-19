// src/pages/Magic16.jsx

import { useEffect, useRef, useState, useCallback } from "react";
import * as posedetection from "@tensorflow-models/pose-detection";
import * as facedetection from "@tensorflow-models/face-detection";
import "@tensorflow/tfjs-backend-webgl";
import "../styles/magic16.css";

import logo from "../assets/logo.png";

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
  const streamRef = useRef(null);
  const poseDetectorRef = useRef(null);
  const faceDetectorRef = useRef(null);
  const timerRef = useRef(null);
  const detectRef = useRef(null);

  const postureSamples = useRef([]);
  const faceSamples = useRef([]);
  const lastFaceX = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [index, setIndex] = useState(0);
  const [totalTime, setTotalTime] = useState(16 * 60);
  const [stepTime, setStepTime] = useState(60);
  const [sessionComplete, setSessionComplete] = useState(false);

  const [postureScore, setPostureScore] = useState(0);
  const [faceScore, setFaceScore] = useState(0);
  const [healthScore, setHealthScore] = useState(0);

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

  const format = (s) =>
    `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60)
      .toString()
      .padStart(2, "0")}`;

  // ---------------- TIMER ----------------
  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setTotalTime((prev) => {
        if (prev <= 1) {
          finishSession();
          return 0;
        }
        return prev - 1;
      });

      setStepTime((prev) => {
        if (prev <= 1) {
          setIndex((i) => {
            const next = Math.min(i + 1, steps.length - 1);
            return next;
          });
          return steps[index + 1]?.duration || 60;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const stopTimer = () => clearInterval(timerRef.current);

  const togglePlay = () => {
    if (!playing) startTimer();
    else stopTimer();
    setPlaying(!playing);
  };

  // ---------------- VOICE ----------------
  useEffect(() => {
    if (!playing) return;
    const speech = new SpeechSynthesisUtterance(steps[index].text);
    speech.rate = 0.9;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
  }, [index, playing]);

  // ---------------- CAMERA INIT ----------------
  useEffect(() => {
    const init = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      videoRef.current.srcObject = stream;

      poseDetectorRef.current = await posedetection.createDetector(
        posedetection.SupportedModels.MoveNet
      );

      faceDetectorRef.current = await facedetection.createDetector(
        facedetection.SupportedModels.MediaPipeFaceDetector,
        { runtime: "tfjs" }
      );
    };

    init();

    return () => {
      stopTimer();
      clearInterval(detectRef.current);
      if (streamRef.current)
        streamRef.current.getTracks().forEach((t) => t.stop());
    };
  }, []);

  // ---------------- DETECTION ----------------
  const detect = useCallback(async () => {
    if (!videoRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, 640, 480);

    const poses = await poseDetectorRef.current?.estimatePoses(videoRef.current);
    const faces = await faceDetectorRef.current?.estimateFaces(videoRef.current);

    ctx.drawImage(videoRef.current, 0, 0, 640, 480);

    // -------- POSTURE SCORE --------
    if (poses && poses.length > 0) {
      const keypoints = poses[0].keypoints;

      const ls = keypoints.find(k => k.name === "left_shoulder");
      const rs = keypoints.find(k => k.name === "right_shoulder");
      const lh = keypoints.find(k => k.name === "left_hip");
      const rh = keypoints.find(k => k.name === "right_hip");

      if (ls && rs && lh && rh) {
        const shoulderDiff = Math.abs(ls.y - rs.y);
        const hipDiff = Math.abs(lh.y - rh.y);

        const score = Math.max(0, 100 - (shoulderDiff + hipDiff) / 5);
        postureSamples.current.push(score);
      }
    }

    // -------- FACE SCORE --------
    if (faces && faces.length > 0) {
      const box = faces[0].box;

      if (lastFaceX.current !== null) {
        const movement = Math.abs(box.xMin - lastFaceX.current);
        const stability = Math.max(0, 100 - movement);
        faceSamples.current.push(stability);
      }

      lastFaceX.current = box.xMin;
      ctx.strokeStyle = "#00f5c4";
      ctx.strokeRect(box.xMin, box.yMin, box.width, box.height);
    }
  }, []);

  useEffect(() => {
    if (!playing) return;
    detectRef.current = setInterval(detect, 500);
    return () => clearInterval(detectRef.current);
  }, [playing, detect]);

  // ---------------- FINISH SESSION ----------------
  const finishSession = () => {
    stopTimer();
    clearInterval(detectRef.current);

    const avgPosture =
      postureSamples.current.reduce((a, b) => a + b, 0) /
      postureSamples.current.length || 0;

    const avgFace =
      faceSamples.current.reduce((a, b) => a + b, 0) /
      faceSamples.current.length || 0;

    const finalScore = Math.round(avgPosture * 0.6 + avgFace * 0.4);

    setPostureScore(Math.round(avgPosture));
    setFaceScore(Math.round(avgFace));
    setHealthScore(finalScore);
    setSessionComplete(true);
    setPlaying(false);
  };

  // ---------------- RESULT SCREEN ----------------
  if (sessionComplete) {
    return (
      <div className="result-overlay">
        <div className="result-card">
          <h2>✨ Ritual Complete</h2>
          <h1>{healthScore}%</h1>
          <p>Overall Wellness Score</p>
          <p>🧍 Posture: {postureScore}%</p>
          <p>😌 Calmness: {faceScore}%</p>
          <button onClick={() => window.location.reload()}>
            Start Again
          </button>
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
        src={steps[index].img}
        alt="step"
        className="magic16-image"
      />

      <h3>{steps[index].text}</h3>

      <p>Total Time: {format(totalTime)}</p>
      <p>Step Time: {format(stepTime)}</p>

      <button onClick={togglePlay}>
        {playing ? "Pause" : "Start"}
      </button>

      <div className="magic16-camera-wrapper">
        <video ref={videoRef} width="640" height="480" autoPlay muted hidden />
        <canvas ref={canvasRef} width="640" height="480" />
      </div>
    </div>
  );
}
