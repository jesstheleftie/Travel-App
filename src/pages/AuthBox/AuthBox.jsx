import { useState } from "react";
import SignUpPage from "../../components/NavBar/SignUpPage/SignUpPage";
import "./AuthBox.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AuthBox = ({ onClose, setShowAuthPopup, setUser }) => {
  const [credentialInformation, setCredentialInformation] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const handleChange = (e) => {
    setCredentialInformation({
      ...credentialInformation,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();

    //Fetch stuff here, afterwards setUser()
    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentialInformation.email.toLowerCase(),
          password: credentialInformation.password,
        }),
      });

      const data = await response.json();
      console.log(3);
      if (response.ok) {
        // setMessage("Sign up Successful!");
        setUser({ username: data.username, email: data.email });
        setTimeout(() => {
          navigate("/");
        }, 100);
        setShowAuthPopup(false);
      } else {
        setMessage(`Credentials not found!: ${data.message}`);
      }
    } catch (error) {
      setMessage("Login Error!");
    }
  };

  return (
    <div className="auth-overlay">
      <div className="auth-box">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <h2>Login</h2>
        <div>{error}</div>
        <form autoComplete="off">
          <label htmlFor="email">Email:</label>
          {/* onChange={(e) => setemail(e.target.value)} */}
          <input
            type="text"
            id="email"
            name="email"
            required
            value={credentialInformation.email}
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
          <button type="submit" onClick={handleLogin}>
            Login
          </button>
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
