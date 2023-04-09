import { CSSObject, SimpleInterpolation, css } from 'styled-components';
import theme from './theme';

export default Object
  .keys(theme.layout)
  .reduce(
    (media, size) => Object.assign(
      media,
      {
        [size]: (first: TemplateStringsArray | CSSObject, ...interpolations: SimpleInterpolation[]) => css`
          @media (max-width: ${theme.layout[size]}px) {
            ${css(first, ...interpolations)}
          }
        `,
      }
    ),
    {},
  )
