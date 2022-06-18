import { Container, Flex, Stack } from '@chakra-ui/react';
import FileBox from './FileBox';

const FilesGrid = () => {
  return (
    <Flex flexWrap="wrap" justifyContent="center">
      <FileBox />
      <FileBox />
      <FileBox />
      <FileBox />
      <FileBox />
      <FileBox />
      <FileBox />
      <FileBox />
      <FileBox />
      <FileBox />
      <FileBox />
      <FileBox />
    </Flex>
  );
};

export default FilesGrid;
