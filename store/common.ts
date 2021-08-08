import { atom } from 'recoil';

export interface Common {
    token: string;
}

export const CommonStore = atom<Common>({
    key: 'common',
    default: {
        token:''
    },
});