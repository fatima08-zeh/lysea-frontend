// 📁 frontend/src/components/Chatbot.jsx
import React, { useState } from 'react';
import './Chatbot.css';
const API_BASE = "https://lysea-backend.onrender.com";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    try {
      const res = await fetch(`${API_BASE}/api/chat`, {

        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input })
      });

      const data = await res.json();

if (res.ok && data.reply) {
  setMessages([...newMessages, { sender: "bot", text: data.reply }]);
} else {
  setMessages([...newMessages, {
    sender: "bot",
    text: "Désolé, une erreur est survenue ou je n’ai pas compris."
  }]);
}

    } catch (error) {
      console.error("Erreur chatbot:", error);
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-button" onClick={toggleChat}>
        💬
      </div>

      {isOpen && (
        <div className="chatbot-box">
          <div className="chatbot-header">Besoin d'aide ?</div>
          <div className="chatbot-messages">
  {messages.map((msg, i) => (
    <div key={i} className={`chat-message ${msg.sender}`}>
      {msg.sender === "bot" ? (
        <span dangerouslySetInnerHTML={{ __html: msg.text }} />
      ) : (
        msg.text
      )}
    </div>
  ))}
</div>
          <div className="chatbot-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Posez votre question..."
            />
            <button onClick={handleSend}>Envoyer</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
