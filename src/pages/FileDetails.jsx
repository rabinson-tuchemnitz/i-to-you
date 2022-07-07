import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Center,
  Container,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Spinner,
  Textarea,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { downloadFile, getFileDetail, requestFileChange } from '../apis/file';
import FileProperties from '../components/File/FileProperties';
import MainLayout from '../components/Layout/MainLayout';
import Error404 from '../components/Error/Error404';
import { authUserInfo, isAuthenticated } from '../utils/jwt';
import CopyToClipboard from 'react-copy-to-clipboard';
import { getFileDetailUrl } from '../utils/helper';
import FileDownload from 'js-file-download';

const FileDetails = () => {
  const { file_id } = useParams();
  const toast = useToast();
  const [file, setFile] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isFound, setIsFound] = useState(false);
  const isBlocked = false;
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
          if (err.response.status == 409) {
            toast({
              title: err.response.data.message,
              status: 'warning',
              position: 'top-right',
              isClosable: true,
            });
          } else {
            toast({
              title: 'Something went wrong',
              status: 'error',
              position: 'top-right',
              isClosable: true,
            });
          }
        })
        .finally(() => {});
    } catch (err) {
      console.log(err);
    }
  };

  const handleCopyLink = () => {
    toast({
      title: 'Download link copied!',
      status: 'info',
      position: 'top-right',
      isClosable: true,
    });
  };

  const handleDownload = async (downloadUrl, fileName) => {
    try {
      const response = await downloadFile(downloadUrl);
      FileDownload(response.data, fileName);
      toast({
        title: 'Download has started',
        status: 'success',
        position: 'top-right',
        isClosable: true,
      });
    } catch (err) {
      console.log(err);
      if (err.response.status == 403) {
        toast({
          title: err.response.data.message,
          status: 'warning',
          position: 'top-right',
          isClosable: true,
        });
      } else {
        toast({
          title: 'Failed to download',
          status: 'error',
          position: 'top-right',
          isClosable: true,
        });
      }
    }
  };

  useEffect(() => {
    try {
      getFileDetail(file_id)
        .then((response) => {
          setFile(response.data.data);
          setIsFound(true);
        })
        .catch((error) => {
          if (error.response.status == 404) {
            setIsFound(false);
          } else {
            toast({
              title: 'Something went wrong',
              status: 'error',
              position: 'top-right',
              isClosable: true,
            });
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    } catch (err) {}
  }, []);

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({
        reason: '',
      });
    }
  }, [formState, reset]);

  return (
    <MainLayout>
      <Container
        maxW="4xl"
        h="100%"
        border="1px solid"
        borderColor="light.400"
        borderRadius="12px"
        boxShadow="4px 4px 15px rgba(236, 239, 244, 1)"
        p={3}>
        {isFound && !isLoading && (
          <Flex flexDir="column" p={2}>
            <Heading as="h3" size="md">
              {file.name}
            </Heading>
            <Divider m={2} />
            <Flex flexWrap="wrap">
              <Box flexGrow={1} m={2}>
                <VStack>
                  <Box alignSelf="flex-start">
                    <Heading size="md">Properties</Heading>
                    <br />
                    <FileProperties file={file} />
                  </Box>
                  <br />
                  <VStack alignSelf={'flex-start'} minW="14rem">
                    <Button
                      onClick={() =>
                        handleDownload(file.download_path, file.name)
                      }
                      isDisabled={file.status == 'blocked'}
                      size="sm"
                      variant="solid"
                      colorScheme="secondary"
                      w="100%">
                      Download
                    </Button>

                    <CopyToClipboard
                      onCopy={handleCopyLink}
                      text={getFileDetailUrl(file.id)}>
                      <Button
                        size="sm"
                        variant="solid"
                        colorScheme="primary"
                        w="100%">
                        Copy Link
                      </Button>
                    </CopyToClipboard>
                  </VStack>
                </VStack>
              </Box>
              {isAuthenticated() && authUserInfo().role == 'admin' ? null : (
                <Box flexGrow={1.75} m={2}>
                  <VStack as="form" onSubmit={handleSubmit(onSubmit)}>
                    <Box alignSelf="flex-start" w="100%">
                      <Heading size="md">
                        Request to{' '}
                        {file.status == 'blocked' ? 'unblock' : 'block'}
                      </Heading>
                      <br />
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
                            value={
                              file.status == 'blocked' ? 'unblocked' : 'blocked'
                            }
                            hidden={true}
                            {...register('action')}
                          />
                        </FormControl>
                      </VStack>
                      <Box>
                        <Button
                          float="right"
                          type="submit"
                          isLoading={isSubmitting}
                          variant="solid"
                          colorScheme={
                            file.status == 'blocked' ? 'success' : 'danger'
                          }>
                          {file.status == 'blocked' ? 'Unblock' : 'Block'}
                        </Button>
                      </Box>
                    </Box>
                  </VStack>
                </Box>
              )}
            </Flex>
          </Flex>
        )}
        {!isFound && !isLoading && (
          <Center w="100%" h="100%">
            <Error404 />
          </Center>
        )}
        {isLoading && (
          <Center w="100%" h="100%">
            <Spinner />
          </Center>
        )}
      </Container>
    </MainLayout>
  );
};

export default FileDetails;
