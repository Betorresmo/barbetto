import React from 'react';
import { Image } from 'react-native';

import { Container, Title } from './styles';

import lightLogoImg from '../../assets/lightLogo.png';

const SignIn: React.FC = () => {
  return (
    <Container>
      <Image source={lightLogoImg} />
      <Title>This is the Sign In</Title>
    </Container>
  );
};

export default SignIn;
