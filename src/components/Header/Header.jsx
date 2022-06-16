import { Box, Center, Container, Flex, Image } from '@chakra-ui/react';

import Nav from '../Nav/Nav';

const Header = ({ children }) => {
  return (
    <Box w="100%" bg="light.600" p={3}>
      <Container maxW="6xl">
        <Flex justifyContent="space-between">
          <Center>
            <Image src="/iToYou-Logo.png" h={['30px', '40px', '50px']} />
          </Center>
          {children}
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
