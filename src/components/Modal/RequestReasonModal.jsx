import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Badge,
  Box,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';

const RequestReasonModal = ({ reasons, isReasonsOpen, onReasonsClose }) => {
  return (
    <Modal
      size={['sm', 'md', 'lg']}
      closeOnOverlayClick={false}
      isOpen={isReasonsOpen}
      onClose={onReasonsClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Reasons for request</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Accordion defaultIndex={[0]}>
            {reasons?.owner && (
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      <HStack>
                        <Text>{reasons.owner.requested_date}</Text>
                        <Badge bgColor="primary.500" color="white">
                          Owner
                        </Badge>
                      </HStack>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>{reasons.owner.body}</AccordionPanel>
              </AccordionItem>
            )}
            {reasons?.users.map((userRequest) => {
              return (
                <AccordionItem key={userRequest.id}>
                  <h2>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        <HStack>
                          <Text>{userRequest.requested_date}</Text>
                          <Badge bgColor="secondary.500" color="white">
                            User
                          </Badge>
                        </HStack>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>{userRequest.body}</AccordionPanel>
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
