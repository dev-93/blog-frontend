import Head from 'next/head';
import AuthForm from '../components/AuthForm';
import Button from '../components/common/Button';

const Home = () => {
    return (
        <>
            <AuthForm />
            <Button>버튼</Button>
        </>
    )
};

export default Home;
