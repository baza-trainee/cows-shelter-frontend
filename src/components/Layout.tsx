import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <div className="w-screen max-w-[1440px]">{children}</div>;
};

export default Layout;
