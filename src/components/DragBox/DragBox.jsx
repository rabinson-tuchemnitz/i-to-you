import {
  Button,
  Center,
  Container,
  Flex,
  Text,
  VStack,
} from '@chakra-ui/react';

const DragBox = () => {
  return (
    <Container maxW="5xl" p={4}>
      <VStack>
        <Center
          w="100%"
          border="3px dashed"
          borderColor="default.500"
          borderRadius="2rem"
          m={4}
          minH={['15rem']}>
          <Text>Drag your files</Text>
        </Center>
        <Flex justifyContent="center">
          <Button variant="solid" colorScheme="primary">
            Upload
          </Button>
        </Flex>
      </VStack>
    </Container>
  );
};

export default DragBox;
