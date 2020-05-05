import React, { useRef, useCallback } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as yup from 'yup';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import getInputErrors from '../../utils/getInputErrors';

import goatImg from '../../assets/goat.svg';
import logoImg from '../../assets/logo.svg';
import mobileDownloadImg from '../../assets/mobile-download.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { BackgroundImg, Container, YellowBox, Content } from './styles';

import { useAuth } from '../../hooks/AuthContext';

interface FormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { user, signIn } = useAuth();

  console.log(user);

  const handleSubmit = useCallback(
    async (data: FormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = yup.object().shape({
          email: yup.string().required('E-mail is required'),
          password: yup.string().required('Password is required'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        signIn({
          email: data.email,
          password: data.password,
        });
      } catch (err) {
        const errors = getInputErrors(err);

        formRef.current?.setErrors(errors);
      }
    },
    [signIn],
  );

  return (
    <BackgroundImg>
      <Container>
        <YellowBox>
          <img src={logoImg} alt="barbetto Logo" />
          <img src={goatImg} alt="Goat Logo" />
        </YellowBox>

        <YellowBox>
          <Content>
            <Form ref={formRef} onSubmit={handleSubmit}>
              <Input name="email" icon={FiMail} type="text" />
              <Input name="password" icon={FiLock} type="password" />
              <Button type="submit">sign in</Button>
              <a href="lala">forgot your password?</a>
            </Form>

            <a href="mobiledownload">
              <img src={mobileDownloadImg} alt="Download for mobile" />
            </a>

            <a href="lala">
              create an account
              <FiLogIn size={18} />
            </a>
          </Content>
        </YellowBox>
      </Container>
    </BackgroundImg>
  );
};

export default SignIn;
