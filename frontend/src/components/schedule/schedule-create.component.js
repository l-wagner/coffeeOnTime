import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { retrieveEmployees } from '../../actions/employees.js';
import { retrieveTags } from '../../actions/tags';
import Calendar from './calendar.component.js';

export default function ScheduleCreate() {
  const [value, onChange] = React.useState(new Date());

  const { employees, business, tags, shifts } = useSelector((state) => state);
  useEffect(() => {
    // only run if business id avail
    business.id && dispatch(retrieveEmployees(business.id));
    business.id && dispatch(retrieveTags(business.id));
  }, [business.id]);

  const dispatch = useDispatch();

  return (
    <>
      <Calendar onChange={onChange} value={value} />
    </>
  );
}
