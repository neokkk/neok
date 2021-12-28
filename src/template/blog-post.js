import React from 'react';
import { graphql } from 'gatsby';

import './blog-post.scss';
import Layout from '../components/Layout';
import Seo from '../components/Seo';

const Post = ({ data }) => {
  const post = data.markdownRemark;
  const {
    date,
    tags,
    title,
  } = post.frontmatter;

  return (
    <div className="page post">
      <Seo
        title={title}
        description={post.excerpt}
        keywords={tags.join(', ')}
        pathname={post.fields.slug}
      />

      <Layout>
        <div className="blog-post">
          <h1 className="blog-post-title">{title}</h1>
          <p className="blog-post-date">{date}</p>
          <div className="blog-post-html" dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
      </Layout>
    </div>
  )
};

export default Post;

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      excerpt
      html
      fields {
        slug
      }
      frontmatter {
        date(formatString: "YYYY. MM. DD")
        title
        tags
      }
    }
  }
`
