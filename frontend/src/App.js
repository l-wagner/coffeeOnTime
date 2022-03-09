import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import { Menu, MenuItem, MenuButton, Button, MenuList } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import AddEmployee from './components/employee-add.component';
import Employee from './components/employee.component';
import EmployeeList from './components/employee-list.component';

import AddTag from './components/tag-add.component';
import AddShift from './components/shift-add.component';

import TagList from './components/tag-list.component';

import Business from './components/business-create';
import { retrieveBusiness } from './actions/business';

export default function App() {
  const dispatch = useDispatch();

  const business = useSelector((state) => state.business);

  useEffect(() => {
    dispatch(retrieveBusiness());
    console.log(business);
    
  }, []);

  return (
    <ChakraProvider>
      <Router>
        <nav className='navbar navbar-expand navbar-dark bg-dark'>
          <Link to={'/'} className='navbar-brand'>
            
            {business.name ? business.name : 'Coffee On Time'}
            
          </Link>

          <div className='navbar-nav mr-auto'>
            <Menu>
              <MenuButton colorScheme='blue' as={Button} rightIcon={<ChevronDownIcon />}>
                Add stuff
              </MenuButton>
              <MenuList>
                <MenuItem>
                  <Link to={'/add-employee'}>Add employee</Link>
                </MenuItem>
                <MenuItem>
                  <Link to={'/add-tag'}>Add tag</Link>
                </MenuItem>
                <MenuItem>
                  <Link to={'/add-shift'}>Add shift</Link>
                </MenuItem>
              </MenuList>
            </Menu>
            <li className='nav-item'>
              <Link to={'/employees'} className='nav-link'>
                Employees
              </Link>
            </li>
            <li className='nav-item'>
              <Link to={'/setup'} className='nav-link'>
                Set up your business
              </Link>
            </li>
          </div>
        </nav>
        <div className='container mt-3'>
          <Switch>
            <Route exact path={['/', '/employees']} component={EmployeeList} />
            <Route exact path='/add-employee' component={AddEmployee} />
            <Route exact path='/tags' component={TagList} />
            <Route exact path='/add-tag' component={AddTag} />
            <Route exact path='/add-shift' component={AddShift} />
            <Route path='/employees/:id' component={Employee} />
            <Route path='/setup' component={Business} />
          </Switch>
        </div>
      </Router>
    </ChakraProvider>
  );
}
