import React from 'react';
import { Logo, Wrapper } from '@/styles/components/Header';

const Header: React.FC = () => {
  // const data = useStaticQuery( // not in pages folder
  //   graphql`
  //     query {
  //       site {
  //         siteMetadata {
  //           rights
  //         }
  //       }
  //     }
  //   `
  // );

  return (
    <Wrapper>
      <Logo to="/">neok</Logo>
    </Wrapper>
  );
}

export default Header;
