import { useRouter } from 'next/router';
import * as React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import HeaderContainer from '../../components/common/HeaderContainer';
import PostViewer from '../../components/post/PostViewer';

export type DataProps = {
    data: any
};

const PostDetail = ({data}: DataProps) => {
    const router = useRouter();

    return (
        <Wrap>
            <HeaderContainer/>
            <button onClick={() => router.push("/post/write")}>포스트 작성</button>
            <PostViewer
                data={data}
            />
        </Wrap>
    )
};

const Wrap = styled.div`
`; 

export async function getStaticPaths() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_ENV_VARIABLE}/api/posts`);
    const datas = await res.json();

    console.log

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