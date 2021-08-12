import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { AuthForm, AuthTemplate } from "../../components/auth";
import { registerForm } from "../../store/auth";
import { fetchJson, useUser } from "../../util";

const Register = () => {
    const [form, setForm] = useRecoilState(registerForm);
    const [isError, setIsError] = useState(false);
    const registerValue = useRecoilValue(registerForm);
    const { user, mutateUser } = useUser();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;

        setForm({...form, [name]: value})
    };

    const onSubmit = async() => {
        try {
            mutateUser(
              await fetchJson("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
              }),
            ).then(() => setIsError(true));
        } catch (error) {
            setIsError(true);
        }
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