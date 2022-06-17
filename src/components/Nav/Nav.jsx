import { useState } from 'react';
import {
  Button,
  Flex,
  HStack,
  IconButton,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { IoMenu, IoClose } from 'react-icons/io5';

const Nav = () => {
  const [display, changeDisplay] = useState('none');

  return (
    <Flex>
      <HStack as="nav" spacing="5" display={['none', 'none', 'flex']}>
        <Link to="/">
          <Text>Transfer</Text>
        </Link>
        <Link to="/active-file">
          <Text>Active Files</Text>
        </Link>

        <Link to="/login">
          <Button variant="solid" colorScheme="default">
            <Text>Login</Text>
          </Button>
        </Link>
      </HStack>

      {/* Menu Btn to open navbar */}
      <IconButton
        aria-label="Open Menu"
        fontSize={['1.8rem']}
        display={['flex', 'flex', 'none']}
        icon={<IoMenu />}
        onClick={() => changeDisplay('flex')}
      />

      {/* Hidden nav bar to be displayed when clicked menu btn */}
      <VStack
        display={display}
        backgroundImage="/hero-img.png"
        backgroundRepeat="no-repeat"
        backgroundPosition="50% 70%"
        backgroundSize="contain"
        w="100vw"
        h="100vh"
        bgColor="light.600"
        zIndex={20}
        pos="fixed"
        top="0"
        left="0"
        overflowY="auto"
        spacing={5}>
        <Flex w="100%" justify="flex-end">
          <IconButton
            aria-label="Close Menu"
            fontSize={['1.8rem']}
            mr={7}
            mt={3}
            icon={<IoClose />}
            onClick={() => changeDisplay('none')}
          />
        </Flex>
        <Link to="/">
          <Button onClick={() => changeDisplay('none')}>Transfer</Button>
        </Link>
        <Link to="/active-file">
          <Button onClick={() => changeDisplay('none')}>Active Files</Button>
        </Link>
        <Link to="/login">
          <Button onClick={() => changeDisplay('none')}>Login</Button>
        </Link>
      </VStack>
    </Flex>
  );
};

export default Nav;
