import React, { useEffect } from 'react';
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, Grid, GridItem, Center } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { retrieveEmployees } from '../../actions/employees.js';
import { retrieveTags } from '../../actions/tags';
import { createSchedule } from '../../actions/schedules';
import Calendar from './calendar.component.js';

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
          <AccordionPanel pb={4}>
            {schedules?.new &&
              Object.keys(schedules.new).map((item) => (
                <>
                  <div>{item}</div>
                  <div>
                    {schedules.new[item].weekday}
                    <div>Available employees: {schedules.new[item].shifts[0].employees[0].firstName}</div>
                    {schedules.new[item].shifts.map((shift) => {
                      <div>{shifts.employees}</div>;
                      shift.employees.map((employee) => {});
                    })}
                  </div>
                </>
              ))}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
}
