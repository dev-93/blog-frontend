import * as React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import HeaderContainer from '../../components/common/HeaderContainer';

type DataProps = {
    data: string[]
};

const Post = ({data}: DataProps) => {
    console.log(data);
    return (
        <Wrap>
            <HeaderContainer/>
            <div>hello</div>
        </Wrap>
    )
};

const Wrap = styled.div`
    background: skyblue;
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