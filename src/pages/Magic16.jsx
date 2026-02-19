// src/pages/Magic16.jsx

import { useEffect, useRef, useState, useCallback } from "react";
import * as posedetection from "@tensorflow-models/pose-detection";
import * as facedetection from "@tensorflow-models/face-detection";
import "@tensorflow/tfjs-backend-webgl";
import "./magic16.css";

import logo from "../assets/logo.png";

// yoga + meditation images
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
  const intervalRef = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [index, setIndex] = useState(0);
  const [totalTime, setTotalTime] = useState(16 * 60);
  const [stepTime, setStepTime] = useState(60);

  // 16-Minute Flow (960 seconds total distributed)
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

  // ----------------------------
  // Format Time
  // ----------------------------
  const format = (s) =>
    `${Math.floor(s / 60)
      .toString()
      .padStart(2, "0")}:${(s % 60)
      .toString()
      .padStart(2, "0")}`;

  // ----------------------------
  // Timer
  // ----------------------------
  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      setTotalTime((prev) => (prev > 0 ? prev - 1 : 0));
      setStepTime((prev) => {
        if (prev > 0) return prev - 1;
        nextStep();
        return steps[index + 1]?.duration || 0;
      });
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current);
  };

  const togglePlay = () => {
    if (!playing) startTimer();
    else stopTimer();
    setPlaying(!playing);
  };

  const nextStep = () => {
    setIndex((prev) => {
      const newIndex = Math.min(prev + 1, steps.length - 1);
      setStepTime(steps[newIndex].duration);
      return newIndex;
    });
  };

  // ----------------------------
  // Voice
  // ----------------------------
  useEffect(() => {
    if (!playing) return;
    const speech = new SpeechSynthesisUtterance(steps[index].text);
    speech.rate = 0.9;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
  }, [index, playing]);

  // ----------------------------
  // Camera + AI
  // ----------------------------
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
      if (streamRef.current)
        streamRef.current.getTracks().forEach((t) => t.stop());
    };
  }, []);

  // ----------------------------
  // Detection Loop
  // ----------------------------
  const detect = useCallback(async () => {
    if (!videoRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, 640, 480);

    const poses = await poseDetectorRef.current?.estimatePoses(videoRef.current);
    const faces = await faceDetectorRef.current?.estimateFaces(videoRef.current);

    ctx.drawImage(videoRef.current, 0, 0, 640, 480);

    ctx.strokeStyle = "#00ffcc";

    poses?.forEach((pose) => {
      pose.keypoints.forEach((kp) => {
        if (kp.score > 0.5) {
          ctx.beginPath();
          ctx.arc(kp.x, kp.y, 5, 0, 2 * Math.PI);
          ctx.stroke();
        }
      });
    });

    faces?.forEach((face) => {
      const box = face.box;
      ctx.strokeRect(box.xMin, box.yMin, box.width, box.height);
    });
  }, []);

  useEffect(() => {
    if (!playing) return;
    const loop = setInterval(detect, 700);
    return () => clearInterval(loop);
  }, [playing, detect]);

  // ----------------------------
  // UI
  // ----------------------------
  return (
    <div style={{ textAlign: "center", background: "#020617", minHeight: "100vh", color: "#fff" }}>
      <img src={logo} alt="ManifiX Logo" style={{ width: 120, marginTop: 20 }} />

      <h2>Magic 16 Ritual</h2>

      <div>
        <img
          src={steps[index].img}
          alt="step"
          style={{ width: 250, margin: 20 }}
        />
      </div>

      <h3>{steps[index].text}</h3>

      <p>Total Time: {format(totalTime)}</p>
      <p>Step Time: {format(stepTime)}</p>

      <button onClick={togglePlay}>
        {playing ? "Pause" : "Start"}
      </button>

      <div style={{ position: "relative", marginTop: 20 }}>
        <video ref={videoRef} width="640" height="480" autoPlay muted hidden />
        <canvas ref={canvasRef} width="640" height="480" />
      </div>
    </div>
  );
}
