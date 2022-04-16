import { CheckCircleIcon, SmallCloseIcon } from '@chakra-ui/icons';
import { Editable, EditableInput, EditablePreview, IconButton, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  createEmployee,
  deleteEmployee,
  retrieveEmployees,
  updateEmployee,
  updateEmployeeDays,
  updateEmployeeTags,
} from '../../actions/employees.js';
import { retrieveTags } from '../../actions/tags';
import AreYouSure from '../errors/areYouSure.component.js';
import SlideError from '../errors/slideError.component.js';
import DayDropdown from '../shared/day-dropdown.component.js';
import TagDropdown from '../shared/tag-dropdown.component.js';

export default function Employee() {
  const [isOpen, setIsOpen] = React.useState(false);

  const [firstName, setFirstName] = React.useState(false);
  const [employeeTags, setEmployeeTags] = React.useState(false);
  const [employeeBlockedDays, setEmployeeBlockedDays] = React.useState(false);
  const [error, setError] = React.useState(null);

  const [selectedEmployee, setSelectedEmployee] = React.useState(false);

  const employees = useSelector((state) => state.employees);
  const business = useSelector((state) => state.business);
  const tags = useSelector((state) => state.tags);

  const newEmployee = { employee: { id: 0, firstName: '', lastName: '', tags: [], blockedDays: [] } };

  useEffect(() => {
    // only run if business id avail
    business.id && dispatch(retrieveEmployees(business.id));
    business.id && dispatch(retrieveTags(business.id));
  }, [business.id]);

  const dispatch = useDispatch();

  const hireEmployee = () => {
    if (!firstName) {
      setError(true);
      setTimeout(() => setError(false), 3000);
    } else {
      dispatch(
        createEmployee({
          business: business.id,
          firstName: firstName,
          blockedDays: employeeBlockedDays || [],
          tags: employeeTags || [],
        })
      );
      window.location.reload(false);
    }
  };

  const areYouSure = (employee) => {
    setIsOpen(true);
    setSelectedEmployee(employee);
  };
  const handleDelete = () => {
    dispatch(deleteEmployee(selectedEmployee.id));
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedEmployee(null);
  };

  return (
    <>
      <SlideError error={{ isError: error, msg: 'Name is required.' }} />
      <AreYouSure name={selectedEmployee?.firstName} isOpen={isOpen} onClose={handleClose} onDelete={handleDelete} />
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
          {/* new employee row */}
          <Tr background='green.100' borderWidth='2px' borderColor='green.200'>
            <Td>
              <Editable onSubmit={(name) => setFirstName(name)} defaultValue='Add new hire'>
                <EditablePreview />
                <EditableInput />
              </Editable>
            </Td>
            <Td>
              <TagDropdown item={newEmployee} tags={tags} submitMethod={(value) => setEmployeeTags(value)} />
            </Td>
            <Td>
              <DayDropdown item={newEmployee} submitMethod={(value) => setEmployeeBlockedDays(value)} days={newEmployee.blockedDays} />
            </Td>
            <Td>
              <IconButton
                isRound
                size='sm'
                aria-label='add employee'
                icon={<CheckCircleIcon />}
                _hover={{ bg: error ? 'red.300' : 'green.300' }}
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
                  <TagDropdown updateMethod={(id, data) => dispatch(updateEmployeeTags(id, data))} item={employee} tags={tags} />
                </Td>
                <Td>
                  <DayDropdown
                    updateMethod={(id, data) => dispatch(updateEmployeeDays(id, data))}
                    item={employee}
                    days={employee.blockedDays}
                  />
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
    </>
  );
}
