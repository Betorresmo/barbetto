import React, { useRef, useCallback } from 'react';
import { Image, ScrollView, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as yup from 'yup';

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

import { useAuth } from '../../hooks/auth';
import getInputErrors from '../../utils/getInputErrors';

import lightLogoImg from '../../assets/lightLogo.png';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const navigation = useNavigation();

  const { signIn } = useAuth();

  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const handleSignIn = useCallback(
    async (formData: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = yup.object().shape({
          email: yup.string().required('E-mail is required'),
          password: yup.string().required('Password is required'),
        });

        await schema.validate(formData, {
          abortEarly: false,
        });

        await signIn(formData);
      } catch (err) {
        if (err instanceof yup.ValidationError) {
          const errors = getInputErrors(err);

          formRef.current?.setErrors(errors);
          return;
        }
        Alert.alert('Authentication Error', 'Verify your credentials.');
      }
    },
    [signIn],
  );

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
