import { useState } from 'react';
import {
  Button,
  Center,
  Container,
  Flex,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Dropzone, FileItem } from '@dropzone-ui/react';

const DragBox = () => {
  const [files, setFiles] = useState([]);
  const updateFiles = (incommingFiles) => {
    console.log('incomming files', incommingFiles);
    setFiles(incommingFiles);
  };
  const handleDelete = (id) => {
    setFiles(files.filter((x) => x.id !== id));
  };

  return (
    // <Container maxW="5xl" p={4}>
    //   <VStack>
    //     <Center
    //       w="100%"
    //       border="3px dashed"
    //       borderColor="default.500"
    //       borderRadius="2rem"
    //       m={4}
    //       minH={['20rem', '16rem']}>
    //       <Text>Drag your files</Text>
    //     </Center>
    //     <Flex justifyContent="center">
    //       <Button variant="solid" colorScheme="primary">
    //         Upload
    //       </Button>
    //     </Flex>
    //   </VStack>
    // </Container>
    <Dropzone
      onChange={updateFiles}
      value={files}
      onClean
      maxFileSize={104857600}
      label={'Drop Files here or click to browse'}
      minHeight={'195px'}
      maxHeight={'500px'}
      footer={false}
      url={'www.localhost:3000/files/upload'}
      method={'POST'}
      config={{
        headers: {
          Authorization: 'Bearer YOUR_BEARER_TOKEN_GOES_HERE',
          'content-type': 'multipart/form-data',
        },
      }}
      disableScroll>
      {files.map((file) => (
        <FileItem
          {...file}
          key={file.id}
          onDelete={handleDelete}
          alwaysActive
          preview
          info
          elevation={1}
          resultOnTooltip
        />
      ))}
    </Dropzone>
  );
};

export default DragBox;
