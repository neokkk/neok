import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import Seo from '../components/Seo';
import Post from '../components/Post';

import './index.scss';

const IndexPage = ({ data }) => {
  return (
    <div className="page index">
      <Seo />
      <Layout>
        <div className="posts">
          {data.allMarkdownRemark.nodes.map((node) => (
            <Post key={node.id} info={node} />
          ))}
        </div>
      </Layout>
    </div>
  );
};

export default IndexPage;

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
          date(formatString: "YYYY. MM. DD")
          tags
          title
        }
      }
    }
  }
`;
