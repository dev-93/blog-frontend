import * as React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../../components/common/Button';

const Post = () => {
    return (
        <Wrap>
            <Button>hello</Button>
        </Wrap>
    )
};

const Wrap = styled.div`
    background: blue;
`; 

export default Post;