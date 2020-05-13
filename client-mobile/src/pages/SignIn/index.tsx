import React from 'react';
import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import {
  Container,
  LogoContainer,
  FormContainer,
  ForgotPassword,
  ForgotPasswordText,
  SignUpButton,
  SignUpButtonText,
} from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

import lightLogoImg from '../../assets/lightLogo.png';

const SignIn: React.FC = () => {
  return (
    <Container>
      <LogoContainer>
        <Image source={lightLogoImg} />
      </LogoContainer>

      <FormContainer>
        <Input name="email" icon="mail" />
        <Input name="password" icon="lock" />

        <Button onPress={() => console.log('btn press')}>sign in</Button>

        <ForgotPassword>
          <ForgotPasswordText>forgot your password?</ForgotPasswordText>
        </ForgotPassword>
      </FormContainer>

      <SignUpButton>
        <SignUpButtonText>sign up</SignUpButtonText>
        <Icon name="log-in" color="#ececec" size={16} />
      </SignUpButton>
    </Container>
  );
};

export default SignIn;
