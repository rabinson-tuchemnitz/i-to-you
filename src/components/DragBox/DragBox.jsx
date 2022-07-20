import { useState } from 'react';
import {
  Button,
  Flex,
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
  HStack,
  Box,
  Container,
} from '@chakra-ui/react';
import { Dropzone, FileItem } from '@dropzone-ui/react';
import { bytesToSize, getFileDetailUrl } from '../../utils/helper';
import CopyToClipboard from 'react-copy-to-clipboard';
import { IoCopyOutline, IoEyeOutline } from 'react-icons/io5';
import { isAuthenticated } from '../../utils/jwt';
import { getItem } from '../../utils/storage';
import { uploadFile } from '../../apis/file';
import axios from 'axios';

const DragBox = () => {
  const toast = useToast();

  const uploadUrl = process.env.REACT_APP_API_URL + '/files/upload';

  const [files, setFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const updateFiles = (incommingFiles) => {
    setFiles(incommingFiles);
  };

  const handleUploadFile = async () => {
    const formData = new FormData();

    for (const file of files) {
      if (file.valid) {
        formData.append('file', file.file);
      }
    }

    try {
      const response = await uploadFile(formData);
      console.log(response);
      const upfiles = response.data.payload.uploaded_files;
      setUploadedFiles([...upfiles]);
    } catch (err) {
      console.log(err);
      if (err.response.status > 400 && err.response.status < 500) {
        toast({
          title: 'Check your reqeust',
          status: 'error',
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
    }
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

  // if (isAuthenticated()) {
  //   headers['Authorization'] = 'Bearer ' + getItem('token');
  // }
  return (
    <VStack>
      <Flex style={{ position: 'relative', width: '100%' }}>
        <Dropzone
          onUploadStart={handleUploadFile}
          onChange={updateFiles}
          value={files}
          label={'Drop Files here or click to browse'}
          minHeight={'195px'}
          maxHeight={'500px'}
          footer={false}
          url={uploadUrl}
          method={'GET'}
          maxFileSize={10485760}
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
      </Flex>
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
              console.log(item);
              return (
                <Tr key={item.id}>
                  <Td>
                    <Text>{index + 1}</Text>
                  </Td>
                  <Td>
                    <Text>{item.name}</Text>
                  </Td>
                  <Td>
                    <Text>{item.type}</Text>
                  </Td>
                  <Td>
                    <Text>{bytesToSize(item.size_in_bytes)}</Text>
                  </Td>
                  <Td>
                    <HStack w="100%">
                      <CopyToClipboard
                        onCopy={handleCopyLink}
                        text={getFileDetailUrl(item.id)}>
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
