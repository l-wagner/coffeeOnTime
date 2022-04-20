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

  const { employees, business, tags, shifts } = useSelector((state) => state);
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
      dispatch(createSchedule(formatted));
    }
  };

  return (
    <>
      {/* add index to handle what's expanded and when */}
      <Accordion allowMultiple allowToggle>
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
            <Grid templateColumns='repeat(3, 1fr)' gap={4}>
              <GridItem colSpan={2}>
                <Center>
                  <Calendar handleChange={(value) => calendarChange(value)} value={value} returnValue={'range'} />
                </Center>
              </GridItem>
              <GridItem colSpan={1}>
                {dates?.length !== 0 ? (
                  <div>{Math.abs(dates[0].diff(dates[1], 'day'))} days selected.</div>
                ) : (
                  <div>Click on first and last date to set range.</div>
                )}
                {dates?.length !== 0 && dates?.map((date, index) => <div key={index}>{date.format('dddd – DD/MM/YYYY')}</div>)}
              </GridItem>
            </Grid>
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
            enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
}
