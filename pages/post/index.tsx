import { Button } from 'antd';
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
            <div className="bt_box">
                <Button type="primary" onClick={() => router.push("/post/write")}>포스트 작성</Button>
            </div>
            <PostList
                datas={datas}
            />
        </Wrap>
    )
};

const Wrap = styled.div`
    .bt_box {
        width: 1024px;
        margin: 0 auto;
        position: fixed;
        top:64px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        justify-content: flex-end;
    }
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