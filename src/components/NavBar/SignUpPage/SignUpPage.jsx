import { useState } from 'react';
import './SignUpPage.css';

const SignUpPage = () => {
    const [username, setUsername] = useState('');
    const[email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async (event) => {
    event.preventDefault();

    if (password === confirmPassword) {
    // Add signup logic here
    try {
        console.log('befpre')
        const response = await fetch('/api/users/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
        },
          body: JSON.stringify({ username, email, password }),
        });
        console.log('after')

        const data = await response.json();
        if (response.ok) {
          alert('Sign up form submitted successfully');
        } else {
          alert(data.message);
        }
      } catch (error) {
        alert('Error submitting signup form');
      }
    } else {
      alert('Passwords do not match');
    }
};

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleUserNameChange = (e) => {
    setUsername(e.target.value);
  };

  const passwordsMatch = password === confirmPassword;

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSignUp} className="signup-form">
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" value={username} onChange={handleUserNameChange} required />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={email} onChange={handleEmailChange} required />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={password} onChange={handlePasswordChange} required />

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