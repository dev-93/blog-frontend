import { Button } from "antd";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { AuthForm, AuthTemplate } from "../../components/auth";
import { loginForm, registerForm } from "../../store/auth";

const Login = () => {
    return (
        <Wrap>
            <AuthTemplate>
                <AuthForm 
                    type="login"
                />
            </AuthTemplate>
        </Wrap>
    )
};

const Wrap = styled.div`
`;

export default Login;