import { createGlobalStyle } from 'styled-components';
import { transition } from './theme';

export const Global = createGlobalStyle`
  @import url("https://fonts.googleapis.com/css?family=Montserrat:800&display=swap");
  @import url("https://fonts.googleapis.com/css?family=Source+Code+Pro&display=swap");
  @import url("//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSans-kr.css");

  *,
  body,
  html {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  a {
    transition: ${transition.hover};

    &:hover {
      transition: ${transition.hover};
    }
  }
`;
