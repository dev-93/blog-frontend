import { useRouter } from 'next/router';
import * as React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import HeaderContainer from '../../components/common/HeaderContainer';
import PostList from '../../components/post/PostList';

type DataProps = {
    data: string[]
};

const Post = ({data}: DataProps) => {
    const router = useRouter();
    return (
        <Wrap>
            <HeaderContainer/>
            <button onClick={() => router.push("/post/write")}>포스트 작성</button>
            <PostList/>
        </Wrap>
    )
};

const Wrap = styled.div`
`; 

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