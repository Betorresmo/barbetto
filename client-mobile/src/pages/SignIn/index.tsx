import React, { useRef, useCallback } from 'react';
import { Image, ScrollView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

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
  const navigation = useNavigation();

  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const handleSignIn = useCallback(data => {
    console.log(data);
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{ flex: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <Container>
        <LogoContainer>
          <Image source={lightLogoImg} />
        </LogoContainer>

        <FormContainer>
          <Form ref={formRef} onSubmit={handleSignIn}>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="email-address"
              name="email"
              icon="mail"
              returnKeyType="next"
              onSubmitEditing={() => {
                passwordInputRef.current?.focus();
              }}
              blurOnSubmit={false}
            />
            <Input
              ref={passwordInputRef}
              secureTextEntry
              name="password"
              icon="lock"
              returnKeyType="send"
              onSubmitEditing={() => formRef.current?.submitForm()}
            />

            <Button onPress={() => formRef.current?.submitForm()}>
              sign in
            </Button>

            <ForgotPassword>
              <ForgotPasswordText>forgot your password?</ForgotPasswordText>
            </ForgotPassword>
          </Form>
        </FormContainer>

        <SignUpButton onPress={() => navigation.navigate('SignUp')}>
          <SignUpButtonText>sign up</SignUpButtonText>
          <Icon name="log-in" color="#ececec" size={16} />
        </SignUpButton>
      </Container>
    </ScrollView>
  );
};

export default SignIn;
