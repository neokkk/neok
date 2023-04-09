import { Link } from 'gatsby';
import React from 'react';
import Style from './PostItem.style';
import PostInfo from '@/schema/post';

type PostItemProps = {
  info: PostInfo;
};

const PostItem: React.FC<PostItemProps> = ({ info }) => {
  const { date, tags, title } = info.frontmatter;

  return (
    <Style.Container>
      <Style.Date>{date}</Style.Date>

      <Link to={info.fields.slug}>
        <Style.Title>{title}</Style.Title>
      </Link>

      <Style.Tags>
        {tags.map((tag) => (
          <li>#{tag}</li>
        ))}
      </Style.Tags>
    </Style.Container>
  );
};

export default PostItem;
