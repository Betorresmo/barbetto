import React, { useRef, useCallback } from 'react';
import { Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

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
            <Input name="name" icon="user" />
            <Input name="email" icon="mail" />
            <Input name="password" icon="lock" />

            <Button onPress={() => formRef.current?.submitForm()}>
              sign up
            </Button>
          </Form>
        </FormContainer>

        <NavigationButtonContainer>
          <NavigationButton
            onPress={() => navigation.goBack()}
            direction="left"
            theme="light"
          />
        </NavigationButtonContainer>
      </Container>
    </ScrollView>
  );
};

export default SignUp;
