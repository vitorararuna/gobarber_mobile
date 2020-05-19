import React, { useRef, useState } from 'react';
import { Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import logo from '../../assets/logo.png';

import Background from '../../components/Background';
import { signInRequest } from '../../store/modules/auth/actions';

import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  SignLink,
  SignLinkText,
} from './styles';

export default function SignIn({ navigation }) { //navifgation = propriedade da página

  const dispatch = useDispatch();
  const passwordRef = useRef();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loading = useSelector(state => state.auth.loading);


  function handleSubmit() {
    dispatch(signInRequest(email, password));
  }

  return (
    <Background>
      <Container>
        <Image source={logo} />

        <Form>
          <FormInput
            icon="mail-outline"
            keyboardType="email-address" //tipo de teclado
            autoCorrect={false}
            autoCapitalize="none" //sem letra maúscula
            placeholder="Digite seu e-mail"
            returnKeyType="next" //adiciona um "next" no teclado. E a função que é disparada quando ele é clicado é: onSubmitEditing
            onSubmitEditing={() => passwordRef.current.focus()} //drecionapara o input de senha
            value={email}
            onChangeText={setEmail} //ja vai setar pra mim 
          />

          <FormInput
            icon="lock-outline"
            secureTextEntry //pontinhos de senha
            placeholder="Sua senha secreta"
            ref={passwordRef}
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            value={password}
            onChangeText={setPassword}
          />

          <SubmitButton loading={loading} onPress={handleSubmit}>Acessar</SubmitButton>
        </Form>

        <SignLink onPress={() => navigation.navigate('SignUp')}>
          <SignLinkText>Criar conta gratuita</SignLinkText>
        </SignLink>
      </Container>
    </Background>
  );
}
