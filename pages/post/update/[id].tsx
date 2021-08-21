import { message, Spin } from 'antd';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import agent from '../../../agent';
import HeaderContainer from '../../../components/common/HeaderContainer';
import Responsive from '../../../components/common/Responsive';
import Editor, { EditorValue } from '../../../components/post/Editor';
import PostViewer from '../../../components/post/PostViewer';
import TagBox from '../../../components/post/TagBox';
import WriteActionButton from '../../../components/post/WriteActionButton';
import { editorForm, tagForm } from '../../../store/post';

export type DataProps = {
    data: any
};

const PostUpdate = ({data}: DataProps) => {
    const router: any = useRouter();
    const [editor , setEditor] = useRecoilState(editorForm);
    const [tagsForm , setTagsForm] = useRecoilState(tagForm);


    useEffect(() => {
        setEditor({
            title: data?.title,
            body: data?.body
        });
        setTagsForm({
            tags: data?.tags
        });
    },[data]);

    console.log(tagsForm);
    console.log(editor);

    const onChangeField = ({key, value}:EditorValue) => {
        setEditor({...editor, [key]: value});
    };

    const onChangeTags = (nextTags:any) => {
        setTagsForm({
            tags: nextTags
        })
    };

    const onCancel = () => {
        router.back();
        resetForm();
    };

    const onPublish = () => {
        const form = {
            title: editor.title,
            body: editor.body,
            tags: tagsForm.tags
        };

        if (!form.title) {
            message.warn("제목을 입력해주세요!!");
            return;
        } else if (!form.body) {
            message.warn("내용을 입력해주세요!!");
            return;
        } else if (!form.tags.length) {
            message.warn("태그를 추가해주세요!!");
            return;
        }

        agent.Blog.updatePost(router.query.id ,form)
            .then((data: any) => {
                message.success("포스트가 성공적으로 생성되었어요!");
                router.replace("/post");
                resetForm();
            })
            .catch((err: any) => {
                console.log(err.response);

                if(err.response.status === 401) {
                    message.error("로그인이 필요합니다!!");
                    return;
                }
            });
    };

    const resetForm = () => {
        setEditor({
            title: '',
            body: '',
        });
        setTagsForm({tags: []});
    };

    return (
        <Wrap>
            <HeaderContainer/>
            {
                data ? (
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
                ) : (
                    <div className="spin_box">
                        <Spin tip="Loading..."></Spin>
                    </div>
                )
            }
        </Wrap>
    ) 
};

const Wrap = styled.div`
    .spin_box {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
`; 

export async function getStaticPaths() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_ENV_VARIABLE}/api/posts`);
    const datas = await res.json();

    return {
        paths: datas.map((item:any) => ({
            params: {
                id: item._id.toString()
            },
        })),
        fallback: true,
    };
}

type Ctx = {
    params: {
        id: string
    }
}

export async function getStaticProps(ctx:Ctx) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_ENV_VARIABLE}/api/posts/${ctx.params.id}`);
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

export default PostUpdate;