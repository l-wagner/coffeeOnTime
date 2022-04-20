import { AddIcon } from '@chakra-ui/icons';
import { Flex, IconButton, Menu, MenuButton, MenuItemOption, MenuList, MenuOptionGroup, Tag } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

export default function DayDropdown(props) {
  const [options, setOptions] = useState([]);
  // init selected options in menu
  useEffect(() => {
    setOptions(props.days);
  }, [props.days]);

  const onSave = () => {
    // if days are part of a new create, they need to stay in an array
    if (props.submitMethod) props.submitMethod(options);
    else props.updateMethod(props.item.id, options?.join(','));
  };

  return (
    <Flex direction='row'>
      <Menu closeOnSelect={false} onClose={onSave}>
        <MenuButton mr={2} as={IconButton} icon={<AddIcon />} aria-label='edit tags' isRound size='xs' _hover={{ bg: 'green.200' }} />
        <MenuList>
          <MenuOptionGroup onChange={setOptions} title='Days' type='checkbox' value={options}>
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <MenuItemOption value={day} key={day}>
                {day}
              </MenuItemOption>
            ))}
          </MenuOptionGroup>
        </MenuList>
      </Menu>

      {options?.map(
        (day) =>
          day !== '' && (
            <Tag mr={1} size='sm' key={day} variant='solid' colorScheme='green'>
              {day}
            </Tag>
          )
      )}
    </Flex>
  );
}
