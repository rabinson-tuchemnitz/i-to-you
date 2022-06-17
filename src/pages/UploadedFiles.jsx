import { HStack } from '@chakra-ui/react';
import MainLayout from '../components/Layout/MainLayout';

const FilesPage = () => {
  return (
    <MainLayout>
      <HStack>
        <Container>Active Files</Container>
        <Container>Details</Container>
      </HStack>
    </MainLayout>
  );
};

export default FilesPage;