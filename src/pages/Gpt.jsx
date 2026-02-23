// src/pages/Gpt.jsx
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import "../styles/Gpt.css"; // Neon chat styling

const API_BASE = "https://manifix.up.railway.app";

export default function Gpt() {
  const [messages, setMessages] = useState(() => {
    // Load saved chat from localStorage
    const saved = localStorage.getItem("chatMessages");
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState("");
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [listening, setListening] = useState(false);
  const [uploading, setUploading] = useState(false);
  const chatContainer = useRef(null);

  // Scroll chat to bottom
  useEffect(() => {
    if (chatContainer.current) {
      chatContainer.current.scrollTop = chatContainer.current.scrollHeight;
    }
    // Save messages to localStorage
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  // Text-to-Speech
  const speak = (text) => {
    if (!voiceEnabled || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-IN";
    utterance.rate = 1;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  };

  // Speech-to-Text
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

  // Send message
  const sendMessage = async (msg, isFile = false) => {
    if (!msg) return;

    const userMsg = { content: msg, role: "user", timestamp: Date.now(), type: isFile ? "file" : "text" };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    const thinkingMsg = { content: "ManifiX is thinking...", role: "bot", type: "thinking", timestamp: Date.now() };
    setMessages((prev) => [...prev, thinkingMsg]);

    try {
      const response = await axios.post(`${API_BASE}/chat`, { message: msg }, { timeout: 10000 });
      const replyText = response.data.reply || "I’m here with you 🤍";

      // Remove thinking message
      setMessages((prev) => prev.filter((m) => m !== thinkingMsg));

      // Streaming effect
      let idx = 0;
      const replyMsg = { content: "", role: "bot", timestamp: Date.now(), type: "text" };
      setMessages((prev) => [...prev, replyMsg]);

      const interval = setInterval(() => {
        if (idx < replyText.length) {
          replyMsg.content += replyText[idx];
          setMessages((prev) => [...prev.filter((m) => m !== replyMsg), replyMsg]);
          idx++;
        } else {
          clearInterval(interval);
          speak(replyText);
        }
      }, 25); // 25ms per character ~ typing effect
    } catch (err) {
      setMessages((prev) => prev.filter((m) => m !== thinkingMsg));
      setMessages((prev) => [
        ...prev,
        { content: "❌ Backend not reachable. Try again.", role: "bot", timestamp: Date.now() },
      ]);
    }
  };

  // File upload
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(`${API_BASE}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const fileUrl = res.data.url;
      sendMessage(fileUrl, true);
    } catch {
      alert("❌ File upload failed");
    } finally {
      setUploading(false);
      e.target.value = null;
    }
  };

  // Enter key sends message
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <div className="gpt-app">
      <header className="gpt-header">
        <img src="/manifix/assets/logo.png" alt="ManifiX Logo" className="gpt-logo" />
        <h1>ManifiX GPT</h1>
      </header>

     <main className="gpt-main">
  {messages.map((msg, index) => (
    <div
      key={index}
      className={`message-row ${msg.role === "user" ? "user" : "bot"}`}
    >
      <div className="message-bubble">
        {msg.isFile ? (
          <a
            href={msg.content}
            target="_blank"
            rel="noopener noreferrer"
            className="file-link"
          >
            📎 {msg.content.split("/").pop()}
          </a>
        ) : (
          <>
            <ReactMarkdown>{msg.content}</ReactMarkdown>

            {/* ✨ Twinkling Stars (Only for Bot, not thinking messages) */}
            {msg.role === "bot" &&
              msg.type !== "thinking" &&
              [...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className="twinkle-star"
                  style={{
                    top: `${Math.random() * 80}%`,
                    left: `${Math.random() * 80}%`,
                    animationDelay: `${Math.random()}s`,
                  }}
                />
              ))}
          </>
        )}
      </div>
    </div>
  ))}
</main>

      <footer className="gpt-footer">
        <button id="micBtn" className={listening ? "recording" : ""} onClick={handleMic}>
          🎤
        </button>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask Your ManifiX Anything…"
        />

        <label className="upload-btn">
          📎
          <input type="file" onChange={handleUpload} disabled={uploading} />
        </label>

        <button
  onClick={() => sendMessage(input.trim())}
  disabled={!input.trim()}
  className="primary"
>
  Send
</button>

        <button className="toggle-voice" onClick={() => setVoiceEnabled((prev) => !prev)}>
          {voiceEnabled ? "🔊 Voice ON" : "🔇 Voice OFF"}
        </button>
      </footer>
    </div>
  );
}
