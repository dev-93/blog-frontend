import { atom } from 'recoil';

export interface Common {
    user: object;
}

export const CommonStore = atom<Common>({
    key: 'common',
    default: {
        user:{}
    },
});