import { useState } from "react";
import SignUpPage from "../../components/NavBar/SignUpPage/SignUpPage";
import "./AuthBox.css";
import { Link } from "react-router-dom";

const AuthBox = ({ onClose, setShowAuthPopup}) => {

  const [credentialInformation, setCredentialInformation] = useState({username:'',password:''});
  const [error,setError] = useState('')
  const handleChange = (e) => {
    setCredentialInformation({
      ...credentialInformation,
      [e.target.name]: e.target.value,
    });
  };

const handleLogin = (e)=>{
  e.preventDefault()
console.log('Login with API Call', credentialInformation)
}

  return (
    <div className="auth-overlay">
      <div className="auth-box">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <h2>Login</h2>
        <div>{error}</div>
        <form autoComplete="off">
          <label htmlFor="username">Username:</label>
          {/* onChange={(e) => setUsername(e.target.value)} */}
          <input
            type="text"
            id="username"
            name="username"
            required
            value={credentialInformation.username}
            onChange={handleChange}
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            value={credentialInformation.password}
            onChange={handleChange}
          />
          <button type="submit" onClick={handleLogin}>Login</button>
        </form>
        <Link
          to="/signup"
          className="signup-link"
          onClick={() => {
            //set pop up box to false
            setShowAuthPopup(false);
          }}
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default AuthBox;
