import {
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
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
import { useState } from 'react';
import MainLayout from '../components/Layout/MainLayout';
import ConfirmationModal from '../components/Modal/ConfirmationModal';
import RequestReasonModal from '../components/Modal/RequestReasonModal';

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
  const [pendingRequests, setPendingRequest] = useState(requests);
  const [currentRequest, setCurrentRequest] = useState({});
  const toast = useToast();

  const handleConfirmationAction = (id, updatedStatus) => {
    console.log(pendingRequests);
    // // Update the state
    const newPendingRequests = pendingRequests.filter((data) => data.id != id);
    setPendingRequest(newPendingRequests);
    // //Close the modal
    onConfirmationClose();

    //Show the toast message
    const toastTitle =
      updatedStatus === 'blocked'
        ? 'File unblocked successfully'
        : 'File blocked successfully';

    toast({
      title: toastTitle,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleOnActionBtnClicked = (request) => {
    setCurrentRequest(request);
    onConfirmationOpen();
  };

  const handleViewBtnClicked = (request) => {
    setCurrentRequest(request);
    onReasonsOpen();
  };

  return (
    <MainLayout>
      <Flex
        h="100%"
        flexGrow={3}
        border="1px solid"
        borderColor="light.400"
        borderRadius="12px"
        boxShadow="4px 4px 15px rgba(236, 239, 244, 1)"
        overflow="hidden"
        p={3}>
        <Flex flexDir="column" w="100%" p={2}>
          <Heading as="h2" size="md">
            Pending Requests
          </Heading>
          <Divider mb={2} />

          {/* For Mobile View */}
          <SimpleGrid
            columns={[1, 2]}
            spacing={5}
            display={['grid', 'grid', 'none']}>
            {pendingRequests.map((request) => {
              return (
                <VStack
                  key={request.id}
                  order="1px solid"
                  borderColor="default"
                  p={3}>
                  <Heading size="md">{request.name}</Heading>
                  <Text>Type: {request.type}</Text>
                  <Text>Size: {request.size}</Text>
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
                        request.action_to == 'block' ? 'danger' : 'success'
                      }
                      w="100%">
                      {request.action_to == 'block' ? 'Block' : 'Unblock'}
                    </Button>
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
                    <Tr key={request.id}>
                      <Td>{index + 1}</Td>
                      <Td>{request.name}</Td>
                      <Td>{request.type}</Td>
                      <Td>{request.size}</Td>
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
                              request.action_to == 'block'
                                ? 'danger'
                                : 'success'
                            }
                            w="100%">
                            {request.action_to == 'block' ? 'Block' : 'Unblock'}
                          </Button>
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
      </Flex>
    </MainLayout>
  );
};

export default PendingRequests;