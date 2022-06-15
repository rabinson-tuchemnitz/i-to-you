import { Box, Container, VStack } from '@chakra-ui/react';

import Footer from './Footer';
import Header from './Header';

const MainLayout = ({ children }) => {
  return (
    <VStack sx={{ height: '100vh' }}>
      <Header />
      <Box w="100%" flexGrow={1}>
        <Container maxW="6xl">{children}</Container>
      </Box>
      <Footer />
    </VStack>
  );
};

export default MainLayout;
