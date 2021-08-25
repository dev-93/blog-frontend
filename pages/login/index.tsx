import { message } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import styled from "styled-components";
import { AuthForm, AuthTemplate } from "../../components/auth";
import { loginForm } from "../../store/auth";
import { fetchJson, useUser } from "../../util";

const Login = () => {
    const router = useRouter();
    const resetLoginState = useResetRecoilState(loginForm);
    const [form, setForm] = useRecoilState(loginForm);
    const loginValue = useRecoilValue(loginForm);
    const [isError, setIsError] = useState('');
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
            ).then((data) => {
                setCookie('token', data.token, 7);
                setIsError('');
                resetLoginState();
                message.success(`로그인 되었습니다. 어서오세요${data.user.username}`);
                router.replace('/post');
            });
        } catch (error) {
            if (error.response.status === 500) {
                setIsError("아이디 또는 비밀번호 확인해주세요");
            }
        }
    };

    function setCookie(name: any, value: any, day: number) {
        const date = new Date();
        date.setTime(date.getTime() + day * 24 * 60 * 60 * 1000);
        document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
    };

    return (
        <Wrap>
            <AuthTemplate>
                <AuthForm 
                    type="login"
                    onChange={onChange}
                    onSubmit={onSubmit}
                    state={loginValue}
                    isError={isError}
                />
            </AuthTemplate>
        </Wrap>
    );
};

const Wrap = styled.div`
`;

export default Login;