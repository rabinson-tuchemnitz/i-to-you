import {
  Box,
  Center,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  VStack,
  Button,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import AuthLayout from '../../components/Layout/AuthLayout';

const RegisterPage = () => {
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
              <Heading>Register</Heading>
            </Box>
            <FormControl>
              <FormLabel htmlFor="name">Name</FormLabel>
              <Input
                id="name"
                type="name"
                placeholder="Enter your full name"
                isInvalid={false}
                focusBorderColor="default.400"
                errorBorderColor="danger.400"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                isInvalid={false}
                focusBorderColor="default.400"
                errorBorderColor="danger.400"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                id="password"
                type="password"
                placeholder="Enter a secure password"
                isInvalid={false}
                focusBorderColor="default.400"
                errorBorderColor="danger.400"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="confirm_password">Confirm Password</FormLabel>
              <Input
                id="confirm_password"
                type="confirm_password"
                placeholder="Enter your password again"
                isInvalid={false}
                focusBorderColor="default.400"
                errorBorderColor="danger.400"
              />
            </FormControl>
            <br />
            <Button variant="solid" colorScheme="default">
              Submit
            </Button>
          </VStack>
        </Center>
        <HStack spacing={10}>
          <Link to="/">Back to Transfer</Link>
          <Link to="/login">Already have account?</Link>
        </HStack>
      </VStack>
    </AuthLayout>
  );
};

export default RegisterPage;
