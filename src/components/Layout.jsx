import React, { useState } from 'react';
import DesktopHeader from './DesktopHeader';
import MobileHeader from './MobileHeader';
import LoginModal from './LoginModal';

function Layout({ children }) {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  return (
    <>
      {/* Desktop elements - hidden on mobile via CSS */}
      <div className="desktop-only">
        <DesktopHeader onVirtualCricketClick={openLoginModal} />
      </div>

      {/* Mobile header - hidden on desktop via CSS */}
      <div className="mobile-only">
        <MobileHeader />
      </div>


      {/* Login Modal (triggered by Virtual Cricket etc.) */}
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />

      {/* Page content */}
      {children}
    </>
  );
}

export default Layout;
