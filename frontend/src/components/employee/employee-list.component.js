import { SmallCloseIcon, PlusSquareIcon, CheckCircleIcon } from '@chakra-ui/icons';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
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
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEmployee, retrieveEmployees, updateEmployee, createEmployee } from '../../actions/employees.js';
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

  const [newEmployeeName, setNewEmployeeName] = React.useState(false);
  const [newEmployeeTags, setNewEmployeeTags] = React.useState(false);
  const [newEmployeeBlockedDays, setNewEmployeeBlockedDays] = React.useState(false);

  const [selectedEmployee, setSelectedEmployee] = React.useState(false);

  const cancelRef = React.useRef();

  const employees = useSelector((state) => state.employees);
  const business = useSelector((state) => state.business);
  const tags = useSelector((state) => state.business.tags);

  const newEmployee = { employee: { id: 0, firstName: '', lastName: '', tags: [], blockedDays: [] } };

  useEffect(() => {
    // only run if business id avail
    business.id && dispatch(retrieveEmployees(business.id));
  }, [business.id]);

  const dispatch = useDispatch();

  const hireEmployee = () => {
    dispatch(
      createEmployee({
        business: business.id,
        firstName: newEmployeeName,
        blockedDays: newEmployeeBlockedDays || [],
        tags: newEmployeeTags || [],
      })
    );
    window.location.reload(false);
  };

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
      <Table size='sm'>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>{business.nameForTags}</Th>
            <Th>Blocked days</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr background='green.100' borderWidth='2px' borderColor='green.200'>
            <Td>
              {/* new employee row */}
              <Editable onSubmit={(name) => setNewEmployeeName(name)} defaultValue='Add new hire'>
                <EditablePreview />
                <EditableInput />
              </Editable>
            </Td>
            <Td>
              <TagDropdown employee={newEmployee} tags={tags} submitMethod={(value) => setNewEmployeeTags(value)} />
            </Td>
            <Td>
              <DayDropdown employee={newEmployee} submitMethod={(value) => setNewEmployeeBlockedDays(value)} />
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

          {employees &&
            employees.map((employee) => (
              <Tr key={employee?.id}>
                <Td>
                  <Editable
                    onSubmit={(name) => dispatch(updateEmployee(employee.id, { firstName: name }))}
                    defaultValue={employee.firstName}>
                    <EditablePreview />
                    <EditableInput />
                  </Editable>
                </Td>
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
