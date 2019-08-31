import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';

import './index.scss';

const PostPage = ({ data }) => {
    const post = data.markdownRemark;

    return (
        <div className='index'>
            <Layout>
                <div>
                    <h1>{post.frontmatter.title}</h1>
                    <div dangerouslySetInnerHTML={{ __html: post.html }} />
                </div>
            </Layout>
        </div>
    );
}

export default PostPage;

export const query = graphql`
  query($slug) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
        html
        frontmatter {
            title
        }
    }
  }
`;