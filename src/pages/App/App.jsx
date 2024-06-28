import Layout from "../../components/NavBar/Layout";
import SignUpPage from "../../components/NavBar/SignUpPage/SignUpPage";
import AuthBox from "../AuthBox/AuthBox";
import ChatPage from "../ChatPage/ChatPage";
import MyFavouritesPage from "../MyFavouritesPage/MyFavouritesPage";
import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Switch, BrowserRouter, Route } from 'react-router-dom';

function App() {

  const [user, setUser] = useState(null);
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const handleLoginClick =()=>{
    setShowAuthPopup(true);
    
  };
  //passdown prop into component
  //use prop inside component to make handle click
  //pass down handle click to navbar
  
  return (
    <Router>
    <Layout setShowAuthPopup={setShowAuthPopup} user={user} setUser={setUser} >
      <Routes >
        <Route path="/" element={<ChatPage />} />
        <Route path="/signup" element={<SignUpPage setUser={setUser}/>} />
        {/* Add more routes as needed */}
      </Routes>
      {showAuthPopup && <AuthBox onClose={() => setShowAuthPopup(false)} setShowAuthPopup={setShowAuthPopup} setUser={setUser}/>}
    </Layout>
  </Router>

   
  );
}

export default App;
