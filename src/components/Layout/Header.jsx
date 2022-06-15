import { Box, Container, Flex } from '@chakra-ui/react';

import Nav from '../Nav/Nav';

const Header = () => {
  return (
    <Box w="100%" bg="light.600" p={2}>
      <Container maxW="6xl">
        <Flex>
          <Box>Logo</Box>
          <Nav />
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
