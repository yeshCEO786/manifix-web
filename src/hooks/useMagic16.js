import { useEffect, useRef, useState } from "react";

const TOTAL_TIME = 16 * 60; // seconds
const YOGA_TIME = 8 * 60;
const MEDITATION_TIME = 8 * 60;

export default function useMagic16() {
  const [secondsLeft, setSecondsLeft] = useState(TOTAL_TIME);
  const [phase, setPhase] = useState("idle"); // idle | yoga | meditation | done
  const [running, setRunning] = useState(false);

  const intervalRef = useRef(null);

  useEffect(() => {
    if (!running) return;

    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          setRunning(false);
          setPhase("done");
          return 0;
        }

        if (prev === MEDITATION_TIME + 1) {
          setPhase("meditation");
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [running]);

  const start = () => {
    setPhase("yoga");
    setSecondsLeft(TOTAL_TIME);
    setRunning(true);
  };

  const pause = () => setRunning(false);
  const resume = () => setRunning(true);

  const reset = () => {
    setRunning(false);
    setPhase("idle");
    setSecondsLeft(TOTAL_TIME);
  };

  return {
    secondsLeft,
    phase,
    running,
    start,
    pause,
    resume,
    reset,
  };
}
