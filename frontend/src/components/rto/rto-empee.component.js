import { CheckCircleIcon, SmallCloseIcon } from '@chakra-ui/icons';
import { Editable, EditableInput, EditablePreview, IconButton, Table, Tag, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { submitRTORequest } from '../../actions/rto.js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';

export default function Employee() {
  const auth = useSelector((state) => state.auth);
  const rto = useSelector((state) => state.rto);
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  const [error, setError] = React.useState(null);
  const dispatch = useDispatch();

  const submit = () => {
    dispatch(submitRTORequest({ startDate, endDate, id: auth.id }));
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
          <Tr background={'green.100'} borderWidth='2px' borderColor={'green.200'}>
            <Td>
              <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
            </Td>
            <Td>
              <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
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
          {rto.map((r) => (
            <Tr key={r.id}>
              <Td>{dayjs(r.day).format('MM/DD/YYYY')}</Td>
              <Td>
                <Tag
                  mr={1}
                  size='sm'
                  variant='solid'
                  colorScheme={r.status === 'approved' ? 'green' : r.status === 'requested' ? 'orange' : 'gray'}>
                  {r.status}
                </Tag>
              </Td>
              <Td>
                  <IconButton
                    isRound
                    size='sm'
                    aria-label='delete employee'
                    icon={<SmallCloseIcon />}
                    _hover={{ bg: 'red.200' }}
                    onClick={() => alert(r)}
                  />
                </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
}
