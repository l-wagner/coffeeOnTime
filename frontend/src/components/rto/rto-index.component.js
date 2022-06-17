import React from 'react';
import { useSelector } from 'react-redux';
import EmployeeRTO from './rto-empee.component';
import OwnerRTO from './rto-owner.component';

export default function Employee() {
  const auth = useSelector((state) => state.auth);

  // return auth.firstName ? (auth.active === 'Owner' ? <OwnerRTO></OwnerRTO> : <EmployeeRTO></EmployeeRTO>) : <div></div>;
  return <OwnerRTO></OwnerRTO>
}
