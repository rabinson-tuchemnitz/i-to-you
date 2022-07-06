import { useState } from 'react';
import {
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
  useToast,
  Box,
  IconButton,
  HStack,
} from '@chakra-ui/react';
import { Dropzone, FileItem } from '@dropzone-ui/react';
import { bytesToSize, getFileDetailUrl } from '../../utils/helper';
import CopyToClipboard from 'react-copy-to-clipboard';
import { IoCopyOutline, IoEyeOutline } from 'react-icons/io5';

const DragBox = () => {
  const toast = useToast();

  const uploadUrl = process.env.REACT_APP_API_URL + '/files/upload';

  const [files, setFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const updateFiles = (incommingFiles) => {
    setFiles(incommingFiles);
  };

  const handleUploadFinish = (response) => {
    setUploadedFiles(response);
  };
  const handleDelete = (id) => {
    setFiles(files.filter((x) => x.id !== id));
  };
  const handleCopyLink = () => {
    toast({
      title: 'Download link copied!',
      status: 'info',
      position: 'top-right',
      isClosable: true,
    });
  };
  return (
    <VStack>
      <Dropzone
        onChange={updateFiles}
        value={files}
        onUploadFinish={handleUploadFinish}
        label={'Drop Files here or click to browse'}
        minHeight={'195px'}
        maxHeight={'500px'}
        footer={false}
        url={uploadUrl}
        method={'POST'}
        config={{
          headers: {
            // Authorization: 'Bearer YOUR_BEARER_TOKEN_GOES_HERE',
            'content-type': 'multipart/form-data',
          },
        }}
        color={'#88C0D0'}
        disableScroll>
        {files.map((file) => (
          <FileItem
            {...file}
            key={file.id}
            onDelete={handleDelete}
            preview
            resultOnTooltip
          />
        ))}
      </Dropzone>
      <br />
      <TableContainer
        w="100%"
        borderRadius="12px"
        border="1px solid #ECEFF4;"
        boxShadow="4px 4px 25px rgba(236, 239, 244, 0.75)">
        <Table colorScheme="default">
          <Thead>
            <Tr>
              <Th>S.No</Th>
              <Th>Name</Th>
              <Th>Type</Th>
              <Th>Size</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {uploadedFiles.map((item, index) => {
              const response = item.serverResponse.payload.uploaded_files[0];
              return (
                <Tr>
                  <Td>
                    <Text>{index + 1}</Text>
                  </Td>
                  <Td>
                    <Text>{response.name}</Text>
                  </Td>
                  <Td>
                    <Text>{response.type}</Text>
                  </Td>
                  <Td>
                    <Text>{bytesToSize(response.size_in_bytes)}</Text>
                  </Td>
                  <Td>
                    <HStack w="100%">
                      <CopyToClipboard
                        onCopy={handleCopyLink}
                        text={getFileDetailUrl(response.id)}>
                        <Button
                          leftIcon={<IoCopyOutline />}
                          colorScheme="primary"
                          variant="solid">
                          Copy Link
                        </Button>
                      </CopyToClipboard>
                    </HStack>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </VStack>
  );
};

export default DragBox;
