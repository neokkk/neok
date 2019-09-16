module.exports = {
  siteMetadata: {
    rights: '©2019 neok All rights reserved.',
  },  
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdowns`,
        path: `${__dirname}/src/pages/post`,
      },
    },
    `gatsby-transformer-remark`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-typescript`,
    `gatsby-plugin-tslint`,
  ],
}
