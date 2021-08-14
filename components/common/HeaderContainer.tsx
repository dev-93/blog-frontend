import { useRouter } from 'next/router';
import React from 'react';
import agent from '../../agent';
import { useUser, fetchJson } from '../../util';
import Header from './Header';

const HeaderContainer = () => {
    const router = useRouter();
    const { user, mutateUser } = useUser();

    const onLogout = async() => {
        try {
            mutateUser(
                await fetchJson("/api/logout", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                }),
            ).then((data) => console.log(data));
        } catch (error) {
            console.log(error);
        }
    };

    const onLogin = () => {
        router.push('/login')
    };

    return <Header user={user} onLogout={onLogout} onLogin={onLogin}/>;
};

export default HeaderContainer;