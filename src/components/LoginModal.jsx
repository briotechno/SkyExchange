import React, { useState, useEffect } from 'react';

function LoginModal({ isOpen, onClose }) {
  const [validationCode, setValidationCode] = useState('');
  const [loginName, setLoginName] = useState('');
  const [password, setPassword] = useState('');
  const [validationInput, setValidationInput] = useState('');

  const generateCode = () => String(Math.floor(1000 + Math.random() * 9000));

  useEffect(() => {
    setValidationCode(generateCode());
  }, [isOpen]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!loginName.trim()) { alert('Username is empty'); return; }
    if (!password.trim()) { alert('Password is empty'); return; }
    if (validationInput.trim() !== validationCode) {
      alert('Invalid Validation Code!');
      setValidationCode(generateCode());
      setValidationInput('');
      return;
    }
    alert('Login Successful');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="login-modal-overlay" onClick={onClose}>
      <div className="login-modal-box" onClick={(e) => e.stopPropagation()}>
        {/* Left panel - dark with logo */}
        <div className="login-modal-left">
          <img src="/images/logo.png" alt="SKY247" className="login-modal-logo" />
        </div>

        {/* Right panel - yellow with form */}
        <div className="login-modal-right">
          <button className="login-modal-close" onClick={onClose}>✕</button>
          <h3 className="login-modal-title">Please login to continue</h3>
          <form onSubmit={handleLogin} className="login-modal-form">
            <input
              type="text"
              placeholder="Username"
              className="login-modal-input"
              value={loginName}
              onChange={(e) => setLoginName(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="login-modal-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="login-modal-valid-wrap">
              <input
                type="text"
                placeholder="Validation Code"
                className="login-modal-input"
                value={validationInput}
                onChange={(e) => setValidationInput(e.target.value)}
                maxLength="4"
              />
              <span
                className="login-modal-captcha"
                onClick={() => setValidationCode(generateCode())}
                title="Click to refresh"
              >
                {validationCode}
              </span>
            </div>
            <button type="submit" className="login-modal-btn">
              Login<span className="login-modal-btn-icon">🚪</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
