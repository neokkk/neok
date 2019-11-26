const path = require('path');
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, actions }) => {
    const { createNodeField } = actions;

    if (node.internal.type === `MarkdownRemark`) {
        const slug = createFilePath({ node, getNode, basePath: 'post' });

        console.log('slug');
        console.log(slug);

        createNodeField({
            node,
            name: `slug`,
            value: slug
        });
    }
}

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions;

    const result = await graphql(`
        query {
            allMarkdownRemark {
                edges {
                    node {
                        fields {
                            slug
                        }
                    }
                }
            }
        }
    `);

    
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        console.log('node.fields.slug');
        console.log(node.fields.slug);

        createPage({
            path: node.fields.slug,
            component: path.resolve(`./src/template/blog-post.js`),
            context: {
                slug: node.fields.slug
            }
        });
    });
}