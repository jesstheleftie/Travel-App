import NavBar from '../../components/NavBar/NavBar';
import AuthBox from '../AuthBox/AuthBox';
import MyFavouritesPage from '../MyFavouritesPage/MyFavouritesPage';
import './ChatPage.css';
import React, { useState } from 'react';

 const ChatPage=({setShowAuthPopup})=>{

  const handleLoginClick = () => {
    setShowAuthPopup(true);
  };
    return (


       <div>
        
        
          <div className="appSlogan">Ask Illy, your travel companion for seamless journeys.</div>
       
        <div className="chat-box">
        {/* Messages Container (Could be a separate component) */}
        <div className="messages">

          {/* Example message */}
          <div className="message"> 👋🏻 Hi, my name is Illy! I'm your travel genius, how can I help you? </div>
        </div>

        {/* Input message box and send button */}
        <div className="message-input">
          <input type="text" placeholder="Ask Illy anyting about traveling..." />
          <button>Send</button>
        </div>
        <div className="aiTag"> Powered by <selection className="AI">AI</selection></div>
      </div>

      </div>
      )
 
}

export default ChatPage;