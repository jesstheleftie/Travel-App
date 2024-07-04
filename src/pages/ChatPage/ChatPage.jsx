import NavBar from "../../components/NavBar/NavBar";
import AuthBox from "../AuthBox/AuthBox";
import MyFavouritesPage from "../MyFavouritesPage/MyFavouritesPage";
import "./ChatPage.css";
import React, { useEffect, useState, useRef, useMemo } from "react";
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
  const [selectedConversationId, setSelectedConversationId] = useState(null);
  const [conversationArray, setConversationArray] = useState([]);
  const [isSmallSize, setIsSmallSize] = useState(false);
  const defaultConversationTitle = "New Chat";
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [conversationName, setConversationName] = useState(
    defaultConversationTitle
  );
  const [editTitle, setEditTitle] = useState(false);
  const [triggerRender, setTriggerRender] = useState(true);

  // Format conversations into periods
  const formattedPeriods = formatConversations(conversationArray);

  const handleConversationClick = (conversationId) => {
    if (isSmallSize) {
      setShowSideNav(false);
    }
    setSelectedConversationId(conversationId);
  };

  //This function saves conversation to database by ID
  const saveConversationToDatabase = async (conversationId) => {
    let conversationArrayCopy = [...conversationArray];
    const foundConversation = conversationArrayCopy.find((conversation) => {
      return conversation._id === conversationId;
    });
    if (!foundConversation) return;

    try {
      const response = await fetch("/api/conversations/saveConversation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          conversation: foundConversation,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("data", data);
        foundConversation._id = data.conversation._id;
        delete foundConversation.isNew;

        setSelectedConversationId(data.conversation._id);
        // setConversationArray(data.conversations);
        // setMessage("Sign up Successful!");
        // setUser({ username: data.username, email: data.email });
      } else {
        // setMessage(`Credentials not found!: ${data.message}`);
      }
    } catch (error) {
      // setMessage("Get Conversation Error!");
    }
  };

  //delete function
  const deleteConversation = async (conversationId) => {
    if (!conversationId) return;
    try {
      const response = await fetch("/api/conversations/deleteConversation", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: conversationId,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        let conversationArrayCopy = [...conversationArray];

        let updatedConversation = [];

        conversationArrayCopy.forEach((conversation) => {
          if (conversation._id !== conversationId) {
            updatedConversation.push(conversation);
          }
        });

        setConversationArray(updatedConversation);
        setSelectedConversationId(null);
        // setConversationArray(data.conversations);
        // setMessage("Sign up Successful!");
        // setUser({ username: data.username, email: data.email });
        setShowDeletePopup(false);
      } else {
        // setMessage(`Credentials not found!: ${data.message}`);
      }
    } catch (error) {
      // setMessage("Get Conversation Error!");
    }
  };

  useEffect(() => {
    saveConversationToDatabase(selectedConversationId);
  }, [conversationArray, triggerRender]);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const defaultFirstMessage = {
    role: "assistant",
    content:
      "👋🏻 Hi, my name is Alva! I'm your travel connoisseur, how can I help you?",
  };

  // console.log("conversationArray", conversationArray);

  const openai = new OpenAI({
    apiKey: "sk-proj-rp5o6KgHqwMHBqrPdKVrT3BlbkFJoGZym5XLa3K6uUKAQ9RB",
    dangerouslyAllowBrowser: true,
    project: "proj_7bMjGbjvLN4CkTJsn2OQJlyY",
  });
  const sendMessage = async () => {
    if (userMessage.trim() === "") return;

    //If none existed, create it!
    const newMessage = { role: "user", content: userMessage };
    let temporaryMessageArray = [];
    const randomId = generateRandomID(16);
    let conversationArrayCopy = [...conversationArray];
    if (!selectedConversationId) {
      //
      temporaryMessageArray = [defaultFirstMessage, newMessage];
      const newConversationObj = {
        conversationName: conversationName,
        email: user.email,
        lastEditedTime: Date.now(),
        messagesArray: temporaryMessageArray,
        _id: randomId,
        isNew: true,
      };
      conversationArrayCopy = [newConversationObj, ...conversationArray];
      setConversationArray(conversationArrayCopy);
      setSelectedConversationId(randomId);
    }
    //What if it exists already? Find it!
    else {
      const foundConversation = conversationArrayCopy.find((conversation) => {
        return conversation._id === selectedConversationId;
      });
      if (!foundConversation) return;
      //
      temporaryMessageArray = [newMessage, ...foundConversation.messagesArray];
      foundConversation.messagesArray = temporaryMessageArray;
      foundConversation.lastEditedTime = Date.now();
      setConversationArray(conversationArrayCopy);
    }

    setUserMessage("");

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: temporaryMessageArray,
    });

    const assistantMessage = response.choices[0].message;
    const foundConversation = conversationArrayCopy.find((conversation) => {
      if (selectedConversationId) {
        return conversation._id === selectedConversationId;
      } else {
        return conversation._id === randomId;
      }
    });
    if (!foundConversation) return;
    foundConversation.messagesArray.push(assistantMessage);
    setConversationArray(conversationArrayCopy);
    setTriggerRender(!triggerRender);
  };

  const handleInputChange = (e) => {
    setUserMessage(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
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

  const runGetConversations = async () => {
    try {
      const response = await fetch("/api/conversations/getConversations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setConversationArray(data.conversations);
        // setMessage("Sign up Successful!");
        // setUser({ username: data.username, email: data.email });
      } else {
        // setMessage(`Credentials not found!: ${data.message}`);
      }
    } catch (error) {
      // setMessage("Get Conversation Error!");
    }
  };

  useEffect(() => {
    if (conversationArray.length === 0) {
      runGetConversations();
    }
  }, []);

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

  //Focus on input
  useEffect(() => {
    if (!editTitle) return;
    setTimeout(() => {
      document.getElementById("titleChangeBox").focus();
    }, 500);
  }, [editTitle]);
  //Change title name when rendering

  const [conversationNameString, setConversationNameString] = useState("");

  useEffect(() => {
    if (!selectedConversationId) {
      setConversationNameString(defaultConversationTitle);
    }
    const conversation = conversationArray.find((conversation) => {
      return conversation._id === selectedConversationId;
    });
    if (!conversation || !conversation.conversationName) return;
    setConversationNameString(conversation.conversationName);
  }, [selectedConversationId, conversationArray]);

  const handleNameChange = (e) => {
    if (!selectedConversationId) {
      setConversationName(e.target.value);
    } else {
      let conversationArrayCopy = [...conversationArray];

      const foundConversation = conversationArrayCopy.find((conversation) => {
        return conversation._id === selectedConversationId;
      });

      if (!foundConversation) return;

      foundConversation.conversationName = e.target.value;

      setConversationArray(conversationArrayCopy);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: "1 1 auto",
      }}
    >
      {showDeletePopup && (
        <div
          style={{
            position: "fixed",
            top: 0,
            bottom: 0,
            backgroundColor: "rgb(150,150,150,0.5)",
            zIndex: 5,
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              height: "100px",
              width: "400px",
              background: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              flexDirection: "column",
            }}
          >
            <div>Are you sure you want to delete this conversation?</div>
            <div style={{ display: "flex" }}>
              <div
                style={{
                  // marginTop: "10px",
                  padding: "5px 10px",
                  background: "rgb(200,100,100)",
                  width: "100px",
                  textAlign: "center",
                  color: "white",
                  cursor: "pointer",
                }}
                onClick={() => deleteConversation(selectedConversationId)}
              >
                Delete
              </div>
              <div
                style={{
                  marginLeft: "10px",
                  padding: "5px 10px",
                  background: "rgb(100,100,100)",
                  width: "100px",
                  textAlign: "center",
                  color: "white",
                  cursor: "pointer",
                }}
                onClick={() => setShowDeletePopup(false)}
              >
                Cancel
              </div>
            </div>
          </div>
        </div>
      )}
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
              cursor: "pointer",
            }}
            className="startChatHover"
            onClick={() => {
              setSelectedConversationId(null);
              setConversationName(defaultConversationTitle);
            }}
          >
            Start New Chat
          </div>
          <div
            style={{
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
                    key={index}
                    style={{ cursor: "pointer", marginLeft: "10px" }}
                    onClick={() => {
                      console.log("item", item);
                      handleConversationClick(item.conversation._id);
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
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                  justifyContent: "center",
                  marginBottom: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <div>
                    {!editTitle ? (
                      <div
                        className="chatBoxTitle"
                        style={{ border: "1px solid transparent" }}
                      >
                        {selectedConversationId
                          ? conversationNameString
                          : conversationName}
                      </div>
                    ) : (
                      <input
                        value={
                          selectedConversationId
                            ? conversationNameString
                            : conversationName
                        }
                        onChange={(e) => {
                          handleNameChange(e);
                        }}
                        id="titleChangeBox"
                        style={{
                          background: "transparent",
                          border: "1px solid white",
                          outline: "none",
                          borderRadius: "5px",
                          color: "white",
                          fontWeight: "bold",
                          fontSize: "16px",
                          maxWidth: "500px",
                        }}
                      />
                    )}

                    <div
                      style={{
                        cursor: "pointer",
                        fontSize: "10px",
                        fontWeight: "bold",
                        color: "rgb(200,200,200)",
                        textAlign: "left",
                      }}
                      onClick={() => {
                        setEditTitle(!editTitle);
                      }}
                    >
                      {editTitle ? "Done" : "Edit"}
                    </div>
                  </div>
                  {selectedConversationId && (
                    <div
                      onClick={() => {
                        setShowDeletePopup(true);
                      }}
                    >
                      Delete
                    </div>
                  )}
                </div>
              </div>
              {selectedConversationId &&
                conversationArray
                  .find((eachConvo) => {
                    return eachConvo._id === selectedConversationId;
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

              {!selectedConversationId &&
                messages.map((message, index) => (
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
              <span
                className="AI"
                style={{ marginLeft: "5px" }}
                // onClick={() => runGetConversations()}
              >
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
