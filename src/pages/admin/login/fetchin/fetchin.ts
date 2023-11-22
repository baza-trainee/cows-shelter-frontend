import instance from '@/utils/axios';
import axios from 'axios';
import { ForgotPassword, FormValuesSignIn } from '@/types';

const token = {
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

export const newPassword = async (body: FormValuesSignIn) => {
  const data = await instance.post('/api/password/change', body);
  return data;
};
