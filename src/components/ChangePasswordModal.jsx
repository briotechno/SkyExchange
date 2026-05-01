import React, { useState } from 'react';
import { authController } from '../controllers';
import { useAuthStore } from '../store/authStore';
import { useSnackbarStore } from '../store/snackbarStore';
import './ChangePasswordModal.css';

function ChangePasswordModal({ isOpen, onClose }) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const loginToken = useAuthStore((state) => state.loginToken);
  const showSnackbar = useSnackbarStore(state => state.show);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword || !oldPassword) {
      showSnackbar('All fields are required.', 'error');
      return;
    }
    if (newPassword !== confirmPassword) {
      showSnackbar('New passwords do not match.', 'error');
      return;
    }

    try {
      setLoading(true);
      const response = await authController.changePassword({
        loginToken,
        oldpassword: oldPassword,
        newpassword: newPassword
      });

      if (response && response.error === '0') {
        showSnackbar('Password changed successfully.', 'success');
        onClose();
        setNewPassword('');
        setConfirmPassword('');
        setOldPassword('');
      } else {
        showSnackbar(response?.msg || 'Failed to change password.', 'error');
      }
    } catch (err) {
      console.error(err);
      showSnackbar('An error occurred while changing password.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cp-modal-overlay" onClick={onClose}>
      <div className="cp-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="cp-modal-header">
          <h2>Change Password</h2>
          <button className="cp-close-btn" onClick={onClose}>✖</button>
        </div>
        <form className="cp-modal-body" onSubmit={handleSubmit}>
          <div className="cp-form-group">
            <label>New Password</label>
            <div className="cp-input-wrap">
              <input 
                type="password" 
                placeholder="Enter" 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <span className="required-star">*</span>
            </div>
          </div>
          <div className="cp-form-group">
            <label>New Password Confirm</label>
            <div className="cp-input-wrap">
              <input 
                type="password" 
                placeholder="Enter"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <span className="required-star">*</span>
            </div>
          </div>
          <div className="cp-form-group">
            <label>Your Password</label>
            <div className="cp-input-wrap">
              <input 
                type="password" 
                placeholder="Enter"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <span className="required-star">*</span>
            </div>
          </div>
          <div className="cp-button-group">
            <button type="submit" disabled={loading}>
              {loading ? 'Changing...' : 'Change'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChangePasswordModal;
