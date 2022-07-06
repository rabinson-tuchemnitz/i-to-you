import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Badge,
  Box,
  FormControl,
  FormLabel,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from '@chakra-ui/react';

const RequestReasonModal = ({ reasons, isReasonsOpen, onReasonsClose }) => {
  return (
    <Modal
      size={['lg', 'xl', '2xl']}
      closeOnOverlayClick={false}
      isOpen={isReasonsOpen}
      onClose={onReasonsClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Reasons for request</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Accordion defaultIndex={[0]}>
            {reasons?.owner.length > 0 && (
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      <HStack>
                        <Text>{reasons.owner.createdAt}</Text>
                        <Badge bgColor="secondary.500" color="white">
                          User
                        </Badge>
                      </HStack>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <VStack>
                    <FormControl>
                      <FormLabel>Name: {reasons.owner.name}</FormLabel>
                      <FormLabel>Email: {reasons.owner.email}</FormLabel>
                    </FormControl>
                    <FormControl>
                      <FormLabel>Reason</FormLabel>
                      <Text>{reasons.owner.reason}</Text>
                    </FormControl>
                  </VStack>
                </AccordionPanel>
              </AccordionItem>
            )}
            {reasons?.users.map((userRequest) => {
              return (
                <AccordionItem key={userRequest._id}>
                  <h2>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        <HStack>
                          <Text>{userRequest.createdAt}</Text>
                          <Badge bgColor="secondary.500" color="white">
                            User
                          </Badge>
                        </HStack>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <VStack>
                      <FormControl>
                        <FormLabel>Name: {userRequest.name}</FormLabel>
                        <FormLabel>Email: {userRequest.email}</FormLabel>
                      </FormControl>
                      <FormControl>
                        <FormLabel>Reason</FormLabel>
                        <Text>{userRequest.reason}</Text>
                      </FormControl>
                    </VStack>
                  </AccordionPanel>
                </AccordionItem>
              );
            })}
          </Accordion>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default RequestReasonModal;
