import { ChevronDownIcon } from '@chakra-ui/icons';
import { Button, ChakraProvider, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'handsontable/dist/handsontable.full.css';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { logout } from './actions/auth';
import { retrieveBusiness } from './actions/business';
import './App.css';
import ErrorWithMsg from './components/alerts/createError.component';
import Error from './components/alerts/error.component';
import UpdateError from './components/alerts/updateError.component';
import CreateBusiness from './components/business-create';
import Dashboard from './components/dashboard.component';
import Employee from './components/employee/employee.component';
import Profile from './components/profile.component';
import RTO from './components/rto/rto-index.component';
import ScheduleCreate from './components/schedule/schedule-create.component';
import AddShift from './components/shift-add.component';
import ShiftList from './components/shift-list.component';
import TagList from './components/tag-list.component';

export default function App() {
  const dispatch = useDispatch();

  const business = useSelector((state) => state.business);
  const error = useSelector((state) => state.error);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    let id = 1;
    dispatch(retrieveBusiness(id));
  }, []);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <ChakraProvider>
      {error?.serverError && <Error />}
      {error?.updateError && <UpdateError />}
      {error?.loginError && <ErrorWithMsg msg={error.msg} />}
      {!error?.serverError && business?.id ? (
        <Router>
          <nav className='navbar navbar-expand navbar-dark bg-dark'>
            <Link to={'/'} className='navbar-brand'>
              {business?.name ? business.name : 'Coffee On Time'}
            </Link>

            <div className='navbar-nav mr-auto'>
              <li className='nav-item'>
                <Link to={'/schedule-create'} className='nav-link'>
                  Schedule
                </Link>
              </li>

              <li className='nav-item'>
                <Link to={'/shifts'} className='nav-link'>
                  Switch business
                </Link>
              </li>

              {auth?.firstName && (
                <li className='nav-item'>
                  <Link to={'/rto'} className='nav-link'>
                    RTO
                  </Link>
                </li>
              )}

              <li>
                <Menu>
                  <MenuButton colorScheme='teal' size='sm' as={Button} rightIcon={<ChevronDownIcon />}>
                    Manage
                  </MenuButton>
                  <MenuList>
                    <MenuItem>
                      <Link to={'/employees'}>Employees</Link>
                    </MenuItem>
                    <MenuItem>
                      <Link to={'/tags'}> {business.nameForTags.charAt(0).toUpperCase() + business.nameForTags.slice(1)}</Link>
                    </MenuItem>
                    <MenuItem>
                      <Link to={'/shifts'}>Shifts</Link>
                    </MenuItem>
                  </MenuList>
                </Menu>
              </li>

              {!business?.id && (
                <li className='nav-item'>
                  <Link to={'/setup'} className='nav-link'>
                    Set up your business
                  </Link>
                </li>
              )}
            </div>
            <div className='navbar-nav my-2 my-lg-0'>
              <li className='nav-item'>
                {auth?.firstName ? (
                  <div onClick={handleLogout} className='nav-link'>
                    Logout
                  </div>
                ) : (
                  <Link to={'/profile'} className='nav-link'>
                    Login
                  </Link>
                )}
              </li>
            </div>
          </nav>
          <div className='container mt-3'>
            {error?.createError && <ErrorWithMsg msg={error.msg} />}

            <Switch>
              <Route exact path={['/']} component={Dashboard} />
              <Route exact path={['/', '/employees']} component={Employee} />
              <Route exact path='/tags' component={TagList} />
              <Route exact path='/shifts' component={ShiftList} />
              <Route exact path='/add-shift' component={AddShift} />
              <Route exact path='/schedule-create' component={ScheduleCreate} />
              <Route path='/setup' component={CreateBusiness} />
              <Route path='/profile' component={Profile} />
              <Route path='/rto' component={RTO} />
            </Switch>
          </div>
        </Router>
      ) : (
        !error && !business.id && <CreateBusiness />
      )}
    </ChakraProvider>
  );
}
