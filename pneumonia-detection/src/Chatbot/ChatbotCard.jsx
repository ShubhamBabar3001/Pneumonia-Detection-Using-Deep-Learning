import React from "react";
import './ChatbotCard.css';
import botImage from '../Asset/bot.png';

function ChatbotCard({ source, response }) {
    return (
        <div className={`ChatbotCard ${source === "user" ? "userCard" : "botCard"}`}>
            {source === "user" ? (
                <p className="your">You:</p>
                
            ) : (
                <img src={botImage} alt="Bot:" />
                
            )}
            <p className="response">{response}</p>
        </div>
    );
}

export default ChatbotCard;
