import { atom, selector } from 'recoil';

export interface Form {
    title: string;
    body: string;
};

export interface Tag {
    tags: string[];
};

export type Post = any[];

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
        tags: [],
    }
});

export const postList = atom<Post>({
    key: 'postList',
    default: [],
});