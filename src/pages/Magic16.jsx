// src/pages/Magic16.jsx

import { useRef, useEffect, useState, useCallback } from "react";
import * as posedetection from "@tensorflow-models/pose-detection";
import "@tensorflow/tfjs-backend-webgl";
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
  const detectorRef = useRef(null);
  const timerRef = useRef(null);
  const detectRef = useRef(null);

  const [stepIndex, setStepIndex] = useState(0);
  const [stepTime, setStepTime] = useState(60);
  const [totalTime, setTotalTime] = useState(16 * 60);
  const [playing, setPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

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

  // ---------------- VOICE ----------------
  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (playing) speak(steps[stepIndex].text);
  }, [stepIndex, playing]);

  // ---------------- CAMERA INIT ----------------
  useEffect(() => {
    const init = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;

      detectorRef.current = await posedetection.createDetector(
        posedetection.SupportedModels.MoveNet,
        {
          modelType:
            posedetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
        }
      );
    };

    init();

    return () => {
      clearInterval(timerRef.current);
      clearInterval(detectRef.current);
    };
  }, []);

  // ---------------- DETECTION ----------------
  const detect = useCallback(async () => {
    if (!detectorRef.current || !videoRef.current) return;

    const poses = await detectorRef.current.estimatePoses(videoRef.current);

    if (poses.length > 0) {
      const keypoints = poses[0].keypoints;

      const ls = keypoints.find(k => k.name === "left_shoulder");
      const rs = keypoints.find(k => k.name === "right_shoulder");

      if (ls && rs) {
        const diff = Math.abs(ls.y - rs.y);
        const postureScore = Math.max(0, 100 - diff * 2);

        setScore(prev => Math.round(prev * 0.8 + postureScore * 0.2));
      }
    }
  }, []);

  // ---------------- START SESSION ----------------
  const startSession = () => {
    if (playing) return;

    setPlaying(true);
    setStepTime(steps[stepIndex].duration);

    timerRef.current = setInterval(() => {
      setTotalTime(t => (t > 0 ? t - 1 : 0));

      setStepTime(prev => {
        if (prev <= 1) {
          setStepIndex(prevIndex => {
            const next = prevIndex + 1;

            if (next >= steps.length) {
              finishSession();
              return prevIndex;
            }

            setStepTime(steps[next].duration);
            return next;
          });

          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    detectRef.current = setInterval(detect, 400);
  };

  const stopSession = () => {
    clearInterval(timerRef.current);
    clearInterval(detectRef.current);
    setPlaying(false);
  };

  const finishSession = () => {
    stopSession();
    setCompleted(true);
  };

  const format = (s) =>
    `${Math.floor(s / 60)
      .toString()
      .padStart(2, "0")}:${(s % 60)
      .toString()
      .padStart(2, "0")}`;

  // ---------------- RESULT ----------------
  if (completed) {
    return (
      <div className="result-overlay">
        <div className="result-card">
          <h2>✨ Ritual Complete</h2>
          <h1>{score}%</h1>
          <button onClick={() => window.location.reload()}>
            Start Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="magic16-container">
      <img src={logo} alt="Logo" className="magic16-logo" />

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

      <p>Live Score: {score}%</p>

      <button onClick={playing ? stopSession : startSession}>
        {playing ? "Pause" : "Start"}
      </button>

      <video ref={videoRef} autoPlay muted hidden />
    </div>
  );
}
