import { useState } from 'react';
import { Flex, HStack } from '@chakra-ui/react';

import FilesGrid from '../components/File/FilesGrid';
import MainLayout from '../components/Layout/MainLayout';
import DetailBox from '../components/File/DetailBox';

const files = [
  {
    id: 1,
    name: 'Sample File 1',
    type: 'Image',
    size: '7 MB',
    status: 'blocked',
    uploaded_at: '1 May 2022',
  },
  {
    id: 2,
    name: 'Sample File 2',
    type: 'PDF',
    size: '10 KB',
    status: 'unblocked',
    uploaded_at: '2 April 2022',
  },
  {
    id: 3,
    name: 'Sample File 3',
    type: 'Image',
    size: '1 MB',
    status: 'unblocked',
    uploaded_at: '10 May 2022',
  },
  {
    id: 4,
    name: 'Sample File 4',
    type: 'DOC',
    size: '3 MB',
    status: 'blocked',
    uploaded_at: '18 Jun 2022',
  },
];

const UploadedFilesPage = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleOpenDrawer = () => {
    setShowDrawer(true);
  };

  const handleCloseDrawer = () => {
    setShowDrawer(false);
  };

  const handleFileSelection = (id) => {
    let selectedItem = files?.find((item) => {
      return item.id == id;
    });

    setSelectedFile(selectedItem);
  };

  return (
    <MainLayout>
      <HStack m={[2, 3, 4, 5]} h="100%" justifySelf={'flex-start'}>
        <FilesGrid
          title="Uploaded Files"
          handleFileSelection={handleFileSelection}
          files={files}
        />
        <DetailBox file={selectedFile} />
      </HStack>
    </MainLayout>
  );
};

export default UploadedFilesPage;
