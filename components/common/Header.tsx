import { Button } from 'antd';
import Link from 'next/link';
import React from 'react';
import styled from "styled-components";
import Responsive from './Responsive';

type User = {
    isLoggedIn: boolean,
    token?: string,
    user : {
        username: string,
        _id?: string
    }
}

type State = {
    user?: User,
    onLogout?: () => void,
    onLogin?: () => void
}

const Header = ({ user, onLogout, onLogin }: State) => {
    return (
        <>
            <HeaderBlock>
                <Wrapper>
                    <Link href="/post">
                        <a className="logo">TAENAM</a>
                    </Link>
                    {
                        user?.isLoggedIn ? (
                            <div className="right">
                                <UserInfo>{user?.user.username}</UserInfo>
                                <Button onClick={onLogout}>로그아웃</Button>
                            </div>
                        ) : (
                            <div className="right">
                                <Button type="primary" onClick={onLogin}>로그인</Button>
                            </div>
                        )
                    }
                </Wrapper>
            </HeaderBlock>
            <Spacer/>
        </>
    )
};

const HeaderBlock = styled.div`
    position: fixed;
    width: 100%;
    background: white;
    box-shadow: 0px 2px 4px rgba(0,0,0,0.08);
`;

const Wrapper = styled(Responsive)`
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .logo {
        font-size: 1.125rem;
        font-weight: 800;
        letter-spacing: 2px;
    }
    .right {
        display: flex;
        align-items: center;
    }
`;

const Spacer = styled.div`
    height: 4rem;
`;

const UserInfo = styled.div`
    font-weight: 800;
    margin-right: 1rem;
`;

export default Header;