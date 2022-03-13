import { AddIcon, SmallCloseIcon } from '@chakra-ui/icons';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Table,
  Tag,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEmployee, retrieveEmployees, updateEmployee } from '../../actions/employees.js';

export default function Employee() {
  // const {
  //   handleSubmit,
  //   register,
  //   formState: { errors, isSubmitting },
  // } = useForm();

  // const { isOpen, onToggle } = useDisclosure();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isOpenDays, setIsOpenDays] = React.useState(false);

  const [selectedEmployee, setSelectedEmployee] = React.useState(false);

  const cancelRef = React.useRef();

  const employees = useSelector((state) => state.employees);
  const business = useSelector((state) => state.business);
  const tags = useSelector((state) => state.tags);

  useEffect(() => {
    // only run if business id avail
    business.id && dispatch(retrieveEmployees(business.id));
    console.log(business);
    console.log(employees[1]?.tags);
  }, [business.id]);

  const dispatch = useDispatch();
  const areYouSure = (employee) => {
    setIsOpen(true);
    setSelectedEmployee(employee);
  };
  const onDelete = () => {
    dispatch(deleteEmployee(selectedEmployee.id));
    setIsOpen(false);
  };

  const onClose = () => {
    setIsOpen(false);
    setSelectedEmployee(null);
  };

  const onChangeDays = (values, id) => {
    let employee = employees.find((employee) => employee.id === id);
    employee.blockedDays = values;
  };

  const saveDays = (id) => {
    let employee = employees.find((employee) => employee.id === id);
    dispatch(updateEmployee(employee.id, employee));
  };

  return (
    <>
      <Table>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>{business.nameForTags}</Th>
            <Th>Blocked days</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {employees &&
            employees.map((employee) => (
              <Tr key={employee?.id}>
                <Td>{employee?.firstName}</Td>
                <Td>
                  <Flex direction='row'>
                    {employee?.tags.map((tag) => (
                      <Tooltip label={tag.description} aria-label='A tooltip'>
                        <Tag mr={1} size='sm' key={tag.id} variant='solid' colorScheme='teal'>
                          {tag.name.toLowerCase()}
                        </Tag>
                      </Tooltip>
                    ))}
                    {tags && (
                      <Menu closeOnSelect={false}>
                        <MenuButton
                          ml={2}
                          as={IconButton}
                          icon={<AddIcon />}
                          aria-label='edit tags'
                          isRound
                          size='xs'
                          _hover={{ bg: 'teal.200' }}
                        />
                        <MenuList>
                          <MenuOptionGroup title='Tags' type='checkbox' value={employee.tags.map((tag) => tag.name)}>
                            {tags.map((tag) => (
                              <MenuItemOption value={tag.name} key={tag.id}>
                                {tag.name.toLowerCase()}
                              </MenuItemOption>
                            ))}
                          </MenuOptionGroup>
                        </MenuList>
                      </Menu>
                    )}
                  </Flex>
                </Td>
                <Td>
                  <Flex direction='row'>
                    {employee?.blockedDays ? (
                      employee?.blockedDays?.map((day) => (
                        <Tag mr={1} size='sm' key={day} variant='solid' colorScheme='green'>
                          {day}
                        </Tag>
                      ))
                    ) : (
                      <Text mr={-1} fontSize='xs'>
                        click to add
                      </Text>
                    )}

                    <Menu closeOnSelect={false} onClose={() => saveDays(employee.id)}>
                      <MenuButton
                        ml={2}
                        as={IconButton}
                        icon={<AddIcon />}
                        aria-label='edit tags'
                        isRound
                        size='xs'
                        _hover={{ bg: 'green.200' }}
                      />
                      <MenuList>
                        <MenuOptionGroup
                          onChange={(values) => onChangeDays(values, employee.id)}
                          title='Tags'
                          type='checkbox'
                          value={employee?.blockedDays}>
                          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                            <MenuItemOption value={day} key={day}>
                              {day}
                            </MenuItemOption>
                          ))}
                        </MenuOptionGroup>
                      </MenuList>
                    </Menu>
                  </Flex>
                </Td>
                <Td>
                  <IconButton
                    isRound
                    size='sm'
                    aria-label='delete employee'
                    icon={<SmallCloseIcon />}
                    _hover={{ bg: 'red.200' }}
                    onClick={() => areYouSure(employee)}
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
              Delete {selectedEmployee?.firstName}?
            </AlertDialogHeader>

            <AlertDialogBody>Are you sure? You can't undo this action afterwards.</AlertDialogBody>

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
