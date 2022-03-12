import React from 'react';
import AddEmployee from './employee-add.component';
import EmployeeList from './employee-list.component';

export default function Employee() {
  
  return (
    <div className='form-group'>
      <EmployeeList />
      <AddEmployee />
    </div>
  );
}
