import React, { useEffect } from 'react';
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, Grid, GridItem, Center } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { retrieveEmployees } from '../../actions/employees.js';
import { retrieveTags } from '../../actions/tags';
import { createSchedule } from '../../actions/schedules';
import Calendar from './calendar.component.js';
import ScheduleGrid from './scheduleGrid.component.js';

export default function ScheduleCreate() {
  const [value, onChange] = React.useState();
  const [dates, onDateChange] = React.useState([]);
  const [schedule, onScheduleCreate] = React.useState([]);

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

  const handleClick = () => {
    Object.keys(schedules.new).map((item) => {
      schedules.new[item].shifts.map((shift) => {
        // console.log(shift);
        shift.employees.map((employee) => console.log(employee.firstName));
        console.log(shift.shift.name);
      });
      //   <div>{shift}</div>;
      // })}
    });
  };

  return (
    <>
      {/* add index to handle what's expanded and when */}
      <Accordion index={[0, 1]} allowMultiple allowToggle>
        <AccordionItem>
          <h2>
            {/* <AccordionButton _expanded={{ bg: 'teal', color: 'white' }}> */}
            <AccordionButton>
              <Box flex='1' textAlign='left'>
                Select date range
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Center>
              <Calendar handleChange={(value) => calendarChange(value)} value={value} returnValue={'range'} />
            </Center>
            {dates?.length !== 0 ? (
              <span>{Math.abs(dates[0].diff(dates[1], 'day'))} days selected: </span>
            ) : (
              <span>Click on first and last date to set range.</span>
            )}
            {dates?.length !== 0 && dates?.map((date, index) => <span key={index}>{date.format('dddd – DD/MM/YYYY') + ' '}</span>)}
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem isDisabled={dates?.length === 0}>
          <h2>
            <AccordionButton>
              <Box flex='1' textAlign='left'>
                Check employees and shifts
                {dates?.length === 0 && <span> – select date range first</span>}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>{schedules?.new && <ScheduleGrid data={schedules.new} />}</AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
}
