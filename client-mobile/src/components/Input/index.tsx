import React from 'react';
import { TextInputProperties } from 'react-native';

import { Container, InputField, Icon } from './styles';

interface InputProps extends TextInputProperties {
  name: string;
  icon: string;
}

const Input: React.FC<InputProps> = ({ icon, ...rest }) => {
  return (
    <Container>
      <Icon name={icon} size={24} />
      <InputField {...rest} />
    </Container>
  );
};

export default Input;
