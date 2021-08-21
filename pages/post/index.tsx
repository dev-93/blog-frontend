import { Button, Popover } from 'antd';
import Search from 'antd/lib/input/Search';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import HeaderContainer from '../../components/common/HeaderContainer';
import PostList from '../../components/post/PostList';
import { SearchOutlined } from '@ant-design/icons';
import agent from '../../agent';
  
export type DatasProps = {
    datas: any
};

const Post = ({datas}: DatasProps) => {
    const router = useRouter();
    const [postData, setPostData] = useState([]);

    useEffect(() => {
        setPostData(datas);
    }, [datas]);

    const onSearch = (value: string) => {
        if (value) {
            window.scrollTo(0,0);
        }
        agent.Blog.getBlogList(`tag=${value}`)
            .then((data: any) => {
                setPostData(data);
            });
    };
    
    const text = <span>tag를 입력해주세요</span>;

    const content = (
        <div>
            <Search placeholder="input search text" onSearch={onSearch} enterButton />
        </div>
    );

    return (
        <Wrap>
            <HeaderContainer/>
            
            <div className="bt_box">
                <Popover placement="leftTop" title={text} content={content} trigger="click">
                    <Button>
                        <SearchOutlined />
                    </Button>
                </Popover>
                <Button type="primary" onClick={() => router.push("/post/write")}>포스트 작성</Button>
            </div>
            <PostList
                postData={postData}
                setPostData={setPostData}
            />
        </Wrap>
    )
};

const Wrap = styled.div`
    .bt_box {
        width: 1024px;
        margin: 0 auto;
        position: fixed;
        top:64px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        justify-content: flex-end;
    }
`; 

export async function getStaticProps() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_ENV_VARIABLE}/api/posts`);
    const datas = await res.json();

    if (!datas) {
        return {
            notFound: true,
        }
    }
  
    return {
        props: { datas }, // will be passed to the page component as props
    }
}

export default Post;