import { atom, selector } from 'recoil';

export interface Form {
    title: string;
    body: string;
}

export const editorForm = atom<Form>({
    key: 'editorState',
    default: {
        title: '',
        body: '',
    }
});
