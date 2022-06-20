import {
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
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
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import MainLayout from '../components/Layout/MainLayout';
import ConfirmationModal from '../components/Modal/ConfirmationModal';

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
      owner: [],
      users: ['This file is corrupted', 'Another reason to block'],
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
      owner: [],
      users: ['This file is corrupted', 'Another reason to block'],
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
      owner: ['I want to unblock is asap'],
      users: ['This file is corrupted', 'Another reason to block'],
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
      owner: ['I want to block is please'],
      users: ['This file is corrupted', 'Another reason to block'],
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

  const [currentRequest, setCurrentRequest] = useState({});

  const handleConfirmationAction = (id, type) => {
    console.log(id, type);
  };

  const handleOnActionBtnClicked = (request) => {
    setCurrentRequest(request);
    onConfirmationOpen();
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
            {requests.map((request) => {
              return (
                <VStack border="1px solid" borderColor="default" p={3}>
                  <Heading size="md">{request.name}</Heading>
                  <Text>Type: {request.type}</Text>
                  <Text>Size: {request.size}</Text>
                  <HStack w="100%">
                    <Button
                      onClick={onReasonsOpen}
                      size="sm"
                      w="100%"
                      colorScheme="default">
                      View (
                      {request.reasons.owner.length +
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
                {requests.map((request, index) => {
                  return (
                    <Tr key={request.id}>
                      <Td>{index + 1}</Td>
                      <Td>{request.name}</Td>
                      <Td>{request.type}</Td>
                      <Td>{request.size}</Td>
                      <Td>
                        <HStack w="100%">
                          <Button
                            onClick={onReasonsOpen}
                            size="sm"
                            w="100%"
                            colorScheme="default">
                            View (
                            {request.reasons.owner.length +
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
          <Modal
            closeOnOverlayClick={false}
            isOpen={isReasonsOpen}
            onClose={onReasonsClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Reasons for request</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>These are reasons</ModalBody>
            </ModalContent>
          </Modal>
        </Flex>
      </Flex>
    </MainLayout>
  );
};

export default PendingRequests;
