import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import AddEmployee from './components/employee-add.component';
import Employee from './components/employee.component';
import EmployeeList from './components/employee-list.component';

import AddRole from './components/role-add.component';
import Role from './components/role.component';
import RoleList from './components/role-list.component';

class App extends Component {
  render() {
    return (
      <Router>
        <nav className='navbar navbar-expand navbar-dark bg-dark'>
          <Link to={'/employees'} className='navbar-brand'>
            bezKoder
          </Link>
          <div className='navbar-nav mr-auto'>
            <li className='nav-item'>
              <Link to={'/employees'} className='nav-link'>
                Employees
              </Link>
            </li>
            <li className='nav-item'>
              <Link to={'/addEmployee'} className='nav-link'>
                Add Employee
              </Link>
            </li>
            <li className='nav-item'>
              <Link to={'/addRole'} className='nav-link'>
                Add Role
              </Link>
            </li>
            <li className='nav-item'>
              <Link to={'/roles'} className='nav-link'>
                Roles
              </Link>
            </li>
          </div>
        </nav>

        <div className='container mt-3'>
          <Switch>
            <Route exact path={['/', '/employees']} component={EmployeeList} />
            <Route exact path='/addEmployee' component={AddEmployee} />
            <Route exact path='/roles' component={RoleList} />
            <Route exact path='/addRole' component={AddRole} />
            <Route path='/employees/:id' component={Employee} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
