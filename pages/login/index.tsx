import { message } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { AuthForm, AuthTemplate } from "../../components/auth";
import { loginForm } from "../../store/auth";
import { fetchJson, useUser } from "../../util";

const Login = () => {
    const router = useRouter();
    const [form, setForm] = useRecoilState(loginForm);
    const [isError, setIsError] = useState('');
    const loginState = useRecoilValue(loginForm);
    const { user, mutateUser } = useUser();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;

        setForm({...form, [name]: value})
    };

    const onSubmit = async() => {
        if(!form.username || !form.password) {
            if (!form.username) {
                setIsError("아이디를 입력해주세요");
                return;
            }

            if (!form.password) {
                setIsError("비밀번호를 입력해주세요");
                return;
            }
        }

        try {
            mutateUser(
              await fetchJson("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
              }),
            ).then(() => setIsError(''));
        } catch (error) {
            if (error.response.status === 500) {
                setIsError("아이디 또는 비밀번호 확인해주세요");
            }
        }
    };

    useEffect(() => {
        if (user?.isLoggedIn) {
            message.info('현재 로그인이 되어 포스트 페이지로 이동합니다');
    
            router.replace('/post');
        }
    },[user?.isLoggedIn]);

    return (
        <Wrap>
            <AuthTemplate>
                <AuthForm 
                    type="login"
                    onChange={onChange}
                    onSubmit={onSubmit}
                    state={loginState}
                    isError={isError}
                />
            </AuthTemplate>
        </Wrap>
    );
};

const Wrap = styled.div`
`;

export default Login;