import React from 'react';
import { Helmet } from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

const SEO = ({ title, description, keywords, image, pathname }) => (
    <StaticQuery query={query} render={({
        site: {
            siteMetadata: {
                defaultTitle,
                defaultDescription,
                defaultKeywords,
                siteUrl,
                defaultImage,
            }
        }
    }) => {
        const seo = {
            title: title || defaultTitle,
            description: description || defaultDescription,
            keywords: keywords || defaultKeywords,
            image: `${siteUrl}${image || defaultImage}`,
            url: `${siteUrl}${pathname || '/'}`
        }

        return (
            <Helmet title={seo.title}>
                <meta name='description' content={seo.description} />
                <meta name='image' content={seo.image} />
                {seo.url && <meta property='og:url' content={seo.url} />}
                {seo.title && <meta property='og:title' content={seo.title} />}
                {seo.description && (
                    <meta property='og:description' content={seo.description} />
                )}
                {seo.image && <meta property='og:image' content={seo.image} />}
            </Helmet>
        );
    }} />
)

export default SEO;

const query = graphql`
    query SEO {
        site {
            siteMetadata {
                defaultTitle: title
                defaultDescription: description
                defaultKeywords: keywords
                siteUrl: url
                defaultImage: image
            }
        }
    }
`;