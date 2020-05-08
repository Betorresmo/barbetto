import React from 'react';
import { useTransition, config } from 'react-spring';

import { Container } from './styles';
import Toast from './Toast';
import { MessageData } from '../../hooks/toast';

interface ToastContainerProps {
  messages: MessageData[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  const animatedMessages = useTransition(messages, message => message.id, {
    from: { transform: 'translateX(-120%)' },
    enter: { transform: 'translateX(0)' },
    leave: { transform: 'translateX(-120%)' },
    config: config.gentle,
  });

  return (
    <Container>
      {animatedMessages.map(({ item, key, props }) => (
        <Toast key={key} message={item} style={props} />
      ))}
    </Container>
  );
};

export default ToastContainer;
