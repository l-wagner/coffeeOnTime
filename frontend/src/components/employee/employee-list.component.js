import { SmallCloseIcon } from '@chakra-ui/icons';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  HStack,
  IconButton,
  Table,
  Tag,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEmployee, retrieveEmployees } from '../../actions/employees.js';

export default function Employee() {
  // const {
  //   handleSubmit,
  //   register,
  //   formState: { errors, isSubmitting },
  // } = useForm();

  // const { isOpen, onToggle } = useDisclosure();
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedEmployee, setSelectedEmployee] = React.useState(false);
  const onClose = () => {
    setIsOpen(false);
    setSelectedEmployee(null);
  };
  const cancelRef = React.useRef();

  const employees = useSelector((state) => state.employees);
  const business = useSelector((state) => state.business);

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

  // onChangeSearchName(e) {
  //   const searchName = e.target.value;

  //   this.setState({
  //     searchName: searchName,
  //   });
  // }

  // refreshData() {
  //   this.setState({
  //     currentEmployee: null,
  //     currentIndex: -1,
  //   });
  // }

  // setActiveEmployee(employee, index) {
  //   this.setState({
  //     currentEmployee: employee,
  //     currentIndex: index,
  //   });
  // }

  // removeAllEmployees() {
  //   this.props
  //     .deleteAllEmployees()
  //     .then((response) => {
  //       console.log(response);
  //       this.refreshData();
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // }

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
                  <HStack>
                    {employee?.tags.map((tag) => (
                      <HStack>
                        <Tag size='sm' key={tag.id} variant='solid' colorScheme='teal'>
                          {tag.name}
                        </Tag>
                      </HStack>
                    ))}
                  </HStack>
                </Td>
                <Td>{employee?.blockedDays}</Td>
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
        <Tfoot>
          <Tr>
            <Th>Name</Th>
            <Th>{business.nameForTags}</Th>
            <Th>Blocked days</Th>
          </Tr>
        </Tfoot>
      </Table>
      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete {selectedEmployee.firstName}?
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
