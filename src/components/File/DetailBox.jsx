import {
  Button,
  Flex,
  Heading,
  Text,
  useDisclosure,
  VStack,
  useToast,
} from '@chakra-ui/react';
import FileProperties from './FileProperties';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import RequestChangeModal from '../Modal/RequestChangeModal';

const DetailBox = ({ file }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isBlocked = file && file.status == 'blocked';
  const toast = useToast();

  const handleCopyLink = () => {
    toast({
      title: 'Download link copied!',
      status: 'info',
      position: 'top-right',
      isClosable: true,
    });
  };

  return (
    <>
      {file ? (
        <Flex flexDir="column" w="100%">
          <Heading as="h2" size="md">
            {file?.name}
          </Heading>
          <VStack p={2}>
            {/* File Properties */}
            <Flex flexDir="column" w="100%">
              <Text fontWeight="bold">Properties</Text>
              <FileProperties file={file} />
            </Flex>
            <br />

            {/* Transfer Actions */}
            <Flex flexDir="column" w="100%">
              <Text fontWeight="bold">Transfer</Text>
              <VStack m={2}>
                <CopyToClipboard
                  onCopy={handleCopyLink}
                  text={file.download_url}>
                  <Button
                    size="sm"
                    variant="solid"
                    colorScheme="primary"
                    w="100%">
                    Copy Link
                  </Button>
                </CopyToClipboard>

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
                <RequestChangeModal
                  isOpen={isOpen}
                  onClose={onClose}
                  file={file}
                />
              </VStack>
            </Flex>
          </VStack>
        </Flex>
      ) : (
        <Flex justifyContent="center" alignItems="center" h="100%" w="100%">
          <Text>No file selected</Text>
        </Flex>
      )}
    </>
  );
};

export default DetailBox;
