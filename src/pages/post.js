import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import Post from '../components/Post';

import './index.scss';

const PostPage = ({ data }) => {
  return (
    <div className="page post">
      <Layout>
        {data.allMarkdownRemark.nodes.map((node) => (
          <Post key={node.id} info={node} />
        ))}
      </Layout>
    </div>
  );
};

export default PostPage;

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        id
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "DD MMM, YYYY")
          tags
          title
        }
      }
    }
  }
`;
