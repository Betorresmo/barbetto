import React, { useRef, useCallback } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as yup from 'yup';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import { config, useSpring } from 'react-spring';

import getInputErrors from '../../utils/getInputErrors';

import goatImg from '../../assets/goat.svg';
import logoImg from '../../assets/logo.svg';
import mobileDownloadImg from '../../assets/mobile-download.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  BackgroundImg,
  Container,
  YellowBox,
  AnimatedLogoContainer,
  Content,
} from './styles';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

interface FormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();

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

        await signIn({
          email: data.email,
          password: data.password,
        });

        history.push('/dashboard');
      } catch (err) {
        if (err instanceof yup.ValidationError) {
          const errors = getInputErrors(err);

          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          type: 'error',
          title: 'Authentication Error',
          description: 'Verify your credentials.',
        });
      }
    },
    [signIn, addToast, history],
  );

  const logoAnimation = useSpring({
    delay: 500,
    from: {
      transform: 'translateY(-135%)',
    },
    to: {
      transform: 'translateY(0)',
    },
    config: config.gentle,
  });

  return (
    <BackgroundImg>
      <Container>
        <YellowBox>
          <AnimatedLogoContainer style={logoAnimation}>
            <img src={logoImg} alt="barbetto Logo" />
          </AnimatedLogoContainer>
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

            <Link to="/signup">
              create an account
              <FiLogIn size={18} />
            </Link>
          </Content>
        </YellowBox>
      </Container>
    </BackgroundImg>
  );
};

export default SignIn;
