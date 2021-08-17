import { atom, selector } from 'recoil';

export interface Form {
    title: string;
    body: string;
};

export interface Tag {
    tags: string[];
}

export const editorForm = atom<Form>({
    key: 'editorState',
    default: {
        title: '',
        body: '',
    }
});

export const tagForm = atom<Tag>({
    key: 'tagState',
    default: {
        tags: ['태그1', '태그2', '태그3'],
    }
});
