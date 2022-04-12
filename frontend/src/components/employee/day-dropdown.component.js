import { AddIcon } from '@chakra-ui/icons';
import { Flex, IconButton, Menu, MenuButton, MenuItemOption, MenuList, MenuOptionGroup, Tag } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateEmployeeDays } from '../../actions/employees';

export default function DayDropdown(props) {
  const [options, setOptions] = useState([]);
  // init selected options in menu
  useEffect(() => {
    setOptions(props.employee.blockedDays);
    console.log(props.employee.blockedDays);
  }, [props.employee.blockedDays]);
  const dispatch = useDispatch();

  const onSave = () => {
    if (props.submitMethod) props.submitMethod(options);
    else dispatch(updateEmployeeDays(props.employee.id, { blockedDays: options }));
  };

  return (
    <Flex direction='row'>
      {options?.map(
        (day) =>
          day !== '' && (
            <Tag mr={1} size='sm' key={day} variant='solid' colorScheme='green'>
              {day}
            </Tag>
          )
      )}
      <Menu closeOnSelect={false} onClose={onSave}>
        <MenuButton ml={2} as={IconButton} icon={<AddIcon />} aria-label='edit tags' isRound size='xs' _hover={{ bg: 'green.200' }} />
        <MenuList>
          <MenuOptionGroup onChange={setOptions} title='Tags' type='checkbox' value={options}>
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <MenuItemOption value={day} key={day}>
                {day}
              </MenuItemOption>
            ))}
          </MenuOptionGroup>
        </MenuList>
      </Menu>
    </Flex>
  );
}
