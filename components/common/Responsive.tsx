import React from 'react';
import styled from "styled-components";

type Props = { 
    children: React.ReactNode
 }

const Responsive = ({children, ...rest}: Props) => {
    return <ResponsiveBlock {...rest}>{children}</ResponsiveBlock>
}

const ResponsiveBlock = styled.div`
    padding-left: 1rem;
    padding-right: 1rem;
    width: 1024px;
    margin: 0 auto;

    @media (max-width: 1024px) {
        width: 768px;
    }

    @media (max-width: 768px) {
        width: 100%
    }
`;

export default Responsive;
