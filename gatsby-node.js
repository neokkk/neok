const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({ node, getNode, basePath: 'post' });

    createNodeField({
      node,
      name: 'slug',
      value: slug,
    });
  }
};

const onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({
    name: '@babel/plugin-transform-react-jsx',
    options: {
      runtime: 'automatic',
    },
  });
};

const onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      plugins: [new TsconfigPathsPlugin()],
    },
  });
};

const createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const allMarkdown = await graphql(`
    query allMarkdownQuery {
      allMarkdownRemark(limit: 1000) {
        nodes {
          fields {
            slug
          }
        }
      }
    }
  `);

  allMarkdown.data.allMarkdownRemark.nodes.forEach((node) => {
    const { slug } = node.fields;
    if (!slug) return;

    createPage({
      path: slug,
      component: path.resolve('./src/template/Post.tsx'),
      context: {
        slug,
      },
    });
  });
};

module.exports = {
  onCreateNode,
  onCreateBabelConfig,
  onCreateWebpackConfig,
  createPages,
};
