import React, { useEffect } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Grid,
  GridItem,
  Center,
  Button,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { retrieveEmployees } from '../../actions/employees.js';
import { retrieveTags } from '../../actions/tags';
import { createSchedule, saveSchedule } from '../../actions/schedules';
import Calendar from './calendar.component.js';
import ScheduleGrid from './scheduleGrid.component.js';

export default function ScheduleCreate() {
  const [value, onChange] = React.useState();
  const [dates, onDateChange] = React.useState([]);

  const { employees, business, tags, shifts, schedules } = useSelector((state) => state);
  useEffect(() => {
    // only run if business id avail
    business.id && dispatch(retrieveEmployees(business.id));
    business.id && dispatch(retrieveTags(business.id));
  }, [business.id]);

  const dispatch = useDispatch();

  const calendarChange = (value) => {
    if (value.length === 2) {
      let formatted = [];
      formatted[0] = dayjs(value[0]);
      formatted[1] = dayjs(value[1]);
      console.log(formatted);
      onDateChange(formatted);
      dispatch(createSchedule({ startDate: formatted[0], endDate: formatted[1], business: business.id }));
    }
  };

  const onSave = () => {
    console.log(schedules.new);
    
  };

  return (
    <>
      {/* add index to handle what's expanded and when */}
      <h2>
        {/* <AccordionButton _expanded={{ bg: 'teal', color: 'white' }}> */}
        <Box flex='1' textAlign='left'>
          Select date range
        </Box>
      </h2>
      <Center>
        <Calendar handleChange={(value) => calendarChange(value)} value={value} returnValue={'range'} />
      </Center>
      {dates?.length !== 0 ? (
        <span>{Math.abs(dates[0].diff(dates[1], 'day'))} days selected: </span>
      ) : (
        <span>Click on first and last date to set range.</span>
      )}
      {dates?.length !== 0 && dates?.map((date, index) => <span key={index}>{date.format('dddd – DD/MM/YYYY') + ' '}</span>)}

      <h2>
        <Box flex='1' textAlign='left'>
          Check employees and shifts
          {dates?.length === 0 && <span> – select date range first</span>}
        </Box>
      </h2>
      {schedules?.new && (
        <>
          <ScheduleGrid data={schedules.new} />{' '}
          <Center>
            <Button onClick={onSave}>Save schedule</Button>
          </Center>
        </>
      )}
    </>
  );
}
