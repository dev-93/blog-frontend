import { Button } from 'antd';
import Link from 'next/link';
import React from 'react';
import styled from "styled-components";
import palette from '../../styles/palette';

const AuthForm = ({type, form, onChange, onSubmit, error}:any) => { 
    return (
        <AuthFormBlock>
            <h3>로그인</h3>
            <form>
                <StyledInput 
                    autoComplete="username"
                    name="username"
                    placeholder="아이디"
                />
                <StyledInput 
                    autoComplete="new-password"
                    name="password"
                    placeholder="비밀번호"
                    type="password"
                />

                <Button type="primary">Primary Button</Button>

                {type === 'register' && (
                    <StyledInput 
                        autoComplete="new-password"
                        name="passwordConfirm"
                        placeholder="비밀번호 확인"
                        type="password"
                    />
                )}

                {error && <ErrorMessage>{error}</ErrorMessage>}
            </form>
            
            <Footer>
                {type === 'login' ? (
                    <Link href="/register">
                        <a>회원가입</a>
                    </Link>
                ): (
                    <Link href="/login">
                        <a>로그인</a>
                    </Link>
                )}
            </Footer>
        </AuthFormBlock>
    )
};

const ErrorMessage = styled.div`
    color: red;
    text-align: center;
    font-size: 0.875rem;
    margin-top: 1rem;
`;

const AuthFormBlock = styled.div`
    h3 {
        margin: 0;
        color: ${palette.gray[8]};
        margin-bottom: 1rem;
    }
`;

const StyledInput = styled.input`
    font-size: 1rem;
    border: none;
    border-bottom: 1px solid ${palette.gray[5]};
    padding-bottom: 0.5rem;
    outline: none;
    width: 100%;
    &:focus {
        color: $oc-teal-7;
        border-bottom: 1px solid ${palette.gray[7]};
    }

    &+& {
        margin-top: 1rem;
    }
`;

const ButtonWithMarginTop = styled(Button)`
    margin-top: 1rem;
`;

const Footer = styled.div`
    margin-top: 2rem;
    text-align: right;

    a {
        color: ${palette.gray[6]};
        text-decoration: underline;

        &:hover {
            color: ${palette.gray[9]};
        }
    }
`;

export default AuthForm;