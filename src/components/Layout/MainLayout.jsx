import { Box, Container, VStack } from '@chakra-ui/react';
import Nav from '../Nav/Nav';

import Footer from './Footer';
import Header from './Header';

const MainLayout = ({ children }) => {
  return (
    <VStack h="100vh" spacing="0px">
      <Header>
        <Nav />
      </Header>
      <Box w="100%" flexGrow={1}>
        <Container maxW="6xl">{children}</Container>
      </Box>
      <Footer />
    </VStack>
  );
};

export default MainLayout;
