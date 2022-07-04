import { useEffect } from 'react';
import {
  Box,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Input,
  VStack,
  Button,
  useToast,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import AuthLayout from '../../components/Layout/AuthLayout';
import { registerUser } from '../../apis/auth';

const RegisterPage = () => {
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
      if (data.password != data.confirm_password) {
        setError('confirm_password', {
          message: 'Passwords does not match',
        });
      } else {
        await registerUser(data);
        navigate('/login');
        toast({
          title: 'Registration successful.',
          status: 'success',
          position: 'top-right',
          isClosable: true,
        });
      }
    } catch (error) {
      if (error.response.status != 422) {
        toast({
          title: 'Something went wrong',
          position: 'top-right',
          isClosable: true,
          status: 'error',
        });
      } else {
        error.response.data.forEach((err) => {
          setError(err.context.key, { message: err.message });
        });
      }
    }
  };
  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({
        email: '',
        password: '',
        confirm_password: '',
        name: '',
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
          <VStack w="100%" p={4} as="form" onSubmit={handleSubmit(onSubmit)}>
            <Box>
              <Heading>Register</Heading>
            </Box>
            <FormControl isInvalid={errors.name}>
              <FormLabel htmlFor="name">Name</FormLabel>
              <Input
                id="name"
                type="name"
                placeholder="Enter your full name"
                isInvalid={errors.name}
                focusBorderColor="default.400"
                errorBorderColor="danger.400"
                {...register('name', {
                  required: 'This is required',
                  minLength: {
                    value: 4,
                    message: 'Minimum length should be 4',
                  },
                })}
              />
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.email}>
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
            <FormControl isInvalid={errors.password}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                id="password"
                type="password"
                placeholder="Enter a secure password"
                isInvalid={errors.password}
                focusBorderColor="default.400"
                errorBorderColor="danger.400"
                {...register('password', {
                  required: 'This is required',
                  minLength: {
                    value: 8,
                    message: 'Minimum length should be 8',
                  },
                })}
              />
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.confirm_password}>
              <FormLabel htmlFor="confirm_password">Confirm Password</FormLabel>
              <Input
                id="confirm_password"
                type="password"
                placeholder="Enter your password again"
                isInvalid={errors.confirm_password}
                focusBorderColor="default.400"
                errorBorderColor="danger.400"
                {...register('confirm_password', {
                  required: 'This is required',
                  minLength: {
                    value: 8,
                    message: 'Minimum length should be 8',
                  },
                })}
              />
              <FormErrorMessage>
                {errors.confirm_password && errors.confirm_password.message}
              </FormErrorMessage>
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
          <Link to="/login">Already have account?</Link>
        </HStack>
      </VStack>
    </AuthLayout>
  );
};

export default RegisterPage;
