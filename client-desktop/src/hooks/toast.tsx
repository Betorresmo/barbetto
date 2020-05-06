import React, { useContext, createContext, useCallback, useState } from 'react';
import { uuid } from 'uuidv4';

import ToastContainer from '../components/ToastContainer';

export interface MessageData {
  id: string;
  type?: 'error' | 'success' | 'info';
  title: string;
  description?: string;
}

interface ToastContextData {
  message: object;
  addToast(message: Omit<MessageData, 'id'>): void;
  removeToast(id: string): void;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

const ToastProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<MessageData[]>([]);

  const addToast = useCallback(
    ({ type, title, description }: Omit<MessageData, 'id'>) => {
      const message = {
        id: uuid(),
        type,
        title,
        description,
      };

      setMessages(currentMessages => [...currentMessages, message]);
    },
    [],
  );

  const removeToast = useCallback((id: string) => {
    setMessages(currentMessages =>
      currentMessages.filter(message => message.id !== id),
    );
  }, []);

  return (
    <ToastContext.Provider
      value={{ message: { title: 'Error' }, addToast, removeToast }}
    >
      {children}
      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  );
};

const useToast = (): ToastContextData => {
  const context = useContext(ToastContext);

  if (!ToastContext) {
    throw new Error('useToast must be inside a ToastProvider');
  }

  return context;
};

export { ToastProvider, useToast };
