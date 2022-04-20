import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function CalendarComp() {
  const [value, onChange] = React.useState();

  const handleChange = (value) => {
    console.log(value);
  };
  return (
    <>
      <Calendar selectRange calendarType={'US'} onChange={(value) => handleChange(value)} value={value} />
    </>
  );
}
