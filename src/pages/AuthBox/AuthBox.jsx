import SignUpPage from '../../components/NavBar/SignUpPage/SignUpPage';
import './AuthBox.css';
import { Link } from 'react-router-dom';


 const AuthBox=({onClose,setShowAuthPopup})=>{
    return (
    
      <div className="auth-overlay">
      <div className="auth-box">
        <button className="close-btn" onClick={onClose}>&times;</button>
        <h2>Login</h2>
        <form>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" required />
          
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
          
          <button type="submit">Login</button>
        </form>
        <Link to="/signup" className="signup-link" onClick={()=>{
//set pop up box to false
setShowAuthPopup(false)
        }}>Sign Up</Link>
      </div>
    </div>
      )
 
}

export default AuthBox;