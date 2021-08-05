import styled from "styled-components";
import { AuthForm, AuthTemplate } from "../../components/auth";

const Register = () => {
    return (
        <Wrap>
            <AuthTemplate>
                <AuthForm type="register"/>
            </AuthTemplate>
        </Wrap>
    )
};

const Wrap = styled.div`
`;

export default Register;