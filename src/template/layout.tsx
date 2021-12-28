import React from 'react';
import { ThemeProvider } from 'styled-components';

import Header from '../components/Header';
import { Global } from '@/styles/common';
import media from '@/styles/media';
import theme from '@/styles/theme';
import { Wrapper, Content } from '@/styles/layout';

const Layout: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={{ ...theme, ...media }}>
      <Global />

      <Wrapper>
        <Header />

        <Content>
          {children}
        </Content>
      </Wrapper>
    </ThemeProvider>
  );
}

export default Layout;
