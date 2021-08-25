import { Button, Popconfirm } from 'antd';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import agent from '../../agent';
import HeaderContainer from '../../components/common/HeaderContainer';
import PostViewer from '../../components/post/PostViewer';
import Responsive from "../../components/common/Responsive";
import { useUser } from '../../util';

export type DataProps = {
    data: any
};

const PostDetail = ({data}: DataProps) => {
    const router:any = useRouter();
    const { user, mutateUser } = useUser();

    const confirm = () => {
        agent.Blog.deletePost(router.query.id)
            .then((data: any) => console.log(data));
    };

    console.log();
    console.log();

    return (
        <Wrap>
            <HeaderContainer/>
            <Responsive>
                <div className="bt_box">
                    {
                        user?.user?._id === data?.user?._id && (
                            <>
                                <Button type="dashed" onClick={() => router.push(`/post/update/${router.query.id}`)}>수정</Button>
                                <Popconfirm placement="topLeft" title={"정말 삭제하시겠습니까?"} onConfirm={confirm} okText="네" cancelText="아니요">
                                    <Button className="bt_danger" type="dashed" danger>삭제</Button>
                                </Popconfirm>
                            </>
                        )
                    }
                </div>
                <PostViewer
                    data={data}
                />
            </Responsive>
        </Wrap>
    )
};

const Wrap = styled.div`
    .bt_box {
        margin-top: 30px;
        margin-right: 30px;
        display: flex;
        justify-content: flex-end;

        .bt_danger {
            margin-left: 10px;
        }
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

export default PostDetail;