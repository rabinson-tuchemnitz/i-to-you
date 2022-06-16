import { Box, Container, VStack } from '@chakra-ui/react';
import Nav from '../Nav/Nav';

import Footer from './Footer';
import Header from './Header';

const AuthLayout = ({ children }) => {
  return (
    <VStack h="100vh" spacing="0px">
      <Header />
      <Box w="100%" flexGrow={1}>
        <Container maxW="2xl">{children}</Container>
      </Box>
      <Footer />
    </VStack>
  );
};

export default AuthLayout;
