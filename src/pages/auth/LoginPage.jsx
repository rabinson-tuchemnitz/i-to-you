import {
  Box,
  Center,
  FormControl,
  FormLabel,
  FormHelperText,
  Heading,
  Input,
  VStack,
  Button,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import AuthLayout from '../../components/Layout/AuthLayout';

const LoginPage = () => {
  return (
    <AuthLayout>
      <VStack>
        <Center
          borderRadius={10}
          border="1px solid"
          borderColor="default.500"
          boxShadow="4px rgba(23 6, 239,244, 0.75)"
          minW={['22rem', '25rem']}>
          <VStack w="100%" p={4}>
            <Box>
              <Heading>Login</Heading>
            </Box>
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                id="email"
                type="email"
                isInvalid={false}
                focusBorderColor="default.400"
                errorBorderColor="danger.400"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">Password</FormLabel>
              <Input
                id="password"
                type="password"
                isInvalid={false}
                focusBorderColor="default.400"
                errorBorderColor="danger.400"
              />
              <FormHelperText display="none">
                Invalid Credentials
              </FormHelperText>
            </FormControl>
            <br />
            <Button variant="solid" colorScheme="default">
              Submit
            </Button>
          </VStack>
        </Center>
        <Box>
          <Link to="/register">Don't have account?</Link>
        </Box>
      </VStack>
    </AuthLayout>
  );
};

export default LoginPage;
