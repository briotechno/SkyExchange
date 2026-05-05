import React from 'react';
import DesktopHeader from './DesktopHeader';
import MobileHeader from './MobileHeader';
import LoginModal from './LoginModal';
import { useUIStore } from '../store/uiStore';

function Layout({ children }) {
  const { isLoginModalOpen, closeLoginModal } = useUIStore();

  return (
    <>
      {/* Desktop elements - hidden on mobile via CSS */}
      <div className="desktop-only">
        <DesktopHeader />
      </div>

      {/* Mobile header - hidden on desktop via CSS */}
      <div className="mobile-only">
        <MobileHeader />
      </div>


      {/* Login Modal (triggered by Premium sportBook etc.) */}
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />

      {/* Page content */}
      {children}
    </>
  );
}

export default Layout;
