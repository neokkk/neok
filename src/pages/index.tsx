import { PageProps, graphql } from 'gatsby';
import React from 'react';
import Seo from '@/components/Seo';
import PostItem from '@/components/PostItem';
import Layout from '@/template/Layout';
import PostInfo from '@/schema/post';

type IndexQuery = {
  allMarkdownRemark: {
    nodes: PostInfo[];
  };
};

const Index = ({ data }: PageProps<IndexQuery>) => {
  return (
    <React.Fragment>
      <Seo />

      <Layout>
        <ol style={{ margin: '20px 0' }}>
          {data.allMarkdownRemark.nodes.map((node) => (
            <li key={node.id}>
              <PostItem info={node} />
            </li>
          ))}
        </ol>
      </Layout>
    </React.Fragment>
  );
};

export default Index;

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
