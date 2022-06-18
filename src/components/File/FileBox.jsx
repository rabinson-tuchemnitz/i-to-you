import { Box, Heading, Image, Text, VStack } from '@chakra-ui/react';

const FileBox = () => {
  return (
    <Box
      m={2}
      p={3}
      w={['8rem', '10rem']}
      border="1px solid"
      borderColor="default.500"
      borderRadius="12px 12px 0 0">
      <VStack>
        <Box>
          <Image src="/file-img.png" />
        </Box>
        <VStack>
          <Heading noOfLines={2} size="sm">
            Sample File
          </Heading>
          <Text noOfLines={1} fontSize={['0.8rem']}>
            Uploaded 2 days ago
          </Text>
        </VStack>
      </VStack>
    </Box>
  );
};

export default FileBox;
