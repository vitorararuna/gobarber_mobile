import { Alert } from 'react-native';
import { takeLatest, call, put, all, delay } from 'redux-saga/effects';
import api from '../../../services/api';

import { signInSuccess, signFailure } from './actions';


export function* signIn({ payload }) {

  try {

    const { email, password } = payload;

    const response = yield call(api.post, 'sessions', { //passo qual método que quero chamar (api.post) e os parâmetros que o apipost precisa receber, ou seja, a url (sessions) e depois os dados q queremos enviar
      email,
      password,
    });

    const { token, user } = response.data;

    if (user.provider) {
      Alert.alert('Erro no Login', 'Ú usuário não pode ser prestador');
      return;
    }

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield delay (3000) //Para aparecer o loading

    yield put(signInSuccess(token, user));

    // history.push('/dashboard');

  } catch (err) {
    Alert.alert('Falha na Autenticação', 'Houve um erro no login, verifique seus dados');
    yield put(signFailure());

  }
}

export function* signUp({ payload }) {

  try {
    const { name, email, password } = payload;

    yield call(api.post, 'users', {
      name,
      email,
      password,
    });

    // history.push('/');

  } catch (error) {
    Alert.alert('Falha no Cadastro', 'Houve um erro no cadastro, verifique seus dados!');
    yield put(signFailure());
  }

}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;

  }
}

export function signOut({ payload }) {
  // history.push('/');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn), //toda vez que o takelatest ouvir meu sign_in_request, vai chamar uma função (signIn)
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', signOut),
]);