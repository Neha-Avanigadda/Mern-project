import React, { useState } from 'react';
import { IoChatbubbles, IoClose, IoSend } from 'react-icons/io5';
import '../styles/Chatbot.css'

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="chatbot-container">
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h4>Library Assistant</h4>
            <button onClick={() => setIsOpen(false)}><IoClose /></button>
          </div>
          <div className="chatbot-messages">
             {/* Chat messages would be rendered here */}
             <div className="message bot">Hello! How can I help you find a book today?</div>
          </div>
          <div className="chatbot-input">
            <input type="text" placeholder="Ask me something..." />
            <button><IoSend /></button>
          </div>
        </div>
      )}
      <button className="chatbot-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <IoClose size={24}/> : <IoChatbubbles size={24}/>}
      </button>
    </div>
  );
};

export default Chatbot;