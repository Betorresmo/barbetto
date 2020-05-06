import React, { useEffect } from 'react';
import {
  FiAlertTriangle,
  FiInfo,
  FiCheckSquare,
  FiXCircle,
} from 'react-icons/fi';

import { Container } from './styles';
import { MessageData, useToast } from '../../../hooks/toast';

interface ToastProps {
  message: MessageData;
  style: object;
}

const iconType = {
  error: <FiAlertTriangle size={20} />,
  success: <FiCheckSquare size={20} />,
  info: <FiInfo size={20} />,
};

const Toast: React.FC<ToastProps> = ({ message, style }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => removeToast(message.id), 3000);

    return () => clearTimeout(timer);
  }, [removeToast, message.id]);

  return (
    <>
      <Container type={message.type} style={style}>
        <div>{iconType[message.type || 'info']}</div>

        <section>
          <strong>{message.title}</strong>
          {message.description && <p>{message.description}</p>}
        </section>

        <button type="button" onClick={() => removeToast(message.id)}>
          <FiXCircle size={20} />
        </button>
      </Container>
    </>
  );
};

export default Toast;
