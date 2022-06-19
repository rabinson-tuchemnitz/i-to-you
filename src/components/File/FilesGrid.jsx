import { Divider, Flex, Heading } from '@chakra-ui/react';
import FileBox from './FileBox';

const FilesGrid = ({ title, files, handleFileSelection }) => {
  return (
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
          {title}
        </Heading>
        <Divider mb={2} />
        <Flex flexWrap="wrap" justifyContent="center">
          {files.map((file) => (
            <FileBox
              key={file.id}
              file={file}
              handleFileSelection={handleFileSelection}
            />
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default FilesGrid;
