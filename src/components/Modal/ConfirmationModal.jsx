import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogOverlay,
  Button,
  Text,
} from '@chakra-ui/react';
import { useRef } from 'react';
import FileProperties from '../File/FileProperties';

const ConfirmationModal = ({
  isOpen,
  onClose,
  file,
  handleConfirmationAction,
}) => {
  const cancelRef = useRef();

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader p={3}>
            Confirm {file.status == 'unblocked' ? 'blocking' : 'unblocking'}?
          </AlertDialogHeader>
          <AlertDialogBody>
            <Text fontWeight="bold">{file?.name}</Text>
            <FileProperties file={file} />
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme={file.status == 'unblocked' ? 'danger' : 'success'}
              onClick={() => handleConfirmationAction(file._id, file.status)}
              ml={3}>
              {file.status == 'unblocked' ? 'Block' : 'Unblock'}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default ConfirmationModal;
