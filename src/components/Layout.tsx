import { useAppSelector } from '@/store/hook';
import React, { useEffect } from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const isModalOpen = useAppSelector((state) => state.modals.isModalOpen);

  useEffect(() => {
    if (isModalOpen === true && window.innerWidth > 678) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      document.body.style.overflowX = 'hidden';
    }
  }, [isModalOpen]);

  return (
    <div className="w-screen max-w-[1440px] overflow-hidden">{children}</div>
  );
};

export default Layout;
