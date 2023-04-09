const color = {
  gray: '#474747',
  orange: '#ff7a0f',
  yellow: '#fde872',
};

const font = {
  montserrat: '"Montserrat", sans-serif',
  sourceCode: '"Source Code Pro", monospace',
  spoqaHan: '"Spoqa Han Sans", sans-serif',
};

const layout: Record<string, number> = {
  mobile: 320,
  tablet: 768,
  laptop: 1024,
  desktop: 2560,
};

const transition = {
  hover: 'all 0.2s ease-in-out',
}

export const theme = {
  color,
  font,
  layout,
  transition,
};

export default theme;
