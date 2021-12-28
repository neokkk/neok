import React from 'react';
import { Link } from 'gatsby';

import { Date, Tags, Title, Wrapper } from '@/styles/components/Post';
import PostInfo from '@/types/post';

type PostProps = {
  info: PostInfo,
};

const Post: React.FC<PostProps> = ({ info }) => {
  const { date, tags, title } = info.frontmatter;

  return (
    <Wrapper>
      <Date>{date}</Date>

      <Link to={info.fields.slug}>
        <Title>{title}</Title>
      </Link>

      <Tags>
        {tags.map((tag) => (
          <li>#{tag}</li>
        ))}
      </Tags>
    </Wrapper>
  );
}

export default Post;
