import React, { Component } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { Menu, MenuItem, MenuButton, Button, MenuList } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import AddEmployee from './components/employee-add.component';
import Employee from './components/employee.component';
import EmployeeList from './components/shift-list.component';

import AddRole from './components/role-add.component';
import AddShift from './components/shift-add.component';

import RoleList from './components/role-list.component';

class App extends Component {
  render() {
    return (
      <ChakraProvider>
        <Router>
          <nav className='navbar navbar-expand navbar-dark bg-dark'>
            <Link to={'/'} className='navbar-brand'>
              Coffee On Time
            </Link>

            <div className='navbar-nav mr-auto'>
              <Menu>
                <MenuButton colorScheme='blue' as={Button} rightIcon={<ChevronDownIcon />}>
                  Add Stuff
                </MenuButton>
                <MenuList>
                  <MenuItem>
                    <Link to={'/add-employee'}>Add Employee</Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to={'/add-role'}>Add Role</Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to={'/add-shift'}>Add Shift</Link>
                  </MenuItem>
                </MenuList>
              </Menu>
              <li className='nav-item'>
                <Link to={'/employees'} className='nav-link'>
                  Employees
                </Link>
              </li>
            </div>
          </nav>
          <div className='container mt-3'>
            <Switch>
              <Route exact path={['/', '/employees']} component={EmployeeList} />
              <Route exact path='/add-employee' component={AddEmployee} />
              <Route exact path='/roles' component={RoleList} />
              <Route exact path='/add-role' component={AddRole} />
              <Route exact path='/add-shift' component={AddShift} />
              <Route path='/employees/:id' component={Employee} />
            </Switch>
          </div>
        </Router>
      </ChakraProvider>
    );
  }
}

export default App;
