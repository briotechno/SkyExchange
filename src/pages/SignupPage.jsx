import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/style-login.css';

function SignupPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    alert('Signup Successful (Demo)!');
    // In a real app we'd redirect to login or dashboard
    navigate('/login');
  };

  return (
    <div className="login-page-wrap">
      <div className="mobile-container">
        {/* Header with logo + background */}
        <div className="header-section">
          <button
            className="close-btn"
            onClick={() => navigate(-1)}
            aria-label="Close"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
          <div className="logo-container">
            <img src="/images/logo.png" width="170" alt="Sky247 Logo" className="logo-img" />
          </div>
        </div>

        {/* Signup Form */}
        <main className="content-section">
          <form className="login-form" onSubmit={handleSignup}>
            <input
              type="text"
              placeholder="Username"
              className="form-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <div className="validation-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="captcha-code"
                onClick={() => setShowPassword(!showPassword)}
                style={{ cursor: 'pointer', color: '#ff7a00', fontSize: '13px', fontWeight: 'bold' }}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>

            <p
              style={{
                fontSize: '11px',
                fontWeight: 900,
                color: '#ff5100',
                marginTop: '-5px',
                marginBottom: '5px'
              }}
            >
              (Must be contained alphanumeric and more than 6 letters)
            </p>

            <input
              type="text"
              placeholder="Mobile No."
              className="form-input"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="One Time Password (OTP)"
              className="form-input"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Enter Promo code"
              className="form-input"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />

            {/* Button row */}
            <button type="submit" className="login-btn">Signup</button>

            <button
              type="button"
              className="login-btn"
              onClick={() => navigate('/login')}
              style={{ marginTop: '10px' }}
            >
              Login
            </button>
          </form>

          {/* Policy Links */}
          <div className="footer-links" style={{ marginTop: '30px' }}>
            <a href="#">Privacy Policy</a> |{' '}
            <a href="#">Terms and Conditions</a> |{' '}
            <a href="#">Rules and Regulations</a> | <a href="#">KYC</a> |{' '}
            <a href="#">Responsible Gaming</a> | <a href="#">About Us</a> |{' '}
            <a href="#">Self-exclusion Policy</a> |{' '}
            <a href="#">Underage Policy</a>
          </div>
        </main>
      </div>
    </div>
  );
}

export default SignupPage;
