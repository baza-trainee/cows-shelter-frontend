import instance from '@/utils/axios';
import axios from 'axios';
import {
  ForgotPassword,
  FormValuesPassword,
  FormValuesSignIn,
  FormResetPassword
} from '@/types';

export const token = {
  set(token: string) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  }
};

export const login = async (body: FormValuesSignIn) => {
  const data = await instance.post('/api/auth/login', body);
  token.set(data.data.token);
  return data;
};

export const forgotPassword = async (body: ForgotPassword) => {
  const data = await instance.post('/api/password/forgot', body);
  return data;
};

export const changePassword = async (body: FormValuesPassword) => {
  const data = await instance.post('/api/password/change', body);
  token.set(data.data.token);
  return data;
};

export const resetPassword = async (body: FormResetPassword) => {
  const data = await instance.post('/api/password/reset', body);
  return data;
};
