import { CheckCircleIcon, SmallCloseIcon } from '@chakra-ui/icons';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Editable,
  EditableInput,
  EditablePreview,
  IconButton,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import pluralize from 'pluralize';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTag, retrieveTags, updateTag } from '../actions/tags';

export default function Employee() {
  // const { isOpen, onToggle } = useDisclosure();
  const [isOpen, setIsOpen] = React.useState(false);

  const [newTagName, setNewTagName] = React.useState(false);
  const [newTagDescription, setNewTagDescription] = React.useState(false);

  const [selectedTag, setSelectedEmployee] = React.useState(false);

  const cancelRef = React.useRef();

  const business = useSelector((state) => state.business);
  const tags = useSelector((state) => state.tags);

  // const newEmployee = { tag: { id: 0, name: '', lastName: '', tags: [], blockedDays: [] } };

  useEffect(() => {
    // only run if business id avail
    business.id && dispatch(retrieveTags(business.id));
  }, [business.id]);

  const dispatch = useDispatch();

  const hireEmployee = () => {
    // dispatch(
    //   createTag({
    //     business: business.id,
    //     name: newEmployeeName,
    //     blockedDays: newEmployeeBlockedDays || [],
    //     tags: newEmployeeTags || [],
    //   })
    // );
    window.location.reload(false);
  };

  const areYouSure = (tag) => {
    setIsOpen(true);
    setSelectedEmployee(tag);
  };
  const onDelete = () => {
    dispatch(deleteTag(selectedTag.id));
    setIsOpen(false);
  };

  const onClose = () => {
    setIsOpen(false);
    setSelectedEmployee(null);
  };

  return (
    <>
      <Table size='sm'>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Description</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr background='green.100' borderWidth='2px' borderColor='green.200'>
            <Td>
              {/* new employee row */}
              <Editable onSubmit={(name) => setNewTagName(name)} defaultValue={`Add new ${pluralize.singular(business.nameForTags)}`}>
                <EditablePreview />
                <EditableInput />
              </Editable>
            </Td>
            <Td>
              <Editable
                onSubmit={(description) => setNewTagDescription(description)}
                defaultValue={`Describe this ${pluralize.singular(business.nameForTags)}.`}>
                <EditablePreview />
                <EditableInput />
              </Editable>
            </Td>

            <Td>
              <IconButton
                isRound
                size='sm'
                aria-label='add employee'
                icon={<CheckCircleIcon />}
                _hover={{ bg: 'green.300' }}
                onClick={hireEmployee}
              />
            </Td>
          </Tr>
          {tags &&
            tags.map((tag) => (
              <Tr key={tag?.name}>
                <Td>
                  <Editable onSubmit={(name) => dispatch(updateTag({ id: tag.id, name: name }))} defaultValue={tag.name}>
                    <EditablePreview />
                    <EditableInput />
                  </Editable>
                </Td>
                <Td>
                  <Editable
                    onSubmit={(description) => dispatch(updateTag({ id: tag.id, description: description }))}
                    defaultValue={tag.description}>
                    <EditablePreview />
                    <EditableInput />
                  </Editable>
                </Td>

                <Td>
                  <IconButton
                    isRound
                    size='sm'
                    aria-label='delete tag'
                    icon={<SmallCloseIcon />}
                    _hover={{ bg: 'red.200' }}
                    onClick={() => areYouSure(tag)}
                  />
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete {selectedTag?.name}?
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? This will also remove this {pluralize.singular(business.nameForTags)} from all tagged employees. You can't undo
              this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={onDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
