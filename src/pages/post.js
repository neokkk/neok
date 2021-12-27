import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import Post from '../components/Post';

import './index.scss';

export default ({ data }) => {
  return (
    <div className="index">
      <Layout>
        <div className="post">
          {data.allMarkdownRemark.nodes.map((node) => (
            <Post key={node.id} info={node} />
          ))}
        </div>
      </Layout>
    </div>
  );
};

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        id
        frontmatter {
          title
          date(formatString: "DD MMM, YYYY")
        }
        fields {
          slug
        }
        excerpt
      }
    }
  }
`;
