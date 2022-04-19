import { AddIcon } from '@chakra-ui/icons';
import { Flex, IconButton, Menu, MenuButton, MenuItemOption, MenuList, MenuOptionGroup, Tag, Tooltip } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';


export default function TagDropdown(props) {
  const [options, setOptions] = useState([]);

  // create arrays with tag names only

  const itemTags = props.item.tags?.map((tag) => tag?.name);

  const businessTags = props.tags?.map((tag) => tag?.name);

  // init selected options in menu
  useEffect(() => {
    setOptions(itemTags);
  }, []);

  const onSave = () => {
    // turn options into list of tag IDs
    let tagIds = options.map((option) => props.tags.find((tag) => tag?.name === option).id).join(',');
    if (props.submitMethod) props.submitMethod(tagIds);
    else props.updateMethod(props.item.id, tagIds);
  };

  return (
    <Flex direction='row'>
      {options?.map((tag) => (
        <Tooltip label={props.tags?.find((businessTag) => businessTag.name === tag)?.description} key={tag} aria-label='A tooltip'>
          <Tag mr={1} size='sm' key={tag} variant='solid' colorScheme='teal'>
            {tag?.toLowerCase()}
          </Tag>
        </Tooltip>
      ))}
      {props.tags && (
        <Menu closeOnSelect={false} onClose={onSave}>
          <MenuButton ml={2} as={IconButton} icon={<AddIcon />} aria-label='edit tags' isRound size='xs' _hover={{ bg: 'teal.200' }} />
          <MenuList>
            <MenuOptionGroup title='Tags' type='checkbox' onChange={setOptions} value={options}>
              {businessTags.map((tag) => (
                <MenuItemOption value={tag} key={tag}>
                  {tag?.toLowerCase()}
                </MenuItemOption>
              ))}
            </MenuOptionGroup>
          </MenuList>
        </Menu>
      )}
    </Flex>
  );
}
