import './SignUpPage.css';

const SignUpPage = () => {
  const handleSignUp = (event) => {
    event.preventDefault();
    // Add signup logic here
    alert('Sign up form submitted');
  };

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSignUp} className="signup-form">
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" required />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" required />

        <label htmlFor="confirm-password">Confirm Password:</label>
        <input type="password" id="confirm-password" name="confirm-password" required />

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpPage;