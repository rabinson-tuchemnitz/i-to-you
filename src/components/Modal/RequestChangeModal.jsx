import { useEffect } from 'react';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { requestFileChange } from '../../apis/file';
import { authUserInfo, isAuthenticated } from '../../utils/jwt';

const RequestChangeModal = ({ isOpen, onClose, file }) => {
  const isBlocked = file && file.status == 'blocked';
  const toast = useToast();
  const {
    handleSubmit,
    register,
    setError,
    reset,
    formState,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (data) => {
    try {
      requestFileChange(file.id, data)
        .then((response) => {
          toast({
            title: 'File change requested successfully',
            status: 'success',
            position: 'top-right',
            isClosable: true,
          });
        })
        .catch((err) => {
          var message = 'Something went wrong.';
          var status = 'error';
          if (err.response.status === 409) {
            message = err.response.data.message;
            status = 'warning';
          }
          toast({
            title: message,
            status: status,
            position: 'top-right',
            isClosable: true,
          });
        })
        .finally(() => {
          onClose();
        });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({
        reason: '',
      });
    }
  }, [formState, reset]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={['sm', 'md', 'lg', 'xl']}>
      <ModalOverlay />
      <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader>Request to {isBlocked ? 'unblock' : 'block'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack w="100%">
            <FormControl>
              <FormLabel htmlFor="name">Name</FormLabel>
              {isAuthenticated() ? (
                <Input
                  readOnly={true}
                  value={authUserInfo().name}
                  {...register('name', {
                    required: 'This is requried',
                  })}
                />
              ) : (
                <>
                  <Input
                    id="name"
                    type="string"
                    placeholder="Enter your name"
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
                    {errors.name && errors.email.name}
                  </FormErrorMessage>
                </>
              )}
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              {isAuthenticated() ? (
                <Input
                  readOnly={true}
                  value={authUserInfo().email}
                  {...register('email', {
                    required: 'This is requried',
                  })}
                />
              ) : (
                <>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    isInvalid={errors.email}
                    focusBorderColor="default.400"
                    errorBorderColor="danger.400"
                    isDisabled={isAuthenticated()}
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
                </>
              )}
            </FormControl>
            <FormControl isInvalid={errors.reason}>
              <FormLabel htmlFor="reason">Reason</FormLabel>
              <Textarea
                id="reason"
                size="md"
                rows={6}
                isInvalid={errors.reason}
                placeholder="Reason for the request"
                {...register('reason', {
                  required: 'This is required',
                  minLength: {
                    value: 15,
                    message: 'Minimum length should be 15',
                  },
                })}
              />
              <FormErrorMessage>
                {errors.reason && errors.reason.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl>
              <Input
                value={file.status == 'blocked' ? 'unblocked' : 'blocked'}
                hidden={true}
                {...register('action')}
              />
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="default" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button
            type="submit"
            isLoading={isSubmitting}
            variant="solid"
            colorScheme={isBlocked ? 'success' : 'danger'}>
            {isBlocked ? 'Unblock' : 'Block'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RequestChangeModal;
