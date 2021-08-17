import React, {useEffect, useState} from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import Responsive from '../../../components/common/Responsive';
import Editor, { EditorValue } from '../../../components/post/Editor';
import TagBox from '../../../components/post/TagBox';
import { editorForm, tagForm } from '../../../store/post';

const Post = () => {
    const [editor , setEditor] = useRecoilState(editorForm);
    const [tagsForm , setTagsForm] = useRecoilState(tagForm);

    const onChangeField = ({key, value}:EditorValue) => {
        setEditor({...editor, [key]: value});
    };

    const onChangeTags = (nextTags:any) => {
        setTagsForm({
            tags: nextTags
        })
    };

    console.log(editor,tagsForm)
    
    return (
        <Responsive>
            <Editor 
                title={editor.title}
                body={editor.body}
                onChangeField={onChangeField}
            />
            <TagBox
                tags={tagsForm.tags}
                onChangeTags={onChangeTags}
            />
        </Responsive>
    )
};

export async function getStaticProps() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_ENV_VARIABLE}/api/posts`);
    const data = await res.json();

    if (!data) {
        return {
            notFound: true,
        }
    }
  
    return {
        props: { data }, // will be passed to the page component as props
    }
}

export default Post;