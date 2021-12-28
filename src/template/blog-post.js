import React from 'react';
import { graphql } from 'gatsby';

import './blog-post.scss';
import Layout from '../components/Layout';
import Seo from '../components/Seo';

export default ({ data }) => {
  const post = data.markdownRemark;

  return (
    <div class="page post">
      <Seo
        title={post.frontmatter.title}
        description={post.excerpt}
        keywords={post.frontmatter.title}
        pathname={post.fields.slug}
      />

      <Layout>
        <div className="blog-post">
          <h1 className="blog-post-title">{post.frontmatter.title}</h1>
          <p className="blog-post-date">{post.frontmatter.date}</p>
          <div className="blog-post-html" dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
      </Layout>
    </div>
  )
}

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
