import Head from 'next/head';
import AuthForm from '../components/AuthForm';
import Button from '../components/common/Button';

const Home = () => {
    return (
        <>
            <AuthForm />
            <Button>버튼</Button>
            <Button>테스트</Button>
        </>
    )
};

export default Home;
