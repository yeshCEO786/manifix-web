// ===============================
// REACT & HOOKS
// ===============================
import React, { useState, useEffect, useRef } from "react";

// ===============================
// COMPONENTS
// ===============================
import ChatBox from "../components/Chat/ChatBox.jsx";
import ChatInput from "../components/Chat/ChatInput.jsx";
import ChatMessage from "../components/Chat/ChatMessage.jsx";

import CameraView from "../components/Vision/CameraView.jsx";
import CameraStats from "../components/Vision/CameraStats.jsx";
import EmotionOverlay from "../components/Vision/EmotionOverlay.jsx";

import VibeFeed from "../components/Vibe/VibeFeed.jsx";
import VibeCreate from "../components/Vibe/VibeCreate.jsx";
import VibeItem from "../components/Vibe/VibeItem.jsx";
import VibeStoryPlayer from "../components/Vibe/VibeStoryPlayer.jsx";
import VibePrivacyToggle from "../components/Vibe/VibePrivacyToggle.jsx";

import Magic16Controls from "../components/Magic16/Magic16Controls.jsx";
import Magic16Timer from "../components/Magic16/Magic16Timer.jsx";

import ProfileCard from "../components/Profile/ProfileCard.jsx";
import ManifestList from "../components/Profile/ManifestList.jsx";

import Button from "../components/UI/Button.jsx";
import Loader from "../components/UI/Loader.jsx";
import Modal from "../components/UI/Modal.jsx";

// ===============================
// UTILS IMPORTS
// ===============================
import { formatDate } from "../utils/formatDate.js";
import { callApi } from "../utils/apiHelpers.js";
import { captureCameraFrame } from "../utils/CameraUtils.js";
import { processChatMessage } from "../utils/ChatUtils.js";
import { startMagic16, stopMagic16, formatTime } from "../utils/Magic16Utils.js";
import { mapEmotions } from "../utils/emotionMapping.js";
import { isValidEmail, isValidPassword, isNotEmpty } from "../utils/validators.js";
import { debounce } from "../utils/debounce.js";
import { throttle } from "../utils/throttle.js";
import { logEvent } from "../utils/logger.js";
import { getManifest, addManifest } from "../utils/Manifest.js";
import { generateId } from "../utils/randomId.js";
import { setStorage, getStorage } from "../utils/storage.js";
import { processVibe } from "../utils/VibeUtils.js";
import { analyzeVision } from "../utils/VisionUtils.js";
import { speakText, listenVoice } from "../utils/VoiceUtils.js";

// ===============================
// SERVICES
// ===============================
import authService from "../services/auth.service.js";
import chatService from "../services/chat.service.js";
import vibeService from "../services/vibe.service.js";
import magic16Service from "../services/magic16.service.js";
import voiceService from "../services/voice.service.js";
import visionService from "../services/vision.service.js";
import manifestService from "../services/manifest.service.js";
import sttService from "../services/stt.service.js";
import ttsService from "../services/tts.service.js";

// ===============================
// DASHBOARD COMPONENT
// ===============================
export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [vibeFeed, setVibeFeed] = useState([]);
  const [magic16Status, setMagic16Status] = useState({ active: false, phase: null });
  const [visionData, setVisionData] = useState({ faceCount: 0, emotions: [], posture: "neutral" });
  const [inputText, setInputText] = useState("");

  const videoRef = useRef(null);
  const chatBoxRef = useRef(null);

  // ===============================
  // USER AUTH & SESSION
  // ===============================
  useEffect(() => {
    async function loadUser() {
      const u = await authService.getCurrentUser();
      setUser(u);
    }
    loadUser();
  }, []);

  // ===============================
  // VISION INIT
  // ===============================
  useEffect(() => {
    async function startVision() {
      if (!videoRef.current) return;
      await visionService.init();
      await visionService.startCamera(videoRef.current, { fps: 5, onUpdate: setVisionData });
    }
    startVision();
    return () => visionService.cleanup();
  }, []);

  // ===============================
  // MAGIC16 HANDLERS
  // ===============================
  const handleStartMagic16 = () => {
    magic16Service.start({
      onUpdate: ({ phase, message }) => {
        setMagic16Status({ active: true, phase });
        ttsService.speak(message);
      },
    });
  };

  const handleStopMagic16 = () => {
    magic16Service.stop();
    setMagic16Status({ active: false, phase: null });
  };

  // ===============================
  // CHAT HANDLER
  // ===============================
  const handleSendMessage = async (text) => {
    if (!text.trim()) return;
    const userMessage = { role: "user", content: text, timestamp: Date.now() };
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const reply = await chatService.sendMessage({ conversationId: "main", userMessage: text });
      const aiMessage = { role: "assistant", content: reply, timestamp: Date.now() };
      setMessages((prev) => [...prev, aiMessage]);

      voiceService.speak(reply);

      if (chatBoxRef.current) chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    } catch (err) {
      console.error("Chat error:", err);
    } finally {
      setIsTyping(false);
    }
  };

  // ===============================
  // VIBE FEED
  // ===============================
  useEffect(() => {
    async function loadVibes() {
      const feed = await vibeService.getFeed();
      setVibeFeed(feed);
    }
    loadVibes();
  }, []);

  // ===============================
  // STT INIT
  // ===============================
  useEffect(() => {
    sttService.init({ language: "en-US", onResult: (text) => setInputText(text) });
  }, []);

  // ===============================
  // RENDER
  // ===============================
  return (
    <div className="dashboard-container">
      {/* HEADER */}
      <header className="dashboard-header">
        <h1>✨ ManifiX</h1>
        <span className="status">Online</span>
      </header>

      {/* CHAT SECTION */}
      <section className="chat-section">
        <ChatBox messages={messages} isTyping={isTyping} ref={chatBoxRef} />
        <ChatInput
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onSend={() => handleSendMessage(inputText)}
          disabled={isTyping}
        />
      </section>

      {/* MAGIC16 SECTION */}
      <section className="magic16-section">
        <h3>Magic16 🌸</h3>
        <p>Status: {magic16Status.active ? magic16Status.phase : "Inactive"}</p>
        {!magic16Status.active ? (
          <Button onClick={handleStartMagic16}>Start Session</Button>
        ) : (
          <Button onClick={handleStopMagic16}>Stop Session</Button>
        )}
        <Magic16Timer />
        <Magic16Controls />
      </section>

      {/* VISION SECTION */}
      <section className="vision-section">
        <h3>Vision 🌟</h3>
        <CameraView ref={videoRef} />
        <CameraStats data={visionData} />
        <EmotionOverlay emotions={visionData.emotions} />
      </section>

      {/* VIBE SECTION */}
      <section className="vibe-section">
        <h3>Vibe Feed ✨</h3>
        <VibeCreate />
        <VibePrivacyToggle />
        <VibeFeed feed={vibeFeed} />
      </section>

      {/* PROFILE / MANIFEST */}
      <section className="profile-section">
        <h3>Profile</h3>
        <ProfileCard user={user} />
        <ManifestList list={manifestService.getAll()} />
        <Button onClick={() => authService.signOut()}>Logout</Button>
      </section>

      {/* OPTIONAL MODAL / LOADER */}
      <Loader />
      <Modal />
    </div>
  );
}
