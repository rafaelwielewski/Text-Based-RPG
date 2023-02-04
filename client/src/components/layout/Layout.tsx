import React from 'react';
import theme from '@/styles/theme.json'

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {

  return (
    <div
      className="min-w-max text-xs md:min-w-full md:text-base "
      style={{
        color: theme.foreground,

      }}
    >
      <main
        className="w-full h-full"
        style={{
          background: theme.background,
        }}
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;
