import React, { Fragment } from "react";
import styled from "styled-components";
import { DatasProps } from "../../pages/post";
import palette from "../../styles/palette";
import Responsive from "../common/Responsive";

const PostList = ({datas}:DatasProps) => {
    return(
        <Wrap>
            {datas.map((post, index) => {
                return (
                    <Fragment key={post._id}>
                        <PostHead>
                            <h1>{post.title}</h1>
                            <SubInfo>
                                <span>
                                    <b>tester</b>
                                </span>
                                <span>{new Date().toLocaleDateString()}</span>
                            </SubInfo>
                            <Tags>
                                <div className="tag">#태그1</div>
                                <div className="tag">#태그2</div>
                                <div className="tag">#태그3</div>
                            </Tags>
                        </PostHead>
                        <PostContents dangerouslySetInnerHTML={{ __html: "<PHTML <b>내용</b>입니다.</P>" }}/>
                    </Fragment>
                )
            })}
        </Wrap>
    );
};

const Wrap = styled(Responsive)`
    margin-top: 4rem;
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