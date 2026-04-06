import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authController } from '../controllers';
import { useAuthStore } from '../store/authStore';
import '../styles/style-login.css';

function SignupPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpStatus, setOtpStatus] = useState('');
  const [userCheckStatus, setUserCheckStatus] = useState('');
  
  const navigate = useNavigate();
  const loginAction = useAuthStore((state) => state.login);

  const checkUsernameAvailability = async () => {
    if (!username.trim()) return;
    try {
      const resp = await authController.checkUsername(username);
      setUserCheckStatus(resp.msg || (resp.error === '0' ? 'Available' : 'Taken'));
    } catch (e) {
      console.error(e);
    }
  };

  const handleSendOtp = async () => {
    if (!mobile.trim()) { alert('Please enter mobile number'); return; }
    try {
      setLoading(true);
      const resp = await authController.sendOtp(mobile);
      if (resp.error === '0') {
        alert(resp.msg || 'OTP Sent Successfully');
        setOtpStatus('OTP Sent');
      } else {
        alert(resp.msg || 'Failed to send OTP');
      }
    } catch (err) {
      console.error(err);
      alert('Error sending OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = {
        username,
        password,
        mobile,
        otp
      };
      
      const response = await authController.createUser(data);

      if (response.error === '0') {
        alert(response.msg || 'Signup Successful!');
        // Ideally the createuser response contains a token, if so we login directly
        if (response.apitoken || response.LoginToken) {
            loginAction(response.username || username, response.apitoken || response.LoginToken);
            navigate('/');
        } else {
            navigate('/login');
        }
      } else {
        alert(response.msg || 'Signup failed');
      }
    } catch (err) {
      console.error('Signup Error:', err);
      alert('An unexpected error occurred during signup.');
    } finally {
      setLoading(false);
    }
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
            <div className="validation-input-wrapper">
              <input
                type="text"
                placeholder="Username"
                className="form-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onBlur={checkUsernameAvailability}
                required
              />
              <button
                type="button"
                onClick={checkUsernameAvailability}
                className="captcha-code"
                style={{
                  background: '#ff7a00', color: '#fff', border: 'none', borderRadius: '4px', padding: '0 10px', height: '30px', marginTop: '5px'
                }}
              >
                Check
              </button>
            </div>

            {userCheckStatus && (
              <p style={{ fontSize: '10px', color: userCheckStatus === 'Available' ? 'green' : 'red', marginTop: '-15px', marginBottom: '10px' }}>
                {userCheckStatus}
              </p>
            )}

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

            <div className="validation-input-wrapper">
              <input
                type="text"
                placeholder="Mobile No."
                className="form-input"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={handleSendOtp}
                className="captcha-code"
                disabled={loading}
                style={{
                  background: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', padding: '0 8px', height: '30px', marginTop: '5px', fontSize: '11px'
                }}
              >
                {otpStatus || 'Send OTP'}
              </button>
            </div>

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
            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? 'Processing...' : 'Signup'}
            </button>

            <button
              type="button"
              className="login-btn"
              onClick={() => navigate('/login')}
              style={{ marginTop: '10px' }}
            >
              Back to Login
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
