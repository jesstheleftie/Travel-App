import AuthPage from "../AuthPage/AuthPage";
import ChatPage from "../ChatPage/ChatPage";
import MyFavouritesPage from "../MyFavouritesPage/MyFavouritesPage";
import "./App.css";
import { useState } from "react";

function App() {
  const [user, setUser] = useState(true);
  const [showAuthPopup, setShowAuthPopup] = useState(false);

  return (
    

    <main className="App">
      <ChatPage setShowAuthPopup={setShowAuthPopup} />
      {showAuthPopup && <AuthPage />}
    </main>
  );
}

export default App;
