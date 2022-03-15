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
  Th,
  Thead,
  Tooltip,
  Tr,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEmployee, retrieveEmployees } from '../../actions/employees.js';
import DayDropdown from './day-dropdown.component.js';
import TagDropdown from './tag-dropdown.component.js';

export default function Employee() {
  // const {
  //   handleSubmit,
  //   register,
  //   formState: { errors, isSubmitting },
  // } = useForm();

  // const { isOpen, onToggle } = useDisclosure();
  const [isOpen, setIsOpen] = React.useState(false);

  const [selectedEmployee, setSelectedEmployee] = React.useState(false);

  const cancelRef = React.useRef();

  const employees = useSelector((state) => state.employees);
  const business = useSelector((state) => state.business);
  const tags = useSelector((state) => state.business.tags);

  useEffect(() => {
    // only run if business id avail
    business.id && dispatch(retrieveEmployees(business.id));
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
                  <TagDropdown employee={employee} tags={tags} />
                </Td>
                <Td>
                  <DayDropdown employee={employee} />
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
