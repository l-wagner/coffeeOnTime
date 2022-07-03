import { Box, Button, Center, Container, Heading, Stack, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { retrieveEmployees } from '../../actions/employees.js';
import { createSchedule, saveSchedule } from '../../actions/schedules';
import { retrieveTags } from '../../actions/tags';
import Calendar from './calendar.component.js';
import ScheduleGrid from './scheduleGrid.component.js';

export default function ScheduleCreate() {
  const [value, onChange] = React.useState();
  const [filename, setFileName] = React.useState();
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
      setFileName(`${dayjs(value[0]).format('YY-MM-DD')}_${dayjs(value[1]).format('YY-MM-DD')}_${business.name}_Schedule`);
      dispatch(createSchedule({ startDate: formatted[0], endDate: formatted[1], business: business.id }));
    }
  };

  const onSave = () => {
    console.log(schedules.new);
    let formatted = [];
    formatted[0] = new Date(schedules.new.config[0].data);
    formatted[1] = new Date(schedules.new.config[schedules.new.config.length - 1].data);

    console.log(formatted);
    let data = {
      config: JSON.stringify(schedules.new.config),
      rows: JSON.stringify(schedules.new.rows),
      rowLabels: JSON.stringify(schedules.new.rowLabels),
      columns: JSON.stringify(schedules.new.columns),
      business: business.id,
      startDate: formatted[0],
      endDate: formatted[1],
    };
    dispatch(saveSchedule(data));
  };

  return (
    <>
      <Container maxW={'95vw'}>
        <Stack as={Box} >
          <Center>
            <Heading fontWeight={10} fontSize={{ base: '2xl', sm: '4xl', md: '2xl' }}>
              <Text color={'teal.400'}>Select date range</Text>
            </Heading>
          </Center>
          <Center>
            <Calendar handleChange={(value) => calendarChange(value)} value={value} returnValue={'range'} />
          </Center>
          {dates?.length > 0 && (
            <Center>
              <Heading fontWeight={10} fontSize={{ base: 'xl', sm: '2xl', md: 'xl' }}>
                <Text color={'teal'}>
                  {Math.abs(dates[0].diff(dates[1], 'day'))} days selected:{' '}
                  {dates?.length !== 0 && dates?.map((date, index) => <span key={index}>{date.format('dddd – MM/DD/YYYY') + ' '}</span>)}
                </Text>
              </Heading>
            </Center>
          )}
        </Stack>
      </Container>
      <Container maxW={'100vw'}>
        <Stack>
          {schedules?.new && (
            <>
              <ScheduleGrid data={schedules.new} filename={filename} />
              {/* <Button onClick={onSave}>Save schedule</Button> */}
            </>
          )}
          {schedules?.old && (
            <>
              OLD SCHEDULE
              <ScheduleGrid data={schedules.old} />{' '}
            </>
          )}
        </Stack>
      </Container>
    </>
  );
}
