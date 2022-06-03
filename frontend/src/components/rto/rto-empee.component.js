import { CheckCircleIcon } from '@chakra-ui/icons';
import { Editable, EditableInput, EditablePreview, IconButton, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { submitRTORequest } from '../../actions/rto.js';

export default function Employee() {
  const auth = useSelector((state) => state.auth);
  const [startDate, setStartDate] = React.useState('05:00');
  const [endDate, setEndDate] = React.useState('21:00');
  const [error, setError] = React.useState(null);
  const dispatch = useDispatch();

  const submit = () => {
    let start = new Date(startDate);
    let end = new Date(endDate);
    console.log(start);
    console.log(end);
  };

  return (
    <>
      {/* <SlideNotification error={{ isError: error, msg: 'Name is required.' }} /> */}
      {/* <AreYouSure name={selectedEmployee?.firstName} isOpen={isOpen} onClose={handleClose} onDelete={handleDelete} /> */}
      <Table size='sm'>
        <Thead>
          <Tr>
            <Th>Request RTO {auth.firstName}</Th>
          </Tr>
          <Tr>
            <Th>Start date</Th>
            <Th>End date</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {' '}
          <Tr>
            <Td>
              <Editable onSubmit={(startDate) => setStartDate(startDate)} defaultValue={`MM/DD/YY`}>
                <EditablePreview />
                <EditableInput />
              </Editable>
            </Td>
            <Td>
              <Editable onSubmit={(endDate) => setEndDate(endDate)} defaultValue={`MM/DD/YY`}>
                <EditablePreview />
                <EditableInput />
              </Editable>
            </Td>
            <Td>
              <IconButton
                isRound
                size='sm'
                aria-label='submit RTO request'
                icon={<CheckCircleIcon />}
                _hover={{ bg: error ? 'red.300' : 'green.300' }}
                onClick={submit}
              />
            </Td>
          </Tr>
        </Tbody>
        <Thead>
          <Tr>
            <Th>Requested RTO for {auth.firstName}</Th>
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
