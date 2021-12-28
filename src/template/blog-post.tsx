import React from 'react';
import { PageProps, graphql } from 'gatsby';

import Seo from '../components/Seo';
import Layout from './layout';
import { Date, Html, Title, Wrapper } from '@/styles/blog-post';
import PostInfo from '@/types/post';

type PostQuery = {
  markdownRemark: PostInfo & { html: string },
};

const Post: React.FC<PageProps<PostQuery>> = ({ data }) => {
  const post = data.markdownRemark;
  const {
    date,
    tags,
    title,
  } = post.frontmatter;

  return (
    <React.Fragment>
      <Seo
        title={title}
        description={post.excerpt}
        keywords={tags.join(', ')}
        pathname={post.fields.slug}
      />

      <Layout>
        <Wrapper>
          <Title>{title}</Title>
          <Date>{date}</Date>
          <Html dangerouslySetInnerHTML={{ __html: post.html }} />
        </Wrapper>
      </Layout>
    </React.Fragment>
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
