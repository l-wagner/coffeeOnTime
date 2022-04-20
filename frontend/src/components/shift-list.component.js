import { CheckCircleIcon, SmallCloseIcon } from '@chakra-ui/icons';
import { Editable, EditableInput, EditablePreview, IconButton, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TimePicker from 'react-time-picker';
import { createShift, deleteShift, retrieveShifts, updateShift, updateShiftDays, updateShiftTags } from './../actions/shifts.js';
import { retrieveTags } from './../actions/tags.js';
import AreYouSure from './alerts/areYouSure.component.js';
import SlideNotification from './alerts/slideNotification.component.js';
import DayDropdown from './shared/day-dropdown.component.js';
import TagDropdown from './shared/tag-dropdown.component.js';

export default function Shift() {
  const [isOpen, setIsOpen] = React.useState(false);

  const [shiftName, setShiftName] = React.useState(false);
  const [shiftDescription, setShiftDesc] = React.useState(false);
  const [startTime, setStartTime] = React.useState('05:00');
  const [endTime, setEndTime] = React.useState('21:00');
  const [startTimeUpdate, setStartTimeUpdate] = React.useState(null);
  const [endTimeUpdate, setEndTimeUpdate] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [errorMsg, setErrorMsg] = React.useState(null);

  const [shiftTags, setShiftTags] = React.useState(false);
  const [shiftDays, setShiftDays] = React.useState([]);

  const [selectedShift, setSelectedShift] = React.useState(false);

  const shifts = useSelector((state) => state.shifts);
  const business = useSelector((state) => state.business);
  const tags = useSelector((state) => state.tags);

  const emptyShift = { name: '', description: '', days: [], tags: [], startTime: '', endTime: '' };

  useEffect(() => {
    // only run if business id avail
    business.id && dispatch(retrieveShifts(business.id));
    business.id && dispatch(retrieveTags(business.id));
  }, [business.id]);

  const dispatch = useDispatch();
  const handleDays = (value) => {
    console.log(value);
  };
  const handleCreate = () => {
    if (!shiftName || !shiftDescription || !startTime || !endTime) {
      setError(true);
      setErrorMsg('Name, description, start, and end time are required.');
      setTimeout(() => setError(false), 3000);
    // } else if (startTime > endTime) {
    //   setError(true);
    //   console.log(startTime, endTime);
    //   setErrorMsg('Start time should be earlier than end time.');
    //   setTimeout(() => setError(false), 3000);
    } else {
      dispatch(
        createShift({
          business: business.id,
          name: shiftName,
          description: shiftDescription,
          startTime: new Date('01/01/1970 ' + startTime),
          endTime: new Date('01/01/1970 ' + endTime),
          days: shiftDays || [],
          tags: shiftTags || [],
        })
      );
      window.location.reload(false);
    }
  };

  const areYouSure = (shift) => {
    setIsOpen(true);
    setSelectedShift(shift);
  };
  const handleDelete = () => {
    dispatch(deleteShift(selectedShift.id));
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedShift(null);
  };

  return (
    <>
      <SlideNotification error={{ isError: error, msg: errorMsg }} />
      <AreYouSure name={selectedShift?.name} isOpen={isOpen} onClose={handleClose} onDelete={handleDelete} />
      <Table size='sm'>
        <Thead>
          <Tr>
            <Th>Shift name</Th>
            <Th>Shift description</Th>
            <Th>Start time</Th>
            <Th>End time</Th>
            <Th>{business.nameForTags}</Th>
            <Th>Days active</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr background={'green.100'} borderWidth='2px' borderColor={'green.200'}>
            <Td>
              {/* new shift row */}
              <Editable onSubmit={(name) => setShiftName(name)} defaultValue='Add new shift'>
                <EditablePreview />
                <EditableInput />
              </Editable>
            </Td>
            <Td>
              <Editable onSubmit={(description) => setShiftDesc(description)} defaultValue={`Describe this shift.`}>
                <EditablePreview />
                <EditableInput />
              </Editable>
            </Td>
            <Td>
              <TimePicker
                disableClock
                clearIcon={null}
                openClockOnFocus={false}
                onChange={(value) => setStartTime(value)}
                value={startTime}
              />
            </Td>
            <Td>
              <TimePicker disableClock clearIcon={null} openClockOnFocus={false} onChange={(value) => setEndTime(value)} value={endTime} />
            </Td>
            <Td>
              <TagDropdown item={emptyShift} tags={tags} submitMethod={(value) => setShiftTags(value)} />
            </Td>
            <Td>
              <DayDropdown item={emptyShift} submitMethod={(value) => handleDays(value)} days={shiftDays} />
            </Td>
            <Td>
              <IconButton
                isRound
                size='sm'
                aria-label='add shift'
                icon={<CheckCircleIcon />}
                _hover={{ bg: error ? 'red.300' : 'green.300' }}
                onClick={handleCreate}
              />
            </Td>
          </Tr>

          {shifts &&
            shifts.map((shift) => (
              <Tr key={shift?.id}>
                <Td>
                  <Editable onSubmit={(name) => dispatch(updateShift(shift.id, { name: name }))} defaultValue={shift.name}>
                    <EditablePreview />
                    <EditableInput />
                  </Editable>
                </Td>
                <Td>
                  <Editable
                    onSubmit={(description) => dispatch(updateShift(shift.id, { description: description }))}
                    defaultValue={shift.description}>
                    <EditablePreview />
                    <EditableInput />
                  </Editable>
                </Td>
                <Td>
                  <TimePicker
                    disableClock
                    clearIcon={null}
                    openClockOnFocus={false}
                    onChange={(value) => setStartTimeUpdate(value)}
                    onBlur={() => dispatch(updateShift(shift.id, { startTime: new Date('01/01/1970 ' + startTimeUpdate) }))}
                    value={dayjs(shift.startTime).format('HH:mm')}
                  />
                </Td>
                <Td>
                  <TimePicker
                    disableClock
                    clearIcon={null}
                    openClockOnFocus={false}
                    onChange={(value) => setEndTimeUpdate(value)}
                    onBlur={() => dispatch(updateShift(shift.id, { endTime: new Date('01/01/1970 ' + endTimeUpdate) }))}
                    value={dayjs(shift.endTime).format('HH:mm')}
                  />
                </Td>
                <Td>
                  <TagDropdown updateMethod={(id, data) => dispatch(updateShiftTags(id, { tags: data }))} item={shift} tags={tags} />
                </Td>
                <Td>
                  <DayDropdown updateMethod={(id, data) => dispatch(updateShiftDays(id, { days: data }))} item={shift} days={shift.days} />
                </Td>
                <Td>
                  <IconButton
                    isRound
                    size='sm'
                    aria-label='delete shift'
                    icon={<SmallCloseIcon />}
                    _hover={{ bg: 'red.200' }}
                    onClick={() => areYouSure(shift)}
                  />
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </>
  );
}
