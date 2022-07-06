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
import { getFileDetailUrl } from '../../utils/helper';
import FileDownload from 'js-file-download';
import { deleteFile, downloadFile } from '../../apis/file';

const DetailBox = ({ file, handleRefreshFile }) => {
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
      toast({
        title: 'Failed to download',
        status: 'error',
        position: 'top-right',
        isClosable: true,
      });
    }
  };

  const handleDeleteFile = async (fileId) => {
    try {
      await deleteFile(fileId);
      handleRefreshFile();
      toast({
        title: 'File deleted successfully.',
        status: 'success',
        position: 'top-right',
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: 'Failed to delete file',
        status: 'error',
        position: 'top-right',
        isClosable: true,
      });
    }
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
                  text={getFileDetailUrl(file.id)}>
                  <Button
                    size="sm"
                    variant="solid"
                    colorScheme="primary"
                    w="100%">
                    Copy Link
                  </Button>
                </CopyToClipboard>

                <Button
                  onClick={() => handleDownload(file.download_url, file.name)}
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
              <Text fontWeight="bold">Actions</Text>
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
                <Button
                  onClick={() => handleDeleteFile(file.id)}
                  size="sm"
                  variant="solid"
                  colorScheme="warning"
                  w="100%">
                  Delete
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
