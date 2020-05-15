import React, { useRef, useCallback } from 'react';
import { Image, ScrollView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { HideWithKeyboard } from 'react-native-hide-with-keyboard';

import {
  Container,
  LogoContainer,
  FormContainer,
  NavigationButtonContainer,
} from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';
import NavigationButton from '../../components/NavigationButton';

import lightLogoImg from '../../assets/lightLogo.png';

const SignUp: React.FC = () => {
  const navigation = useNavigation();

  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const handleSubmit = useCallback(data => {
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
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input
              autoCapitalize="words"
              name="name"
              icon="user"
              returnKeyType="next"
              onSubmitEditing={() => emailInputRef.current?.focus()}
              blurOnSubmit={false}
            />
            <Input
              ref={emailInputRef}
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              name="email"
              icon="mail"
              returnKeyType="next"
              onSubmitEditing={() => passwordInputRef.current?.focus()}
              blurOnSubmit={false}
            />
            <Input
              secureTextEntry
              ref={passwordInputRef}
              name="password"
              icon="lock"
              returnKeyType="send"
              onSubmitEditing={() => formRef.current?.submitForm()}
            />

            <Button onPress={() => formRef.current?.submitForm()}>
              sign up
            </Button>
          </Form>
        </FormContainer>

        <NavigationButtonContainer>
          <HideWithKeyboard>
            <NavigationButton
              onPress={() => navigation.goBack()}
              direction="left"
              theme="light"
            />
          </HideWithKeyboard>
        </NavigationButtonContainer>
      </Container>
    </ScrollView>
  );
};

export default SignUp;
