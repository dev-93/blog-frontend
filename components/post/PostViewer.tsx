import React from "react";
import styled from "styled-components";
import palette from "../../styles/palette";
import { useUser } from "../../util";
import Responsive from "../common/Responsive";

export interface PostType {
    body: string,
    publishedDate: string,
    tags: string[],
    title: string
}

const PostViewer = ({body, publishedDate, tags, title}: PostType) => {
    const { user, mutateUser } = useUser();

    console.log(tags)

    return(
        <Wrap>
            <PostHead>
                <h1>{title}</h1>
                <SubInfo>
                    <span>
                        <b>{user?.username}</b>
                    </span>
                    <span>{new Date(publishedDate).toLocaleDateString()}</span>
                </SubInfo>
                <Tags>
                    {tags?.map((tag, index) => {
                        return (
                            <div className="tag" key={index}>#{tag}</div>
                        )
                    })}
                </Tags>
            </PostHead>
            <PostContents dangerouslySetInnerHTML={{ __html: body }}/>
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

export default PostViewer;