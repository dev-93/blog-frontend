import { useRouter } from 'next/router';
import React from 'react';
import { useUser } from '../../util';
import Header from './Header';

const HeaderContainer = () => {
    const router = useRouter();
    const { user, mutateUser } = useUser();

    const onLogout = () => {
        console.log("logout");
    };

    const onLogin = () => {
        console.log("login");
    };

    return <Header user={user} onLogout={onLogout} onLogin={onLogin}/>;
};

export default HeaderContainer;