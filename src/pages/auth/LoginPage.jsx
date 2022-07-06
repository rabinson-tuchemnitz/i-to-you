import { useEffect } from 'react';
import {
  Box,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  FormHelperText,
  Heading,
  HStack,
  Input,
  VStack,
  Button,
  useToast,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../apis/auth';
import { useForm } from 'react-hook-form';

import AuthLayout from '../../components/Layout/AuthLayout';
import { removeItem, setItem } from '../../utils/storage';

const LoginPage = () => {
  let navigate = useNavigate();
  const toast = useToast();

  const {
    handleSubmit,
    register,
    setError,
    reset,
    formState,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data);
      removeItem('token');
      setItem('token', response.data.token);
      navigate('/');
      toast({
        title: 'Logged in successfully',
        status: 'success',
        position: 'top-right',
        isClosable: true,
      });
    } catch (error) {
      if (error.response.status == 404) {
        setError(
          'email',
          { type: 'focus', message: 'Invalid email or password' },
          { shouldFocus: true },
        );
        setError('password');
      }
      toast({
        title: error.response.data.message,
        position: 'top-right',
        isClosable: true,
        status: 'error',
      });
    }
  };

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({
        email: '',
        password: '',
      });
    }
  }, [formState, reset]);

  return (
    <AuthLayout>
      <VStack>
        <Center
          borderRadius={10}
          border="1px solid"
          borderColor="default.500"
          boxShadow="4px rgba(23 6, 239,244, 0.75)"
          minW={['22rem', '25rem']}>
          <VStack as="form" w="100%" p={4} onSubmit={handleSubmit(onSubmit)}>
            <Box>
              <Heading>Login</Heading>
            </Box>
            <FormControl isInvalid={errors.email || errors.password}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                isInvalid={errors.email}
                focusBorderColor="default.400"
                errorBorderColor="danger.400"
                {...register('email', {
                  required: 'This is required',
                  minLength: {
                    value: 4,
                    message: 'Minimum length should be 4',
                  },
                })}
              />
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                isInvalid={errors.password}
                focusBorderColor="default.400"
                errorBorderColor="danger.400"
                {...register('password', {
                  required: 'This is required',
                  minLength: {
                    value: 4,
                    message: 'Minimum length should be 4',
                  },
                })}
              />
            </FormControl>
            <br />
            <Button
              variant="solid"
              colorScheme="default"
              isLoading={isSubmitting}
              type="submit">
              Submit
            </Button>
          </VStack>
        </Center>
        <HStack spacing={10}>
          <Link to="/">Back to Transfer</Link>
          <Link to="/register">Don't have account?</Link>
        </HStack>
      </VStack>
    </AuthLayout>
  );
};

export default LoginPage;
