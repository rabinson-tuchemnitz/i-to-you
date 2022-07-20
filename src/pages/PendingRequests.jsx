import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  IconButton,
  SimpleGrid,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import {
  acceptPendingRequests,
  checkStatus,
  getPendingRequests,
  rejectPendingRequests,
} from '../apis/file';
import MainLayout from '../components/Layout/MainLayout';
import ConfirmationModal from '../components/Modal/ConfirmationModal';
import RequestReasonModal from '../components/Modal/RequestReasonModal';
import { bytesToSize } from '../utils/helper';
import { IoTrashOutline, IoShieldCheckmark } from 'react-icons/io5';

const requests = [
  {
    id: 1,
    name: 'Sample file 1',
    type: '.png',
    size: '1 MB',
    action_to: 'block',
    status: 'unblocked',
    uploaded_at: '22 May 2022',
    reasons: {
      owner: null,
      users: [
        {
          id: 1,
          requested_date: '02 Jul 1999',
          body: 'The bad reason',
        },
        {
          id: 2,
          requested_date: '12 Apr 2000',
          body: 'So not good.',
        },
      ],
    },
  },
  {
    id: 2,
    name: 'Sample file 2',
    type: '.txt',
    size: '1.2 MB',
    action_to: 'unblock',
    status: 'blocked',
    uploaded_at: '22 May 2022',
    reasons: {
      owner: {
        requested_date: '01 Jun 2022',
        body: 'I want my file to be blocked instantly.',
      },
      users: [
        {
          id: 3,
          requested_date: '02 Jul 2021',
          body: 'This file seems to be bad',
        },
        {
          id: 4,
          requested_date: '12 Apr 2021',
          body: 'Copyright Issue',
        },
      ],
    },
  },
  {
    id: 3,
    name: 'Sample file 3',
    type: '.jpeg',
    size: '8 MB',
    action_to: 'unblock',
    status: 'blocked',
    uploaded_at: '22 May 2022',
    reasons: {
      owner: {
        requested_date: '13 Feb 2021',
        body: 'I want my file to be blocked instantly.',
      },
      users: [
        {
          id: 5,
          requested_date: '12 Jul 2021',
          body: 'This file seems to be bad',
        },
        {
          id: 6,
          requested_date: '15 Apr 2021',
          body: 'Copyright Issue',
        },
      ],
    },
  },
  {
    id: 4,
    name: 'Sample file 3',
    type: '.csv',
    size: '5 MB',
    action_to: 'block',
    status: 'unblocked',
    uploaded_at: '22 May 2022',
    reasons: {
      owner: null,
      users: [
        {
          id: 7,
          requested_date: '02 Jul 2021',
          body: 'This file seems to be bad',
        },
        {
          id: 8,
          requested_date: '12 Apr 2021',
          body: 'Copyright Issue',
        },
      ],
    },
  },
];

const PendingRequests = () => {
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();
  const [isActionLoading, setIsActionLoading] = useState(false);

  const {
    isOpen: isConfirmationOpen,
    onOpen: onConfirmationOpen,
    onClose: onConfirmationClose,
  } = useDisclosure();

  const {
    isOpen: isReasonsOpen,
    onOpen: onReasonsOpen,
    onClose: onReasonsClose,
  } = useDisclosure();
  const [pendingRequests, setPendingRequest] = useState();
  const [currentRequest, setCurrentRequest] = useState({});

  const handleConfirmationAction = async (id, currentStatus) => {
    try {
      setIsActionLoading(true);
      const response = await acceptPendingRequests(id, {
        status: currentStatus == 'blocked' ? 'unblocked' : 'blocked',
      });
      //Show the toast message
      const toastTitle =
        currentStatus === 'blocked'
          ? 'File unblocked successfully'
          : 'File blocked successfully';

      // // Update the state
      const newPendingRequests = pendingRequests.filter(
        (data) => data._id != id,
      );

      setPendingRequest(newPendingRequests);
      toast({
        title: toastTitle,
        position: 'top-right',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: 'Failed to accept the request',
        status: 'error',
        position: 'top-right',
        duration: 3000,
        isClosable: true,
      });
    }
    setIsActionLoading(false);
    // //Close the modal
    onConfirmationClose();
  };

  const handleCancelRequest = async (fileId) => {
    setIsActionLoading(true);
    try {
      await rejectPendingRequests(fileId);
      toast({
        title: 'Pending request deleted successfully.',
        status: 'success',
        position: 'top-right',
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: 'Something went wrong',
        status: 'error',
        position: 'top-right',
        isClosable: true,
      });
    }
    setIsActionLoading(false);
  };
  const handleOnActionBtnClicked = (request) => {
    setCurrentRequest(request);
    onConfirmationOpen();
  };

  const handleCheckStatus = async (fileId) => {
    setIsActionLoading(true);
    try {
      const response = await checkStatus(fileId);
      toast({
        title: response.data.message,
        position: 'top-right',
        status: 'info',
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: 'Something went wrong.',
        position: 'top-right',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
    setIsActionLoading(false);
  };
  const handleViewBtnClicked = (request) => {
    setCurrentRequest(request);
    onReasonsOpen();
  };

  useEffect(() => {
    try {
      getPendingRequests()
        .then((response) => {
          setPendingRequest(response.data.data);
        })
        .catch((err) => {
          toast({
            title: 'Something went wrong',
            position: 'top-right',
            isClosable: true,
            status: 'error',
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    } catch (err) {
      toast({
        title: 'Something went wrong',
        status: 'error',
        position: 'top-right',
        isClosable: true,
      });
    }
  }, []);

  return (
    <MainLayout>
      <Flex
        h="100%"
        flexGrow={3}
        border="1px solid"
        borderColor="light.400"
        borderRadius="12px"
        boxShadow="4px 4px 15px rgba(236, 239, 244, 1)"
        p={3}>
        {isLoading && <Spinner />}
        {!isLoading && (
          <Flex flexDir="column" w="100%" p={2}>
            <Box display="flex" justifyContent={'space-between'}>
              <Heading as="h2" size="md">
                Pending Requests
              </Heading>
              {isActionLoading && <Spinner />}
            </Box>

            <Divider mb={2} />

            {/* For Mobile View */}
            <SimpleGrid
              columns={[1, 2]}
              spacing={5}
              display={['grid', 'grid', 'none']}>
              {pendingRequests.map((request) => {
                return (
                  <VStack
                    key={request._id}
                    order="1px solid"
                    borderColor="default"
                    p={3}>
                    <Heading size="md">{request.name}</Heading>
                    <Text>Type: {request.type}</Text>
                    <Text>Size: {bytesToSize(request.size_in_bytes)}</Text>
                    <HStack w="100%">
                      <Button
                        onClick={() => handleViewBtnClicked(request)}
                        size="sm"
                        w="100%"
                        colorScheme="default">
                        View (
                        {(request.reasons.owner ? 1 : 0) +
                          request.reasons.users.length}
                        )
                      </Button>
                      <Button
                        onClick={() => handleOnActionBtnClicked(request)}
                        size="sm"
                        variant="solid"
                        colorScheme={
                          request.status == 'unblocked' ? 'danger' : 'success'
                        }
                        w="100%">
                        {request.status == 'unblocked' ? 'Block' : 'Unblock'}
                      </Button>
                      <IconButton
                        onClick={() => handleCancelRequest(request._id)}
                        colorScheme="warning"
                        aria-label="Search database"
                        icon={<IoTrashOutline />}
                      />
                      <IconButton
                        onClick={() => handleCheckStatus(request._id)}
                        colorScheme="default"
                        aria-label="Search database"
                        icon={<IoShieldCheckmark />}
                      />
                    </HStack>
                  </VStack>
                );
              })}
            </SimpleGrid>

            {/* For Desktop View */}
            <TableContainer display={['none', 'none', 'flex']}>
              <Table variant="striped" colorScheme="default">
                <Thead>
                  <Tr>
                    <Th>S.No</Th>
                    <Th>Name</Th>
                    <Th>Type</Th>
                    <Th>Size</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {pendingRequests.map((request, index) => {
                    return (
                      <Tr key={request._id}>
                        <Td>{index + 1}</Td>
                        <Td>{request.name}</Td>
                        <Td>{request.type}</Td>
                        <Td>{bytesToSize(request.size_in_bytes)}</Td>
                        <Td>
                          <HStack w="100%">
                            <Button
                              onClick={() => handleViewBtnClicked(request)}
                              size="sm"
                              w="100%"
                              colorScheme="default">
                              View (
                              {(request.reasons.owner ? 1 : 0) +
                                request.reasons.users.length}
                              )
                            </Button>
                            <Button
                              onClick={() => handleOnActionBtnClicked(request)}
                              size="sm"
                              variant="solid"
                              colorScheme={
                                request.status == 'unblocked'
                                  ? 'danger'
                                  : 'success'
                              }
                              w="100%">
                              {request.status == 'unblocked'
                                ? 'Block'
                                : 'Unblock'}
                            </Button>
                            <IconButton
                              onClick={() => handleCancelRequest(request._id)}
                              colorScheme="warning"
                              aria-label="Search database"
                              icon={<IoTrashOutline />}
                            />
                            <IconButton
                              onClick={() => handleCheckStatus(request._id)}
                              colorScheme="default"
                              aria-label="Search database"
                              icon={<IoShieldCheckmark />}
                            />
                          </HStack>
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>

            {/* Alert confirmation modal */}
            <ConfirmationModal
              isOpen={isConfirmationOpen}
              onClose={onConfirmationClose}
              file={currentRequest}
              handleConfirmationAction={handleConfirmationAction}
            />

            {/* Reasons List modal */}
            {currentRequest && (
              <RequestReasonModal
                reasons={currentRequest.reasons}
                isReasonsOpen={isReasonsOpen}
                onReasonsClose={onReasonsClose}
              />
            )}
          </Flex>
        )}
      </Flex>
    </MainLayout>
  );
};

export default PendingRequests;
