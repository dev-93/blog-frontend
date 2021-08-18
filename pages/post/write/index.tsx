import { message } from 'antd';
import React, {useEffect, useState} from 'react';
import { useRecoilState } from 'recoil';
import agent from '../../../agent';
import Responsive from '../../../components/common/Responsive';
import Editor, { EditorValue } from '../../../components/post/Editor';
import TagBox from '../../../components/post/TagBox';
import WriteActionButton from '../../../components/post/WriteActionButton';
import { editorForm, tagForm } from '../../../store/post';

const Post = () => {
    const [editor , setEditor] = useRecoilState(editorForm);
    const [tagsForm , setTagsForm] = useRecoilState(tagForm);

    const onChangeField = ({key, value}:EditorValue) => {
        // console.log({key, value});
        // console.log({...editor})
        setEditor({...editor, [key]: value});
    };

    const onChangeTags = (nextTags:any) => {
        setTagsForm({
            tags: nextTags
        })
    };

    const onCancel = () => {
        console.log("onCancel")
    };

    const onPublish = () => {
        const form = {
            title: editor.title,
            body: editor.body,
            tags: tagsForm.tags
        };

        console.log(form);

        if (!form.title) {
            message.warn("제목을 입력해주세요!!");
            return;
        } else if (!form.body) {
            message.warn("내용을 입력해주세요!!");
            return;
        }

        agent.Blog.createBlog({form})
            .then((data: any) => console.log(data))
            .catch((err: any) => {
                console.log(err.response);

                if(err.response.status === 401) {
                    message.error("로그인이 필요합니다!!");
                    return;
                }
            })

 

        console.log(form);
    };

    // console.log(editor,tagsForm)
    
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
            <WriteActionButton 
                onCancel={onCancel}
                onPublish={onPublish}
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