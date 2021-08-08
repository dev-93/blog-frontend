import { atom } from 'recoil';

export interface Form {
    username: string | number;
    password: string | number;
    passwordConfirm?: string | number;
}

export const loginForm = atom<Form>({
    key: 'loginState',
    default: {
        username: '',
        password: '',
    }
});

export const registerForm = atom<Form>({
    key: 'registerState',
    default: {
        username: '',
        password: '',
        passwordConfirm: '',
    }
})