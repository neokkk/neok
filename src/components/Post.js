import React from 'react';
import { Link } from 'gatsby';

import './Post.scss';

const Post = ({ info }) => {
    return (
        <div className='posts'>
            <Link to={info.fields.slug}>
                <span>{info.frontmatter.title}</span>
                <span>{info.frontmatter.date}</span>
            </Link>
        </div>
    );
}

export default Post;