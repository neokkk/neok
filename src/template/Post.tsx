import { PageProps, graphql } from 'gatsby';
import { Fragment } from 'react';
import Layout from './Layout';
import Style from './Post.style';
import Seo from '@/components/Seo';
import PostInfo from '@/schema/post';

type PostQuery = {
  markdownRemark: PostInfo & { html: string };
};

const Post = ({ data }: PageProps<PostQuery>) => {
  console.log(data);
  const post = data.markdownRemark;
  const { date, tags, title } = post.frontmatter;

  return (
    <Fragment>
      <Seo
        title={title}
        description={post.excerpt}
        keywords={tags.join(', ')}
        pathname={post.fields.slug}
      />

      <Layout>
        <Style.Container>
          <Style.Title>{title}</Style.Title>
          <Style.Date>{date}</Style.Date>
          <Style.Html dangerouslySetInnerHTML={{ __html: post.html }} />
        </Style.Container>
      </Layout>
    </Fragment>
  );
};

export default Post;

export const query = graphql`
  query ($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      excerpt
      html
      fields {
        slug
      }
      frontmatter {
        date(formatString: "YYYY. MM. DD")
        title
        tags
      }
    }
  }
`;
