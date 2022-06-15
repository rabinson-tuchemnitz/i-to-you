import ReactDOM from 'react-dom/client';

import { ChakraProvider } from '@chakra-ui/react';

import App from './App';
import { iToYouTheme } from './styles/theme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChakraProvider resetCSS theme={iToYouTheme}>
    <App />
  </ChakraProvider>,
);
