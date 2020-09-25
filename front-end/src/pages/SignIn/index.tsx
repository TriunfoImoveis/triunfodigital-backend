import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { MdMailOutline, MdLockOutline } from 'react-icons/md';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Button from '../../components/Button';

import { Logo } from '../../assets/images';
import { Container, Content } from './styles';

interface ISignData {
  email: string;
  password: string;
  office: string;
}
const SignIn: React.FC = () => {
  return (
    <Container>
      <Content>
        <Logo />
        <h1>Login</h1>
      </Content>
    </Container>
  );
};

export default SignIn;
