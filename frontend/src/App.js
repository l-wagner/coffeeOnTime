import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  ChakraProvider,
  CloseButton,
  Container,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMugHot } from '@fortawesome/free-solid-svg-icons';

import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { retrieveBusiness } from './actions/business';
import './App.css';
import CreateBusiness from './components/business-create';
import Employee from './components/employee/employee.component';
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
      {error && (
        <>
          <nav className='navbar navbar-expand navbar-dark bg-dark'>
            <div className='navbar-brand'>
              <FontAwesomeIcon icon={faMugHot} /> Coffee On Time{' '}
            </div>
          </nav>
          <Alert status='error'>
            <AlertIcon />
            <AlertTitle mr={2}>We are offline.</AlertTitle>
            <AlertDescription>It looks like your server is down.</AlertDescription>
            <CloseButton position='absolute' right='8px' top='8px' />
          </Alert>
          <Stack as={Box} textAlign={'center'} spacing={{ base: 8, md: 14 }} py={{ base: 20, md: 10 }}>
            <Heading fontWeight={600} fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }} lineHeight={'110%'}>
              Sorry <br />
              <Text as={'span'} color={'red.400'}>
                about that.
              </Text>
              <Text as={'div'}>
                <FontAwesomeIcon icon={faMugHot} />
              </Text>
            </Heading>
          </Stack>
        </>
      )}
      {!error && business?.id ? (
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
        !error && (
          <>
            <nav className='navbar navbar-expand navbar-dark bg-dark'>
              <div className='navbar-brand'>
                <FontAwesomeIcon icon={faMugHot} /> Coffee On Time{' '}
              </div>
            </nav>
            <Container maxW={'3xl'}>
              <Stack as={Box} textAlign={'center'} spacing={{ base: 8, md: 14 }} py={{ base: 20, md: 10 }}>
                <Heading fontWeight={600} fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }} lineHeight={'110%'}>
                  Setup <br />
                  <Text as={'span'} color={'teal.400'}>
                    your business
                  </Text>
                </Heading>

                <Stack direction={'column'} spacing={3} align={'center'} alignSelf={'center'} position={'relative'}>
                  <CreateBusiness />
                </Stack>
              </Stack>
            </Container>
          </>
        )
      )}
    </ChakraProvider>
  );
}
