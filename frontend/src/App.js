import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  ChakraProvider,
  CloseButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { Alert } from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { retrieveBusiness } from './actions/business';
import './App.css';
import CreateBusiness from './components/business-create';
import Employee from './components/employee/employee.component';
import Error from './components/errors/error.component';
import UpdateError from './components/errors/updateError.component';
import AddShift from './components/shift-add.component';
import AddTag from './components/tag-add.component';
import TagList from './components/tag-list.component';

export default function App() {
  const dispatch = useDispatch();

  const business = useSelector((state) => state.business);
  const error = useSelector((state) => state.error);

  useEffect(() => {
    dispatch(retrieveBusiness());
  }, []);

  return (
    <ChakraProvider>
      {error?.serverError && <Error />}
      {error?.updateError && <UpdateError />}
      {!error?.serverError && business?.id ? (
        <Router>
          <nav className='navbar navbar-expand navbar-dark bg-dark'>
            <Link to={'/'} className='navbar-brand'>
              {business?.name ? business.name : 'Coffee On Time'}
            </Link>

            <div className='navbar-nav mr-auto'>
              <Menu>
                <MenuButton colorScheme='blue' as={Button} rightIcon={<ChevronDownIcon />}>
                  Add stuff
                </MenuButton>
                <MenuList>
                  <MenuItem>
                    <Link to={'/employees'}>Add employee</Link>
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
              <Route exact path={['/', '/employees']} component={Employee} />
              <Route exact path='/tags' component={TagList} />
              <Route exact path='/add-tag' component={AddTag} />
              <Route exact path='/add-shift' component={AddShift} />
              <Route path='/setup' component={CreateBusiness} />
            </Switch>
          </div>
        </Router>
      ) : (
        !error && <CreateBusiness />
      )}
    </ChakraProvider>
  );
}
