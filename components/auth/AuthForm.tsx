import { Button } from 'antd';
import Link from 'next/link';
import React, { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from "styled-components";
import { loginState } from '../../store/login';
import palette from '../../styles/palette';

type Props = {
    type: string;
};

const AuthForm = ({type}: Props) => { 
    const text = ( type === "login" ) ? "로그인" : "회원가입";
    const [state, setState] = useRecoilState(loginState);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;

        setState({...state, [name]: value})
    };
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(e);
    };

    return (
        <AuthFormBlock>
            <form onSubmit={handleSubmit}>
                <StyledInput 
                    autoComplete="username"
                    name="username"
                    placeholder="아이디"
                    onChange={onChange}
                />
                <StyledInput 
                    autoComplete="new-password"
                    name="password"
                    placeholder="비밀번호"
                    type="password"
                    onChange={onChange}
                />

                {type === 'register' && (
                    <StyledInput 
                        autoComplete="new-password"
                        name="passwordConfirm"
                        placeholder="비밀번호 확인"
                        type="password"
                        onChange={onChange}
                    />
                )}

                <Button className="login_bt" type="primary" block>{text}</Button>

                {/* {error && <ErrorMessage>{error}</ErrorMessage>} */}
            </form>
            
            <Footer>
                {type === 'login' ? (
                    <Link href="/register">
                        <a>Go to register</a>
                    </Link>
                ): (
                    <Link href="/login">
                        <a>Go to Login</a>
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

    .login_bt {
        margin-top: 1rem;
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