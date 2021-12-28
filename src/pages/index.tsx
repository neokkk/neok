import React from 'react';
import { PageProps, graphql } from 'gatsby';
import { ThemeProvider } from 'styled-components';

import Seo from '../components/Seo';
import Post from '../components/Post';
import Layout from '../template/layout';

import PostInfo from '@/types/post';

type IndexQuery = {
  allMarkdownRemark: {
    nodes: PostInfo[],
  },
};

const IndexPage: React.FC<PageProps<IndexQuery>> = ({ data }) => {
  return (
    <React.Fragment>
      <Seo />

      <Layout>
        <div style={{ margin: '20px 0' }}>
          {data.allMarkdownRemark.nodes.map((node) => (
            <Post key={node.id} info={node} />
          ))}
        </div>
      </Layout>
    </React.Fragment>
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
