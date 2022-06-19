import {
  Badge,
  Button,
  Flex,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';

const DetailBox = ({ file }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isBlocked = file && file.status == 'blocked';

  return (
    <Flex
      minW="19rem"
      maxW="22rem"
      p={4}
      display={['none', 'none', 'flex', 'flex']}
      h="100%"
      flexGrow={1}
      border="1px solid"
      borderColor="light.400"
      borderRadius="12px"
      boxShadow="4px 4px 15px rgba(236, 239, 244, 1)">
      {file ? (
        <Flex flexDir="column" w="100%">
          <Heading as="h2" size="md">
            {file?.name}
          </Heading>
          <VStack p={2}>
            {/* File Properties */}
            <Flex flexDir="column" w="100%">
              <Text fontWeight="bold">Properties</Text>
              <HStack m={2}>
                <Flex flexDir="column">
                  <Text>Type</Text>
                  <Text>Size</Text>
                  <Text>Status</Text>
                  <Text>Uploaded</Text>
                </Flex>
                <Flex flexDir="column">
                  <Text>{file?.type}</Text>
                  <Text>{file?.size}</Text>
                  <Text>
                    {isBlocked ? (
                      <Badge bgColor="danger.500" color="white">
                        Blocked
                      </Badge>
                    ) : (
                      <Badge bgColor="success.500" color="white">
                        Unblocked
                      </Badge>
                    )}
                  </Text>
                  <Text>Uploaded</Text>
                </Flex>
              </HStack>
            </Flex>

            <br />

            {/* Transfer Actions */}
            <Flex flexDir="column" w="100%">
              <Text fontWeight="bold">Transfer</Text>
              <VStack m={2}>
                <Button
                  size="sm"
                  variant="solid"
                  colorScheme="primary"
                  w="100%">
                  Copy Link
                </Button>
                <Button
                  size="sm"
                  variant="solid"
                  colorScheme="secondary"
                  w="100%">
                  Download
                </Button>
              </VStack>
            </Flex>

            <br />

            {/* Transfer Actions */}
            <Flex flexDir="column" w="100%">
              <Text fontWeight="bold">Request</Text>
              <VStack m={2}>
                {/* <Textarea isInvalid placeholder="Proper reason for request" /> */}
                <Button
                  size="sm"
                  variant="solid"
                  colorScheme={isBlocked ? 'success' : 'danger'}
                  w="100%"
                  onClick={onOpen}
                  onClose={onClose}>
                  {isBlocked ? 'Request to Unblock' : 'Request to Block'}
                </Button>

                {/* Form to request blocking or unblocking */}
                <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>
                      Request to {isBlocked ? 'unblock' : 'block'}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <Textarea
                        size="md"
                        placeholder="Reason for the request"
                      />
                    </ModalBody>

                    <ModalFooter>
                      <Button colorScheme="default" mr={3} onClick={onClose}>
                        Close
                      </Button>
                      <Button
                        variant="solid"
                        colorScheme={isBlocked ? 'success' : 'danger'}>
                        {isBlocked ? 'Unblock' : 'Block'}
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </VStack>
            </Flex>
          </VStack>
        </Flex>
      ) : (
        <Flex justifyContent="center" alignItems="center" h="100%" w="100%">
          <Text>No file selected</Text>
        </Flex>
      )}
      {/* {file ? <Flex></Flex> : } */}
    </Flex>
  );
};

export default DetailBox;
