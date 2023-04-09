import { PropsWithChildren } from 'react';
import { ThemeProvider } from 'styled-components';
import Style from './Layout.style';
import Header from '@/components/Header';
import { Global } from '@/styles/common';
import media from '@/styles/media';
import theme from '@/styles/theme';

const Layout = ({ children }: PropsWithChildren<any>) => {
  return (
    <ThemeProvider theme={{ ...theme, ...media }}>
      <Global />

      <Style.Container>
        <Header />

        <Style.Content>{children}</Style.Content>
      </Style.Container>
    </ThemeProvider>
  );
};

export default Layout;
