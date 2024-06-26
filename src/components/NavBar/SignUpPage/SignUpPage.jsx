import { useState } from 'react';
import './SignUpPage.css';

const SignUpPage = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = (event) => {
    event.preventDefault();
    if (password === confirmPassword) {
    // Add signup logic here
    alert('Sign up form submitted');
  } else {
    alert('Passwords do not match');
  }
}
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const passwordsMatch = password === confirmPassword;

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSignUp} className="signup-form">
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" required />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={password} onChange={handlePasswordChange}required />

        <label htmlFor="confirm-password">Confirm Password:</label>
        <input
          type="password"
          id="confirm-password"
          name="confirm-password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          required
        />


        <button type="submit" disabled={!passwordsMatch}>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpPage;