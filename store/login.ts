import { atom } from 'recoil';

export interface Form {
  username: string | number;
  password: string | number;
}

export const loginState = atom<Form>({
  key: 'loginForm',
  default: {
    username: '',
    password: ''
  }
})