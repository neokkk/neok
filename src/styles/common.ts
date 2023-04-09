import { createGlobalStyle } from 'styled-components';
import theme from './theme';

export const Global = createGlobalStyle`
  *,
  body,
  html {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  ul,
  ol {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    list-style: none;
  }

  a {
    transition: ${theme.transition.hover};

    &:hover {
      transition: ${theme.transition.hover};
    }
  }
`;
