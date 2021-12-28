import React from 'react';
import { Link } from 'gatsby';

import './Post.scss';

const Post = ({ info }) => {
  const { date, tags, title } = info.frontmatter;

  return (
    <div className="post-item">
      <p className="post-item-date">{date}</p>

      <Link to={info.fields.slug}>
        <p className="post-item-title">{title}</p>
      </Link>

      <ul className="post-item-tags">
        {tags.map((tag) => (
          <li>#{tag}</li>
        ))}
      </ul>
    </div>
  );
}

export default Post;
