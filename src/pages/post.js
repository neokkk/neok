import React from 'react';

import Layout from '../components/Layout';
import Item from '../components/Item'

import './index.scss';

const PostPage = () => {
    return (
        <div className='index'>
            <Layout>
            </Layout>
        </div>
    );
}

export default PostPage;

// export const query = graphql`
//   query {
//     allMarkdownRemark {
//       totalCount
//       edges {
//         node {
//           id
//           frontmatter {
//             title
//             date(formatString: "DD MMMM, YYYY")
//           }
//           excerpt
//         }
//       }
//     }
//   }
// `