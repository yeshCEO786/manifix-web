// src/pages/Gpt.jsx
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../styles/Gpt.css"; // Make sure this file exists for styling

export default function Gpt() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [listening, setListening] = useState(false);
  const [uploading, setUploading] = useState(false);
  const chatContainer = useRef(null);
  const inputRef = useRef(null);

  const API_BASE = "http://localhost:5000";



  // -------------------- SCROLL TO BOTTOM --------------------
  useEffect(() => {
    if (chatContainer.current) {
      chatContainer.current.scrollTop = chatContainer.current.scrollHeight;
    }
  }, [messages]);

  // -------------------- TEXT-TO-SPEECH --------------------
  const speak = (text) => {
    if (!voiceEnabled || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-IN";
    utterance.rate = 1;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  };

  // -------------------- SPEECH-TO-TEXT --------------------
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;
  if (recognition) recognition.lang = "en-IN";

  const handleMic = () => {
    if (!recognition) return alert("STT not supported on this device");
    if (listening) {
      recognition.stop();
      setListening(false);
      return;
    }
    recognition.start();
    setListening(true);
    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setInput(transcript);
    };
    recognition.onend = () => setListening(false);
  };

  // -------------------- SEND MESSAGE --------------------
  const sendMessage = async (msg, isFile = false) => {
    if (!msg) return;
    const newMsg = { content: msg, role: "user", timestamp: Date.now(), type: isFile ? "file" : "text" };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");

    const thinkingMsg = { content: "ManifiX is thinking...", role: "bot", type: "thinking" };
    setMessages((prev) => [...prev, thinkingMsg]);

    try {
      const response = await axios.post(`${API_BASE}/chat`, { message: msg });
      const reply = response.data.reply || "I’m here with you 🤍";
      setMessages((prev) => prev.filter((m) => m !== thinkingMsg));
      setMessages((prev) => [...prev, { content: reply, role: "bot", timestamp: Date.now() }]);
      speak(reply);
    } catch {
      setMessages((prev) => prev.filter((m) => m !== thinkingMsg));
      setMessages((prev) => [...prev, { content: "❌ Backend not reachable", role: "bot", timestamp: Date.now() }]);
    }
  };

  // -------------------- HANDLE FILE UPLOAD --------------------
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(`${API_BASE}/upload`, formData, { headers: { "Content-Type": "multipart/form-data" } });
      const fileUrl = res.data.url;
      sendMessage(fileUrl, true);
    } catch {
      alert("❌ File upload failed");
    } finally {
      setUploading(false);
      e.target.value = null;
    }
  };

  // -------------------- HANDLE ENTER --------------------
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <div className="gpt-app">
      <header>
        <h1>ManifiX</h1>
      </header>

      <main ref={chatContainer} className="chat-container">
        {messages.map((msg, idx) => (
          <div key={idx} className={`msg-wrapper ${msg.role}`}>
            <div className={`msg-bubble ${msg.type === "thinking" ? "thinking" : ""}`}>
              {msg.type === "file" ? (
                <a href={msg.content} target="_blank" rel="noopener noreferrer" className="file-link">
                  📎 {msg.content.split("/").pop()}
                </a>
              ) : (
                msg.content
              )}
            </div>
          </div>
        ))}
      </main>

      <footer>
        <button id="micBtn" className={listening ? "recording" : ""} onClick={handleMic}>
          {listening ? "🎙" : "🎤"}
        </button>

        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask Your ManifiX Anything…"
        />

        <label className="upload-btn">
          📁
          <input type="file" onChange={handleUpload} disabled={uploading} />
        </label>

        <button onClick={() => sendMessage(input)} disabled={!input} className="primary">
          Send
        </button>

        <button
          className="togglespeech"
          onClick={() => setVoiceEnabled((prev) => !prev)}
        >
          {voiceEnabled ? "🔊 Voice ON" : "🔇 Voice OFF"}
        </button>
      </footer>
    </div>
  );
}
