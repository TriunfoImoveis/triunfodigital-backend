import React, { useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import Input from '../../components/Input';

import { Logo } from '../../assets/images';
import { Container, Content } from './styles';

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  return (
    <Container>
      <Content>
        <Logo />
        <Form ref={formRef} onSubmit={() => {}}>
          <h1>Login</h1>

          <Input name="email" label="E-mail" placeholder="E-mail" />
        </Form>
      </Content>
    </Container>
  );
};

export default SignIn;
