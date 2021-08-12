import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import agent from "../../agent";
import { AuthForm, AuthTemplate } from "../../components/auth";
import { registerForm } from "../../store/auth";

type Data = {
    _id: string,
    username: string,
    __v: number | string
};

const Register = () => {
    const [form, setForm] = useRecoilState(registerForm);
    const [isError, setIsError] = useState('');
    const registerValue = useRecoilValue(registerForm);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;

        setForm({...form, [name]: value})
    };

    const onSubmit = async() => {
        if (form.password !== form.passwordConfirm) {
            setIsError("비밀번호가 같지 않습니다");
        } else {
            setIsError('');
        }
        agent.Auth.regist({
            username: form.username,
            password: form.password
        })
        .then((data:Data) => console.log(data))
        .catch((err:any)=> {
            if(err.response.status === 409) {
                setIsError('이미 있는 아이디 입니다.');                
            }
        })
    }

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