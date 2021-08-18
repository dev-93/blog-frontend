import { useRouter } from 'next/router';
import * as React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import HeaderContainer from '../../components/common/HeaderContainer';
import PostViewer from '../../components/post/PostViewer';

type DataProps = {
    data: any
};

const PostDetail = ({data}: DataProps) => {
    console.log(data);
    const router = useRouter();
    return (
        <Wrap>
            <HeaderContainer/>
            <button onClick={() => router.push("/post/write")}>포스트 작성</button>
            <PostViewer
                body={data.body}
                publishedDate={data.publishedDate}
                tags={data.tags}
                title={data.title}
            />
        </Wrap>
    )
};

const Wrap = styled.div`
`; 

export async function getStaticPaths() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_ENV_VARIABLE}/api/posts`);
    const data = await res.json();

    return {
        paths: data.map((item:any) => ({
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