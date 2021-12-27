const path = require('path');
const { createFilePath } = require(`gatsby-source-filesystem`);

const onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({ node, getNode, basePath: 'post' });

    createNodeField({
      node,
      name: 'slug',
      value: slug
    });
  }
}

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

  allMarkdown.data?.allMarkdownRemark.nodes.forEach((node) => {
    const { slug } = node.fields;
    if (!slug) return;

    createPage({
      path: slug,
      component: path.resolve('./src/template/blog-post.js'),
      context: {
        slug,
      },
    });
  });
}

module.exports = {
  onCreateNode,
  createPages,
};
