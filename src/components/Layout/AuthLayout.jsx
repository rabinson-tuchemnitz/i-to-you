import { Center, Container, Image, VStack } from '@chakra-ui/react';

import Footer from '../Footer/Footer';
import Header from '../Header/Header';

const AuthLayout = ({ children }) => {
  return (
    <VStack h="100vh" spacing="0px">
      <Header>
        <Image src="/transfer.png" h={['1rem', '2rem', '3rem']} />
      </Header>
      <Center w="100%" flexGrow={1}>
        <Container maxW="2xl" p={4}>
          {children}
        </Container>
      </Center>
      <Footer />
    </VStack>
  );
};

export default AuthLayout;
