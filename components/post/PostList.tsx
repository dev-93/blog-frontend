import React, { Fragment, useState } from "react";
import styled from "styled-components";
import palette from "../../styles/palette";
import Responsive from "../common/Responsive";
import Link from "next/link";
import InfiniteScroll from 'react-infinite-scroller';
import agent from "../../agent";
import { Empty, Spin } from "antd";

export type Post = {
    user: {
        username: string,
        _id: string
    },
    title: string,
    body: string,
    tags: string[],
    _id: string
};

export type DatasProps = {
    postData: any,
    setPostData: any
};

const PostList = ({postData, setPostData}:DatasProps) => {
    const [isLast, setIsLast] = useState(true);

    const loadFunc = (page:number) => {
        if (page !== 1) {
            agent.Blog.getBlogList(`page=${page}`)
                .then((data: any) => {
                    setIsLast(data.length === 10);
                    setPostData([...postData, ...data]);
                });
        }
    };

    return(
        <Wrap>
            <InfiniteScroll
                pageStart={0}
                loadMore={loadFunc}
                hasMore={isLast}
            >
                {
                    postData.length > 0 ? postData.map((post: Post) => {
                        return (
                            <Fragment key={post._id}>
                                <Link href={`/post/${post._id}`}>
                                    <a>
                                        <PostHead>
                                            <h1>{post.title}</h1>
                                            <SubInfo>
                                                <span>
                                                    <b>{post.user?.username}</b>
                                                </span>
                                                <span>{new Date().toLocaleDateString()}</span>
                                            </SubInfo>
                                            <Tags>
                                                {
                                                    post.tags?.map((tag: string, index: number) => {
                                                        return (
                                                            <div key={index} className="tag">{tag}</div>
                                                        )
                                                    })
                                                }
                                            </Tags>
                                        </PostHead>
                                        <PostContents dangerouslySetInnerHTML={{ __html: post.body }}/>
                                    </a>
                                </Link>
                            </Fragment>
                        )
                    }
                ) : (<div className="empty_box"><Empty description="찾으시는 post가 없습니다"/></div>)}
            </InfiniteScroll>
        </Wrap>
    );
};

const Wrap = styled(Responsive)`
    margin-top: 4rem;

    .empty_box {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
`;

const PostHead = styled.div`
    border-bottom: 1px solid ${palette.gray[2]};
    padding-bottom: 3rem;
    margin-bottom: 3rem;
    
    h1 {
        font-size: 3rem;
        line-height: 1.5;
        margin: 0;
    }
`;

const SubInfo = styled.div`
    margin-top: 1rem;
    color: ${palette.gray[6]};

    span + span:before {
        color: ${palette.gray[5]};
        padding-left: 0.25rem;
        padding-right: 0.25rem;
        content: '\\B7';
    }
`;

const Tags = styled.div`
    margin-top: 0.5rem;
    .tag {
        display: inline-block;
        color: ${palette.cyan[7]};
        text-decoration: none;
        margin-right: 0.5rem;

        &:hover {
            color: ${palette.cyan[6]};
        }
    }
`;

const PostContents = styled.div`
    font-size: 1.3125rem;
    color: ${palette.gray[8]};
`;

export default PostList;