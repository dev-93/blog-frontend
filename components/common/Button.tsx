import styled from "styled-components";
import palette from "../../styles/palette";

type Props = {
    name: string,
}

const Button = (props:any) => {
    return (
        <StyleButton {...props}/>
    )
};

const StyleButton = styled.button`
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: bold;
    padding: 0.25rem 1rem;
    color: white;
    outline: none;
    cursor: pointer;

    background: ${palette.gray[8]};

    &:hover {
        background: ${palette.gray[6]};
    }
`;

export default Button;