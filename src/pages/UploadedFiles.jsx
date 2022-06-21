import { useState } from 'react';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';

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
  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
  } = useDisclosure();
  const [selectedFile, setSelectedFile] = useState(null);
  const isLargeScreen = useBreakpointValue({
    sm: false,
    md: false,
    lg: true,
    xl: true,
  });
  const handleFileSelection = (id) => {
    let selectedItem = files?.find((item) => {
      return item.id == id;
    });

    setSelectedFile(selectedItem);

    if (!isLargeScreen) {
      onDrawerOpen();
    }
  };

  return (
    <MainLayout>
      <HStack h="100%" justifySelf={'flex-start'}>
        <FilesGrid
          title="Uploaded Files"
          handleFileSelection={handleFileSelection}
          files={files}
        />
        {/* Detail box for desktop view */}
        <Flex
          minW="19rem"
          maxW="22rem"
          p={4}
          display={['none', 'none', 'flex', 'flex']}
          h="100%"
          flexGrow={1}
          border="1px solid"
          borderColor="light.400"
          borderRadius="12px"
          boxShadow="4px 4px 15px rgba(236, 239, 244, 1)">
          <DetailBox file={selectedFile} />
        </Flex>

        {/* Drawer detail box from mobile view */}
        <Drawer
          display={['flex', 'flex', 'none']}
          isOpen={isDrawerOpen}
          placement="right"
          onClose={onDrawerClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <br />
            <br />
            <DrawerBody>
              <DetailBox file={selectedFile} />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </HStack>
    </MainLayout>
  );
};

export default UploadedFilesPage;
