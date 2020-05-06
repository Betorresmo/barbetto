import React from 'react';

import { ToastProvider } from './toast';
import { AuthProvider } from './auth';

const Providers: React.FC = ({ children }) => {
  return (
    <ToastProvider>
      <AuthProvider>{children}</AuthProvider>
    </ToastProvider>
  );
};

export default Providers;
