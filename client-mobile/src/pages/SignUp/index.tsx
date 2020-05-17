import React, { useRef, useCallback } from 'react';
import { Image, ScrollView, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { HideWithKeyboard } from 'react-native-hide-with-keyboard';
import * as yup from 'yup';

import {
  Container,
  LogoContainer,
  FormContainer,
  NavigationButtonContainer,
} from './styles';

import lightLogoImg from '../../assets/lightLogo.png';

import Input from '../../components/Input';
import Button from '../../components/Button';
import NavigationButton from '../../components/NavigationButton';

import getInputErrors from '../../utils/getInputErrors';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const navigation = useNavigation();

  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const handleSubmit = useCallback(async (formData: SignUpFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = yup.object().shape({
        name: yup.string().required('Name is required'),
        email: yup
          .string()
          .required('Email is required')
          .email('E-mail not valid'),
        password: yup
          .string()
          .required('Password required')
          .min(6, 'Minimum of 6 digits')
          .max(15, 'Maximum of 15 digits'),
      });

      await schema.validate(formData, {
        abortEarly: false,
      });

      /* make request */

      Alert.alert('Registration complete', 'Now you can enter barbetto.');
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const errors = getInputErrors(err);

        formRef.current?.setErrors(errors);
        return;
      }

      Alert.alert('Registration Error', 'Verify your info.');
    }
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
