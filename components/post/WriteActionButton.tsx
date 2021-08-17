import { Button } from 'antd';
import React from 'react';
import styled from 'styled-components';

type WriteAction = {
    onCancel?: () => void, 
    onPublish?: () => void
}

const WriteActionButton = ({ onCancel, onPublish}: WriteAction) => {
    return (
        <WriteActionButtonBlock>
            <Button type="primary" onClick={onPublish}>
                포스트 등록
            </Button>
            <Button onClick={onCancel}>취소</Button>
        </WriteActionButtonBlock>
    );
};

const WriteActionButtonBlock = styled.div`
    margin-top: 1rem;
    margin-bottom: 3rem;
    button + button {
        margin-left: 0.5rem;
    } 
`;

export default WriteActionButton;