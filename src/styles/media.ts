import { CSSObject, SimpleInterpolation, css } from 'styled-components';
import { layout } from './theme';

export default Object
  .keys(layout)
  .reduce(
    (media, size) => Object.assign(
      media,
      {
        [size]: (first: TemplateStringsArray | CSSObject, ...interpolations: SimpleInterpolation[]) => css`
          @media (max-width: ${layout[size]}px) {
            ${css(first, ...interpolations)}
          }
        `,
      }
    ),
    {},
  )
