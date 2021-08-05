import styled from "styled-components";
import { AuthForm, AuthTemplate } from "../../components/auth";

const Login = () => {
    return (
        <Wrap>
            <AuthTemplate>
                <AuthForm />
            </AuthTemplate>
        </Wrap>
    )
};

const Wrap = styled.div`
`;

export default Login;