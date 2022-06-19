import { Box, Container, VStack } from '@chakra-ui/react';
import Nav from '../Nav/Nav';

import Footer from '../Footer/Footer';
import Header from '../Header/Header';

const MainLayout = ({ children }) => {
  return (
    <VStack minH="100vh" spacing="0px" justifyContent="center">
      <Header>
        <Nav />
      </Header>
      <Box w="100%" display="flex" flexGrow={1}>
        <Container maxW="6xl" flexGrow={1}>
          {children}
        </Container>
      </Box>
      <Footer />
    </VStack>
  );
};

export default MainLayout;
