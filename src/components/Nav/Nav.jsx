import { Button, Flex, HStack, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <HStack as="nav" spacing="5">
      <Link to="/">
        <Text fontSize={['sm', 'md']}>Transfer</Text>
      </Link>
      <Link to="/active-file">
        <Text fontSize={['sm', 'md']}>Active Files</Text>
      </Link>

      <Link to="/login">
        <Button variant="solid" colorScheme="default">
          <Text fontSize={['sm', 'md']}>Login</Text>
        </Button>
      </Link>
    </HStack>
  );
};

export default Nav;
