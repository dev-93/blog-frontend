import React, {useEffect} from 'react';
import styled from 'styled-components';
import Responsive from '../../../components/common/Responsive';
import Editor from '../../../components/post/Editor';

const Post = () => {
    const onChangeField = () => {
        
    };

    return (
        <Responsive>
            <Editor 
                title={"test"}
                body={"test"}
                onChangeField={onChangeField}
            />
        </Responsive>
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