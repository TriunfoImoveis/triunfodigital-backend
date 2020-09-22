import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { MdMailOutline, MdLockOutline } from 'react-icons/md';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Button from '../../components/Button';

import { Logo } from '../../assets/images';
import getValidationErros from '../../utils/getValidationErros';
import { Container, Content } from './styles';

interface ISignData {
  email: string;
  password: string;
  office: string;
}
const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: ISignData) => {
    formRef.current?.setErrors({});
    console.log(data);
    // try {
    //   const schema = Yup.object().shape({
    //     name: Yup.string().required('Nome obrigatório'),
    //     email: Yup.string()
    //       .required('E-mail obrigatório')
    //       .email('Digite um e-mail válido'),
    //     password: Yup.string().required('Senha obrigatória'),
    //   });

    //   await schema.validate(data, {
    //     abortEarly: false,
    //   });
    // } catch (err) {
    //   const erros = getValidationErros(err);
    //   formRef.current?.setErrors(erros);
    // }
  }, []);
  return (
    <Container>
      <Content>
        <Logo />
        <Form ref={formRef} onSubmit={handleSubmit}>
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
          <Select
            name="office"
            options={[
              { value: 'mkt', label: 'MKT' },
              { value: 'corretores', label: 'Corretores' },
              { value: 'Dono', label: 'Dono' },
            ]}
          />
          <Button type="submit">ENTRAR</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default SignIn;
