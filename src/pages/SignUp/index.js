
import React, { useRef, useState } from 'react';
import { Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import logo from '../../assets/logo.png';

import Background from '../../components/Background';
import { signUpRequest} from '../../store/modules/auth/actions';

import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  SignLink,
  SignLinkText,
} from './styles';

export default function SignUp({ navigation }) {

  const dispatch = useDispatch();

  const emailRef = useRef();
  const passwordRef = useRef();

  const[name, setName] = useState('');
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');

  const loading = useSelector(state => state.auth.loading);

  function handleSubmit() {
    dispatch(signUpRequest(name, email, password));
  }

  return (
    <Background>
      <Container>
        <Image source={logo} />

        <Form>
          <FormInput
            icon="person-outline"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Nome completo"
            returnKeyType="next" //adiciona um "next" no teclado. E a função que é disparada quando ele é clicado é: onSubmitEditing
            onSubmitEditing={() => emailRef.current.focus()} //drecionapara o input de senha
            value={name}
            onChangeText={setName}
          />

          <FormInput
            icon="mail-outline"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite seu e-mail"
            ref={emailRef}
            returnKeyType="next" //adiciona um "next" no teclado. E a função que é disparada quando ele é clicado é: onSubmitEditing
            onSubmitEditing={() => passwordRef.current.focus()} //drecionapara o input de senha
            value={email}
            onChangeText={setEmail}
          />

          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Sua senha secreta"
            ref={passwordRef}
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            value={password}
            onChangeText={setPassword}
          />

          <SubmitButton loading={loading} onPress={handleSubmit}>Acessar</SubmitButton>
        </Form>

        {/* Navigation aqui é como se fosse o Link em ReactJs*/}
        <SignLink onPress={() => navigation.navigate('SignIn')}>
          <SignLinkText>Já Tenho Conta</SignLinkText>
        </SignLink>
      </Container>
    </Background>
  );
}
