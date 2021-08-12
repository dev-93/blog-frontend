import { atom } from 'recoil';

export interface Form {
    username: string;
    password: string;
    passwordConfirm?: string;
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