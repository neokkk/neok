import { Helmet } from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import React from 'react';

type SeoProps = {
  description?: string;
  keywords?: string;
  image?: string;
  pathname?: string;
  title?: string;
};

const Seo: React.FC<SeoProps> = ({
  title,
  description,
  keywords,
  image,
  pathname,
}) => (
  <StaticQuery
    query={query}
    render={({
      site: {
        siteMetadata: {
          defaultTitle,
          defaultDescription,
          defaultKeywords,
          siteUrl,
          defaultImage,
          twitterUsername,
        },
      },
    }) => {
      const seo = {
        title: title || defaultTitle,
        description: description || defaultDescription,
        keywords: keywords || defaultKeywords,
        image: `${siteUrl}${image || defaultImage}`,
        url: `${siteUrl}${pathname || '/'}`,
      };

      return (
        <Helmet title={seo.title}>
          <meta
            name="google-site-verification"
            content="7G6P9UcaTJM9GrsoQsecT7pryxkUZeM1dL6GygBPPnc"
          />
          <meta name="description" content={seo.description} />
          <meta name="image" content={seo.image} />
          {seo.url && <meta property="og:url" content={seo.url} />}
          {seo.title && <meta property="og:title" content={seo.title} />}
          {seo.description && (
            <meta property="og:description" content={seo.description} />
          )}
          {seo.image && <meta property="og:image" content={seo.image} />}
        </Helmet>
      );
    }}
  />
);

export default Seo;

const query = graphql`
  query {
    site {
      siteMetadata {
        defaultTitle: title
        defaultDescription: description
        defaultKeywords: keywords
        siteUrl: url
        defaultImage: image
        twitterUsername
      }
    }
  }
`;
