import React, { useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { MdMailOutline, MdLockOutline } from 'react-icons/md';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Button from '../../components/Button';

import { Logo } from '../../assets/images';
import { Container, Content } from './styles';

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  return (
    <Container>
      <Content>
        <Logo />
        <Form ref={formRef} onSubmit={() => {}}>
          <h1>LOGIN</h1>

          <Input
            name="email"
            icon={MdMailOutline}
            placeholder="exemplo@email.com"
            type="email"
          />
          <Input
            name="password"
            type="password"
            placeholder="**********************"
            maxLength={8}
            icon={MdLockOutline}
          />
          <Select name="office" />
          <Button>ENTRAR</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default SignIn;
