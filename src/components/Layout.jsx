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
      <DesktopHeader onVirtualCricketClick={openLoginModal} />

      {/* Mobile header - hidden on desktop via CSS */}
      <MobileHeader />

      {/* Login Modal (triggered by Virtual Cricket etc.) */}
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />

      {/* Page content */}
      {children}
    </>
  );
}

export default Layout;
