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
    setEvents((prev) => [...prev, { id: myEvents.length + 1, start: startEnd.start, end: startEnd.end, title: value, employeeColor: true }]);
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
      defaultDate: new Date(2015, 3, 12),
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

const myEventsDef = [
  {
    id: 0,
    title: 'All Day Event very long title',
    allDay: true,
    start: new Date(2015, 3, 0),
    end: new Date(2015, 3, 1),
  },
  {
    id: 1,
    title: 'Long Event',
    start: new Date(2015, 3, 7),
    end: new Date(2015, 3, 10),
  },

  {
    id: 2,
    title: 'DTS STARTS',
    start: new Date(2016, 2, 13, 0, 0, 0),
    end: new Date(2016, 2, 20, 0, 0, 0),
  },

  {
    id: 3,
    title: 'DTS ENDS',
    start: new Date(2016, 10, 6, 0, 0, 0),
    end: new Date(2016, 10, 13, 0, 0, 0),
  },

  {
    id: 4,
    title: 'Some Event',
    start: new Date(2015, 3, 9, 0, 0, 0),
    end: new Date(2015, 3, 9, 0, 0, 0),
  },
  {
    id: 5,
    title: 'Conference',
    start: new Date(2015, 3, 11),
    end: new Date(2015, 3, 13),
    desc: 'Big conference for important people',
  },
  {
    id: 6,
    title: 'Meeting',
    start: new Date(2015, 3, 12, 10, 30, 0, 0),
    end: new Date(2015, 3, 12, 12, 30, 0, 0),
    desc: 'Pre-meeting meeting, to prepare for the meeting',
  },
  {
    id: 7,
    title: 'Lunch',
    start: new Date(2015, 3, 12, 12, 0, 0, 0),
    end: new Date(2015, 3, 12, 13, 0, 0, 0),
    desc: 'Power lunch',
  },
  {
    id: 8,
    title: 'Meeting',
    start: new Date(2015, 3, 12, 14, 0, 0, 0),
    end: new Date(2015, 3, 12, 15, 0, 0, 0),
  },
  {
    id: 9,
    title: 'Happy Hour',
    start: new Date(2015, 3, 12, 17, 0, 0, 0),
    end: new Date(2015, 3, 12, 17, 30, 0, 0),
    desc: 'Most important meal of the day',
  },
  {
    id: 10,
    title: 'Dinner',
    start: new Date(2015, 3, 12, 20, 0, 0, 0),
    end: new Date(2015, 3, 12, 21, 0, 0, 0),
  },
  {
    id: 11,
    title: 'Birthday Party',
    start: new Date(2015, 3, 13, 7, 0, 0),
    end: new Date(2015, 3, 13, 10, 30, 0),
  },
  {
    id: 12,
    title: 'Late Night Event',
    start: new Date(2015, 3, 17, 19, 30, 0),
    end: new Date(2015, 3, 18, 2, 0, 0),
  },
  {
    id: 13,
    title: 'Multi-day Event',
    start: new Date(2015, 3, 20, 19, 30, 0),
    end: new Date(2015, 3, 22, 2, 0, 0),
  },
  {
    id: 14,
    title: 'Today',
    start: new Date(new Date().setHours(new Date().getHours() - 3)),
    end: new Date(new Date().setHours(new Date().getHours() + 3)),
  },
];
