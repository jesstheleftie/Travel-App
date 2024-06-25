import Layout from "../../components/NavBar/Layout";
import SignUpPage from "../../components/NavBar/SignUpPage/SignUpPage";
import AuthBox from "../AuthBox/AuthBox";
import ChatPage from "../ChatPage/ChatPage";
import MyFavouritesPage from "../MyFavouritesPage/MyFavouritesPage";
import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Switch, BrowserRouter, Route } from 'react-router-dom';

function App() {
  const [user, setUser] = useState(true);
  const [showAuthPopup, setShowAuthPopup] = useState(false);


//passdown prop into component
//use prop inside component to make handle click
//pass down handle click to navbar

  return (
    <Router>
    <Layout setShowAuthPopup={setShowAuthPopup}>
      <Routes>
        <Route path="/" element={<ChatPage/>} />
        <Route path="/signup" element={<SignUpPage />} />
        {/* Add more routes as needed */}
      </Routes>
      {showAuthPopup && <AuthBox onClose={() => setShowAuthPopup(false)} setShowAuthPopup={setShowAuthPopup}/>}
    </Layout>
  </Router>

   
  );
}

export default App;
