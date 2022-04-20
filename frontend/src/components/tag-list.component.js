import { CheckCircleIcon, SmallCloseIcon } from '@chakra-ui/icons';
import { Editable, EditableInput, EditablePreview, IconButton, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import pluralize from 'pluralize';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTag, deleteTag, retrieveTags, updateTag } from '../actions/tags';
import AreYouSure from './alerts/areYouSure.component';
import SlideNotification from './alerts/slideNotification.component';

export default function Employee() {
  const [isOpen, setIsOpen] = React.useState(false);

  const [tagName, setTagName] = React.useState(false);
  const [tagDescription, setTagDescription] = React.useState(false);
  const [error, setError] = React.useState(null);

  const [selectedTag, setSelectedTag] = React.useState(false);

  const business = useSelector((state) => state.business);
  const tags = useSelector((state) => state.tags);

  // const newEmployee = { tag: { id: 0, name: '', lastName: '', tags: [], days: [] } };

  useEffect(() => {
    // only run if business id avail
    business.id && dispatch(retrieveTags(business.id));
  }, [business.id]);

  const dispatch = useDispatch();

  const handleCreate = () => {
    if (!tagName || !tagDescription) {
      setError(true);
      setTimeout(() => setError(false), 3000);
    } else {
      dispatch(
        createTag({
          business: business.id,
          name: tagName,
          description: tagDescription,
        })
      );
      window.location.reload(false);
    }
  };

  const areYouSure = (tag) => {
    setIsOpen(true);
    setSelectedTag(tag);
  };

  const handleDelete = () => {
    dispatch(deleteTag(selectedTag.id));
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedTag(null);
  };

  return (
    <>
      <SlideNotification error={{ isError: error, msg: 'Name and description are required.' }} />
      <AreYouSure name={selectedTag?.name} isOpen={isOpen} onClose={handleClose} onDelete={handleDelete} />
      <Table size='sm'>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Description</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {/* new tag row */}
          <Tr background='green.100' borderWidth='2px' borderColor='green.200'>
            <Td>
              <Editable onSubmit={(name) => setTagName(name)} defaultValue={`Add new ${pluralize.singular(business.nameForTags)}`}>
                <EditablePreview />
                <EditableInput />
              </Editable>
            </Td>
            <Td>
              <Editable
                onSubmit={(description) => setTagDescription(description)}
                defaultValue={`Describe this ${pluralize.singular(business.nameForTags)}.`}>
                <EditablePreview />
                <EditableInput />
              </Editable>
            </Td>

            <Td>
              <IconButton
                isRound
                size='sm'
                aria-label='add tag'
                icon={<CheckCircleIcon />}
                _hover={{ bg: error ? 'red.300' : 'green.300' }}
                onClick={handleCreate}
              />
            </Td>
          </Tr>
          {tags &&
            tags.map((tag) => (
              <Tr key={tag?.name}>
                <Td>
                  <Editable
                    onSubmit={(name) => dispatch(updateTag({ id: tag.id, name: name, description: tag.description }))}
                    defaultValue={tag.name}>
                    <EditablePreview />
                    <EditableInput />
                  </Editable>
                </Td>
                <Td>
                  <Editable
                    onSubmit={(description) => dispatch(updateTag({ id: tag.id, name: tag.name, description: description }))}
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
    </>
  );
}
