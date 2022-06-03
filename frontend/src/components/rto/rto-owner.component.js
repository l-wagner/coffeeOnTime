import { CheckCircleIcon, SmallCloseIcon } from '@chakra-ui/icons';
import { Editable, EditableInput, EditablePreview, IconButton, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createEmployee, deleteEmployee, retrieveEmployees, updateEmployee, updateEmployeeTags } from '../../actions/employees.js';
import { retrieveTags } from '../../actions/tags';
import AreYouSure from '../alerts/areYouSure.component.js';
import SlideNotification from '../alerts/slideNotification.component.js';
import DayDropdown from '../shared/day-dropdown.component.js';
import TagDropdown from '../shared/tag-dropdown.component.js';

export default function Employee() {
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const hireEmployee = () => {};

  return (
    <>
      {/* <SlideNotification error={{ isError: error, msg: 'Name is required.' }} /> */}
      {/* <AreYouSure name={selectedEmployee?.firstName} isOpen={isOpen} onClose={handleClose} onDelete={handleDelete} /> */}
      <Table size='sm'>
        <Thead>
          <Tr>
            <Th>Apprive or deny RTO for {auth.firstName}</Th>
          </Tr>
          <Tr>
            <Th>Dates</Th>
            <Th>Status</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr></Tr>
        </Tbody>
        <Thead>
          <Tr>
            <Th>Request or view RTO for {auth.firstName}</Th>
          </Tr>
          <Tr>
            <Th>Dates</Th>
            <Th>Status</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr></Tr>
        </Tbody>
      </Table>
    </>
  );
}
