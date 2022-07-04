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
import { siteMap } from '../../routes';
import { isAuthenticated } from '../../utils/jwt';
import { removeItem } from '../../utils/storage';

const Nav = () => {
  const [display, changeDisplay] = useState('none');

  const handleLogout = () => {
    removeItem('token');
    console.log('removed');
  };
  return (
    <Flex>
      <HStack as="nav" spacing="5" display={['none', 'none', 'flex']}>
        <Link to={siteMap.HomePage.path}>
          <Text>Transfer</Text>
        </Link>
        {isAuthenticated() && (
          <>
            <Link to={siteMap.UploadedFiles.path}>
              <Text>My Files</Text>
            </Link>
            <Button
              variant="solid"
              colorScheme="default"
              onClick={handleLogout}>
              <Text>Logout</Text>
            </Button>
          </>
        )}

        {!isAuthenticated() && (
          <Link to={siteMap.LoginPage.path}>
            <Button variant="solid" colorScheme="default">
              <Text>Login</Text>
            </Button>
          </Link>
        )}
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
        <Link to={siteMap.HomePage.path}>
          <Button onClick={() => changeDisplay('none')}>Transfer</Button>
        </Link>
        {isAuthenticated() && (
          <>
            <Link to={siteMap.UploadedFiles.path}>
              <Button onClick={() => changeDisplay('none')}>
                Active Files
              </Button>
            </Link>
            <Button
              variant="solid"
              colorScheme="default"
              onClick={handleLogout}>
              <Text>Logout</Text>
            </Button>
          </>
        )}
        {!isAuthenticated() && (
          <Link to={siteMap.LoginPage.path}>
            <Button onClick={() => changeDisplay('none')}>Login</Button>
          </Link>
        )}
      </VStack>
    </Flex>
  );
};

export default Nav;
