import { Box, Container, Text } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box w="100%" bg="dark.600" color="white" p={2}>
      <Container maxW="6xl">
        <Text>This is footer.</Text>
      </Container>
    </Box>
  );
};

export default Footer;
