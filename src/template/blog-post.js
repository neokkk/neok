import React from "react";
import { graphql } from "gatsby";

import './blog-post.scss';
import SEO from '../components/SEO';

export default ({ data }) => {
  const post = data.markdownRemark;

  return (
      <div className='blog-post'>
        <SEO />
        <a className='blog-post-back' href='/post'>category</a>
        <h1 className='blog-post-title'>{post.frontmatter.title}</h1>
        <p className='blog-post-date'>{post.frontmatter.date}</p>
        <div className='blog-post-html' dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "DD MMM, YYYY")
      }
    }
  }
`
