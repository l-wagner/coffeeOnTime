import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React, { Fragment, useCallback, useMemo, useState } from 'react';
import { Calendar, DateLocalizer, momentLocalizer, Views } from 'react-big-calendar';

import moment from 'moment';

// import events from '../../resources/events'

export default function RtoCalendar() {
  const [myEvents, setEvents] = useState(myEventsDef);
  const [value, setValue] = React.useState('');
  const [startEnd, setStartEnd] = React.useState('');
  const handleChange = (event) => setValue(event.target.value);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSave = () => {
    console.log(value);
    console.log(startEnd);
    setEvents((prev) => [
      ...prev,
      { id: myEvents.length + 1, start: startEnd.start, end: startEnd.end, title: value, employeeColor: true },
    ]);
    console.log(myEvents);

    onClose();
  };
  const handleSelectSlot = useCallback(
    ({ start, end }) => {
      onOpen();
      // const title = window.prompt('New Event name');
      // if (value) {
      //   setEvents((prev) => [...prev, { start, end, value }]);
      // }
      setStartEnd({ start, end });
    },
    [setStartEnd]
  );

  // Setup the localizer by providing the moment (or globalize, or Luxon) Object
  // to the correct localizer.
  const localizer = momentLocalizer(moment); // or globalizeLocalizer

  const handleSelectEvent = useCallback((event) => window.alert(event.title), []);

  const { defaultDate, scrollToTime } = useMemo(
    () => ({
      defaultDate: new Date(2022, 5, 12),
      scrollToTime: new Date(1970, 1, 1, 6),
    }),
    []
  );

  return (
    <Fragment>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight='bold' mb='1rem'>
              Who is taking off?
            </Text>
            <Input value={value} onChange={handleChange}></Input>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost' onClick={handleSave}>
              Save RTO
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <div className='height600'>
        <Calendar
          defaultDate={defaultDate}
          defaultView={Views.MONTH}
          events={myEvents}
          localizer={localizer}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          selectable
          scrollToTime={scrollToTime}
          style={{ height: 500, width: '95%' }}
          eventPropGetter={(event, start, end, isSelected) => {
            let newStyle = {
              backgroundColor: 'lightgrey',
              color: 'black',
              borderRadius: '0px',
              border: 'none',
            };

            if (event.employeeColor) {
              newStyle.backgroundColor = 'lightgreen';
            }

            return {
              className: '',
              style: newStyle,
            };
          }}
        />
      </div>
    </Fragment>
  );
}

RtoCalendar.propTypes = {
  localizer: PropTypes.instanceOf(DateLocalizer),
};

const myEventsDef = [];
