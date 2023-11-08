import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full max-w-[1440px] overflow-hidden">{children}</div>
  );
};

export default Layout;
