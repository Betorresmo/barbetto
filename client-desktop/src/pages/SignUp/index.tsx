import React, { useCallback, useRef } from 'react';
import { FiUser, FiMail, FiLock, FiChevronLeft } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';
import getInputErrors from '../../utils/getInputErrors';
import { useToast } from '../../hooks/toast';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { BackgroundImg, Content } from './styles';

import logoImg from '../../assets/logo.svg';

interface FormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (formData: FormData) => {
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

        await api.post('/users', formData);

        addToast({
          type: 'success',
          title: 'Registration complete!',
          description: 'Now you can enter barbetto.',
        });

        history.push('/');
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
    [addToast, history],
  );

  return (
    <BackgroundImg>
      <Content>
        <img src={logoImg} alt="" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input name="name" icon={FiUser} type="text" />
          <Input name="email" icon={FiMail} type="text" />
          <Input name="password" icon={FiLock} type="password" />

          <Button type="submit">sign up</Button>
        </Form>

        <Link to="/">
          <FiChevronLeft size={18} />
          return
        </Link>
      </Content>
    </BackgroundImg>
  );
};

export default SignUp;
