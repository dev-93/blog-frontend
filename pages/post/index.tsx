import { useRouter } from 'next/router';
import * as React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import HeaderContainer from '../../components/common/HeaderContainer';
import PostList from '../../components/post/PostList';

export type DatasProps = {
    datas: any
};

const Post = ({datas}: DatasProps) => {
    const router = useRouter();
    return (
        <Wrap>
            <HeaderContainer/>
            <button onClick={() => router.push("/post/write")}>포스트 작성</button>
            <PostList
                datas={datas}
            />
        </Wrap>
    )
};

const Wrap = styled.div`
`; 

export async function getStaticProps() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_ENV_VARIABLE}/api/posts`);
    const datas = await res.json();

    if (!datas) {
        return {
            notFound: true,
        }
    }
  
    return {
      props: { datas }, // will be passed to the page component as props
    }
}

export default Post;