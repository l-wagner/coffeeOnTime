import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function CalendarComp(props) {
  const [value, onChange] = React.useState();

  return (
    <>
      <Calendar showDoubleView selectRange calendarType={'US'} onChange={(value) => props.handleChange(value)} value={value} />
    </>
  );
}
