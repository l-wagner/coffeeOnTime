import { SmallCloseIcon } from '@chakra-ui/icons';
import {
  Button, HStack, Table, Tbody, Td, Tfoot, Th, Thead, Tr, useDisclosure
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { retrieveEmployees } from '../../actions/employees.js';

export default function Employee() {
  // const {
  //   handleSubmit,
  //   register,
  //   formState: { errors, isSubmitting },
  // } = useForm();

  // const { isOpen, onToggle } = useDisclosure();

  const employees = useSelector((state) => state.employees);
  const business = useSelector((state) => state.business);

  useEffect(() => {
    // only run if business id avail
    business.id && dispatch(retrieveEmployees(business.id));
  }, [business.id]);

  const dispatch = useDispatch();

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

  // findByName() {
  //   this.refreshData();

  //   this.props.findEmployeesByName(this.state.searchName);
  // }

  //   const { searchName, currentEmployee, currentIndex } = this.state;
  //   const { employees } = this.props;

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>{business.nameForTags}</Th>
          <Th isNumeric>Blocked days</Th>
        </Tr>
      </Thead>
      <Tbody>
        {employees &&
          employees.map((employee) => (
            <Tr key={employee.id}>
              <Td>{employee.firstName}</Td>
              <Td>
                <HStack>
                  {employee.tags.map((tag) => (
                    <HStack>
                      <Button size='xs' rightIcon={<SmallCloseIcon />} variant='outline' _hover={{ bg: 'red.200' }}>
                        {tag.name}
                      </Button>
                    </HStack>
                  ))}
                </HStack>
              </Td>
              <Td>{employee.blockedDays}</Td>
            </Tr>
          ))}
      </Tbody>
      <Tfoot>
        <Tr>
          <Th>Name</Th>
          <Th>{business.nameForTags}</Th>
          <Th isNumeric>Blocked days</Th>
        </Tr>
      </Tfoot>
    </Table>
  );
}
