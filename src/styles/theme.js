import { extendTheme, theme } from '@chakra-ui/react';

export const iToYouTheme = extendTheme({
  styles: {
    global: {
      'html, body': {
        color: 'gray.600',
      },
      a: {
        color: 'default.500',
      },
    },
  },
  colors: {
    default: {
      400: '#9AB3CD',
      500: '#81A1C1',
      600: '#35506B',
    },
    primary: {
      400: '#9FCCD9',
      500: '#88C0D0',
      600: '#306A7B',
    },
    secondary: {
      400: '#C3A4BD',
      500: '#B48EAD',
      600: '#60405A',
    },
    success: {
      400: '#B5CBA3',
      500: '#A3BE8C',
      600: '#50693b',
    },
    warning: {
      400: '#EED5A2',
      500: '#EBCB8B',
      600: '#9F731B',
    },
    danger: {
      400: '#CB8087',
      500: '#BF616A',
      600: '#66292F',
    },
    light: {
      400: '#D8DEE9',
      500: '#E5E9F0',
      600: '#ECEFF4',
    },
    dark: {
      400: '#434C5E',
      500: '#3B4252',
      600: '#2E3440',
    },
  },
  breakpoints: {
    sm: '40em',
    md: '52em',
    lg: '64em',
    xl: '80em',
  },
});
