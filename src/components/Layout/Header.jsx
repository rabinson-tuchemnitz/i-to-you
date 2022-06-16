import { Box, Container, Flex, Image } from '@chakra-ui/react';

import Nav from '../Nav/Nav';

const Header = ({ children }) => {
  return (
    <Box w="100%" bg="light.600" p={2}>
      <Container maxW="6xl">
        <Flex justifyContent="space-between">
          <Image src="/iToYou-Logo.png" h={['30px', '40px', '50px']} />
          {children}
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
