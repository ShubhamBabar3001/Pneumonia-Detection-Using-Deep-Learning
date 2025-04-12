import React, { useState } from 'react';
import './Chatbot.css';
import ChatbotCard from './ChatbotCard';
import axios from 'axios';
// ------------------------------- Font Awesome -------------------------
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocketchat } from "@fortawesome/free-brands-svg-icons"; // Correct import
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

function Chatbot() {
    const [chatbox, setChatBox] = useState(false);
    const [userQuestion, setUserQuestion] = useState("");
    const [messages, setMessages] = useState([]);

    function openCloseChat() {
        setChatBox(prevState => !prevState);
    }

    const HandleQuestionAnswer = async () => {
        if (!userQuestion.trim()) return;
    
        const userMessageCard = <ChatbotCard key={Date.now()} source="user" response={userQuestion} />;
        setMessages(prevMessages => [...prevMessages, userMessageCard]);
    
        setUserQuestion(""); // Clear input field immediately
    
        try {
            const res = await axios.post("http://localhost:5000/gemini", 
                { userQuestion }, 
                { headers: { "Content-Type": "application/json" } }
            );
    
            const aiResponse = res.data.response || "No response received.";
            const botMessageCard = <ChatbotCard key={Date.now()} source="bot" response={aiResponse} />;
            setMessages(prevMessages => [...prevMessages, botMessageCard]);
    
        } catch (error) {
            console.error("API Error:", error);
            const errorMessageCard = <ChatbotCard key={Date.now()} source="bot" response="Error fetching response." />;
            setMessages(prevMessages => [...prevMessages, errorMessageCard]);
        }
    };



    return (
        <div className="ChatbotDiv">
            {chatbox && (
                <div className="Chatbox">
                    <div id="Chat-Header">
                        <h2>How can I help?</h2>
                    </div>
                    <div id="Chat-body">
                        {/* Chat messages will go here */}
                        {messages.map((msg, index) => (
                            <React.Fragment key={index}>{msg}</React.Fragment>
                        ))}
                    </div>
                    <div id="Chat-input">
                        <input
                            type="text"
                            placeholder="Type your message"
                            value={userQuestion} // Bind value to state
                            onChange={(e) => setUserQuestion(e.target.value)}
                        />
                        <button id="Chat-sendbtn" onClick={HandleQuestionAnswer}>
                            <FontAwesomeIcon icon={faPaperPlane} />
                        </button>
                    </div>
                </div>
            )}
            <div id="ChatbotBtn">
                <FontAwesomeIcon icon={faRocketchat} onClick={openCloseChat} />
            </div>
        </div>
    );
}

export default Chatbot;
