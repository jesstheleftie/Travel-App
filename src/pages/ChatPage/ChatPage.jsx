import NavBar from "../../components/NavBar/NavBar";
import AuthBox from "../AuthBox/AuthBox";
import MyFavouritesPage from "../MyFavouritesPage/MyFavouritesPage";
import "./ChatPage.css";
import React, { useEffect, useState, useRef } from "react";
import OpenAI from "openai";
import { darkOat, sideNavWidth } from "../../globalStyle";
import heroImage from "../../Assets/Travel App Hero Page.jpg";

import formatConversations from "../../utilities/formatConversations";
const ChatPage = ({ user }) => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "👋🏻 Hi, my name is Alva! I'm your travel connoisseur, how can I help you?",
    },
  ]);
  const [userMessage, setUserMessage] = useState("");
  const messagesEndRef = useRef(null);
  const [showSideNav, setShowSideNav] = useState(true);
  const [selectedConversation, setSelectedConversation] = useState(null);
  // const handleLoginClick = () => {
  //   setShowAuthPopup(true);
  // };

  const openai = new OpenAI({
    apiKey: "sk-proj-rp5o6KgHqwMHBqrPdKVrT3BlbkFJoGZym5XLa3K6uUKAQ9RB",
    dangerouslyAllowBrowser: true,
    project: "proj_7bMjGbjvLN4CkTJsn2OQJlyY",
  });
  const sendMessage = async () => {
    if (userMessage.trim() === "") return;

    const newMessage = { role: "user", content: userMessage };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setUserMessage("");

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [...messages, newMessage],
    });

    const assistantMessage = response.choices[0].message;
    setMessages((prevMessages) => [
      ...prevMessages,
      // newMessage,
      assistantMessage,
    ]);
  };
  const handleInputChange = (e) => {
    setUserMessage(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const renderMessages = () => {
    return messages.map((msg, index) => (
      <div key={index} className={`message ${msg.role}`}>
        <p>{msg.content}</p>
      </div>
    ));
  };
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  //generate random ID
  const generateRandomID = (length) => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomID = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomID += characters[randomIndex];
    }
    return randomID;
  };

  // Dummy conversation array
  const dummyConversationArray = [
    {
      id: 1,
      conversationName: "France",
      messagesArray: [
        { role: "assistant", content: "How can I help you today" },
        { role: "user", content: "Want to go to france" },
        { role: "assistant", content: "Great let me help you" },
      ],
      lastEditedTime: Date.now() - 1 * 60 * 60 * 1000, // 1 hour ago
    },
    {
      id: 2,
      conversationName: "California",
      messagesArray: [
        { role: "assistant", content: "How can I help you today" },
        { role: "user", content: "Want to go to California" },
        { role: "assistant", content: "Great let me help you" },
      ],
      lastEditedTime: Date.now() - 1 * 60 * 60 * 1000, // 1 hour ago
    },
    {
      id: 3,
      conversationName: "Italy",
      messagesArray: [
        { role: "assistant", content: "How can I help you today" },
        { role: "user", content: "Want to go to italy" },
        { role: "assistant", content: "Great let me help you" },
      ],
      lastEditedTime: Date.now() - 24 * 60 * 60 * 1000, // 24 hours ago
    },
    {
      id: 4,
      conversationName: "China",
      messagesArray: [
        { role: "assistant", content: "How can I help you today" },
        { role: "user", content: "Want to go to china" },
        { role: "assistant", content: "Great let me help you" },
      ],
      lastEditedTime: Date.now() - 5 * 24 * 60 * 60 * 1000, // 5 days ago
    },
    {
      id: 5,
      conversationName: "Japan",
      messagesArray: [
        { role: "assistant", content: "How can I help you today" },
        { role: "user", content: "Want to go to japan" },
        { role: "assistant", content: "Great let me help you" },
      ],
      lastEditedTime: Date.now() - 20 * 24 * 60 * 60 * 1000, // 20 days ago
    },
    {
      id: 6,
      conversationName: "Germany",
      messagesArray: [
        { role: "assistant", content: "How can I help you today" },
        { role: "user", content: "Want to go to germany" },
        { role: "assistant", content: "Great let me help you" },
      ],
      lastEditedTime: Date.now() - 40 * 24 * 60 * 60 * 1000, // 40 days ago
    },
  ];
  // Format conversations into periods
  const formattedPeriods = formatConversations(dummyConversationArray);

  const handleConversationClick = (conversationId) => {
    if (isSmallSize) {
      setShowSideNav(false);
    }
    setSelectedConversation(conversationId);
  };

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [isSmallSize, setIsSmallSize] = useState(false);

  useEffect(() => {
    //run something
    setIsSmallSize(windowWidth < 769);
  }, [windowWidth]);

  useEffect(() => {
    if (isSmallSize) {
      setShowSideNav(false);
    } else {
      setShowSideNav(true);
    }
  }, [isSmallSize]);

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: "1 1 auto" }}>
      {!user && (
        <div className="hero-container">
          <img src={heroImage} alt="Hero" className="hero-image" />
        </div>
      )}
      <div
        style={{
          display: "flex",
          flex: "1 1 auto",
          // flexDirection: "column",
          position: "relative",
        }}
      >
        {/* {bigMode && showNav && ( */}
        {user && (
          <div
            onClick={() => setShowSideNav(!showSideNav)}
            style={{
              position: "fixed",
              padding: "2px 6px",
              border: "2px solid white",
              borderRadius: "5px",
              cursor: "pointer",
              userSelect: "none",
              background: "#b88a58",
              color: "white",
              margin: "5px",
              fontSize: "12px",
              zIndex: 3,
            }}
          >
            {showSideNav ? "Hide " : "Show "}Nav
          </div>
        )}
        <div
          style={{
            // width: "20%",
            width: `${showSideNav && user ? sideNavWidth + "px" : "0%"}`,
            background: darkOat,
            transition: "all 0.25s ease",
            overflow: "hidden",
            zIndex: 2,
            position: showSideNav && isSmallSize ? "absolute" : "relative",
            height: showSideNav && isSmallSize ? "100%" : "auto",
          }}
        >
          <div
            style={{
              marginTop: "30px",
              marginLeft: "10px",
              color: "#b88a58",
              fontWeight: "bold",
            }}
          >
            Chat&nbsp;History
          </div>
          {/* <SideNav /> */}
          <div style={{ padding: "10px" }}>
            {Object.keys(formattedPeriods).map((period) => (
              <div key={period}>
                <div style={{ color: "grey", margin: "5px 0" }}>
                  {formattedPeriods[period].periodName}
                </div>
                {formattedPeriods[period].conversation.map((item, index) => (
                  <div
                    key={item.id}
                    style={{ cursor: "pointer", marginLeft: "10px" }}
                    onClick={() => {
                      console.log("item", item);
                      handleConversationClick(item.conversation.id);
                    }}
                  >
                    {item.conversation.conversationName}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            width: `${
              showSideNav && user && !isSmallSize
                ? `calc(100% - ${sideNavWidth}px)`
                : "100%"
            }`,
            transition: "all 0.25s ease",
            position: "relative",
          }}
        >
          {/* <div className="appSlogan">
          Ask Illy, your travel companion for seamless journeys.
        </div> */}
          {showSideNav && isSmallSize && (
            <div
              onClick={() => {
                setShowSideNav(false);
              }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(150,150,150,0.5)",
                zIndex: 1,
              }}
            ></div>
          )}
          <div className="chat-box" style={{ position: "relative", zIndex: 0 }}>
            {/* Messages Container (Could be a separate component) */}
            <div
              className="messages"
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div className="chatBoxTitle">New Chat</div>
              {selectedConversation &&
                dummyConversationArray
                  .find((eachConvo) => {
                    return eachConvo.id === selectedConversation;
                  })
                  .messagesArray.map((message, index) => (
                    <div
                      key={index}
                      className={`message ${message.role}`}
                      style={{
                        maxWidth: "70%",
                        textAlign: "left",
                        borderRadius: "15px",
                        padding: "5px 15px",
                        lineHeight: "20px",
                        margin: "5px 20px 5px 0px",
                      }}
                    >
                      {message.content}
                    </div>
                  ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input message box and send button */}
            <div className="message-input">
              <input
                type="text"
                placeholder="Ask Alva anyting about traveling..."
                value={userMessage}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                disabled={showSideNav && isSmallSize}
              />
              <button
                onClick={sendMessage}
                disabled={showSideNav && isSmallSize}
              >
                Send
              </button>
            </div>
            <div
              className="aiTag"
              style={{ display: "flex", justifyContent: "center" }}
            >
              Powered by{" "}
              <span className="AI" style={{ marginLeft: "5px" }}>
                AI
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
