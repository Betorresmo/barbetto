import React, { useCallback, useRef } from 'react';
import { FiUser, FiMail, FiLock, FiChevronLeft } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as yup from 'yup';

import getInputErrors from '../../utils/getInputErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { BackgroundImg, Content } from './styles';

import logoImg from '../../assets/logo.svg';

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async formData => {
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
    } catch (err) {
      const errors = getInputErrors(err);

      formRef.current?.setErrors(errors);
    }
  }, []);

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

        <a href="return">
          <FiChevronLeft size={18} />
          return
        </a>
      </Content>
    </BackgroundImg>
  );
};

export default SignUp;
