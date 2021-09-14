import { message } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import styled from "styled-components";
import agent from "../../agent";
import { AuthForm, AuthTemplate } from "../../components/auth";
import { registerForm } from "../../store/auth";
import { fetchJson, useUser } from "../../util";

type Data = {
    _id: string,
    username: string,
    __v: number | string
};

const Register = () => {
    const router = useRouter();
    const [form, setForm] = useRecoilState(registerForm);
    const [isError, setIsError] = useState('');
    const registerValue = useRecoilValue(registerForm);
    const { user, mutateUser } = useUser();

    const resetRegisterState = useResetRecoilState(registerForm);

    useEffect(() => {
        if (user?.isLoggedIn) {

            message.info('현재 로그인이 되어 포스트 페이지로 이동합니다');
    
            router.replace('/post');
        }
    },[user?.isLoggedIn]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;

        setForm({...form, [name]: value})
    };

    const onSubmit = async() => {
        if(!form.username || !form.password || !form.passwordConfirm) {
            if (!form.username) {
                setIsError("아이디를 입력해주세요");
                return;
            }

            if (!form.password) {
                setIsError("비밀번호를 입력해주세요");
                return;
            }

            if (!form.passwordConfirm) {
                setIsError("비밀번호 확인을 입력해주세요");
                return;
            }
        }

        if (form.password !== form.passwordConfirm) {
            setIsError("비밀번호가 같지 않습니다");
            return;
        } else {
            setIsError('');
        }

        agent.Auth.regist({
            username: form.username,
            password: form.password
        })
        .then((data:Data) => {
            try {
                mutateUser(
                  fetchJson("/api/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        username: form.username,
                        password: form.password
                    }),
                  }),
                ).then(() => {
                    setIsError('');
                    resetRegisterState();
                });
            } catch (error) {
                console.log(error)
            }
        })
        .catch((err:any)=> {
            if (err.response.status === 500) {
                setIsError("아이디 또는 비밀번호 확인해주세요");
            };

            if (err.response.status === 400) {
                setIsError("아이디는 3글지 이상 20글자 이하입니다");
            };

            if(err.response.status === 409) {
                setIsError('이미 있는 아이디 입니다.');                
            };
        })
    };

    return (
        <Wrap>
            <AuthTemplate>
                <AuthForm 
                    type="register"
                    onChange={onChange}
                    onSubmit={onSubmit}
                    state={registerValue}
                    isError={isError}
                />
            </AuthTemplate>
        </Wrap>
    )
};

const Wrap = styled.div`
`;

export default Register;