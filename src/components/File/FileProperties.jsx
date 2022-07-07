import { Badge, Flex, HStack, Text } from '@chakra-ui/react';
import { bytesToSize } from '../../utils/helper';

const FileProperties = ({ file }) => {
  return (
    <HStack spacing={4}>
      <Flex flexDir="column">
        <Text>Type</Text>
        <Text>Size</Text>
        <Text>Status</Text>
        <Text>Uploaded</Text>
      </Flex>
      <Flex flexDir="column" width="100%">
        <Text>{file?.type}</Text>
        <Text>{bytesToSize(file.size_in_bytes)}</Text>
        <Text>
          {file?.status == 'blocked' ? (
            <Badge bgColor="danger.500" color="white">
              Blocked
            </Badge>
          ) : (
            <Badge bgColor="success.500" color="white">
              Unblocked
            </Badge>
          )}
        </Text>
        <Text>{file.createdAt ?? '-'}</Text>
      </Flex>
    </HStack>
  );
};

export default FileProperties;
