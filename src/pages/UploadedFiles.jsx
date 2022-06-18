import { Divider, Flex, Heading, HStack } from '@chakra-ui/react';
import FilesGrid from '../components/File/FilesGrid';
import MainLayout from '../components/Layout/MainLayout';

const UploadedFilesPage = () => {
  return (
    <MainLayout>
      <HStack m={[2, 3, 4, 5]} h="100%" justifySelf={'flex-start'}>
        <Flex
          h="100%"
          flexGrow={3}
          border="1px solid"
          borderColor="light.400"
          borderRadius="12px"
          boxShadow="4px 4px 15px rgba(236, 239, 244, 1)"
          overflow="hidden">
          <Flex flexDir="column" w="100%">
            <Heading as="h2" size="md" p={3}>
              Uploaded
            </Heading>
            <Divider mb={2} />
            <FilesGrid />
          </Flex>
        </Flex>
        <Flex
          minW="15rem"
          bgColor="red"
          display={['none', 'none', 'flex']}
          h="100%"
          flexGrow={1}
          border="1px solid"
          borderColor="light.400"
          borderRadius="12px"
          boxShadow="4px 4px 15px rgba(236, 239, 244, 1)"
          p={5}>
          Active Files
        </Flex>
      </HStack>
    </MainLayout>
  );
};

export default UploadedFilesPage;
