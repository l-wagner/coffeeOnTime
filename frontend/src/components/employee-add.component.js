import React, { Component, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { createEmployee } from '../actions/employees.js';
import { retrieveTags } from '../actions/tags.js';
import { Checkbox, Input, InputGroup, Stack, HStack, FormErrorMessage, Button, FormControl } from '@chakra-ui/react';

export default function Employee() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  // constructor(props) {
  //   super(props);
  //   this.onChangeName = this.onChangeName.bind(this);
  //   this.onChangeBlockedDays = this.onChangeBlockedDays.bind(this);
  //   this.onChangeEmployeeTags = this.onChangeEmployeeTags.bind(this);
  //   this.saveEmployee = this.saveEmployee.bind(this);
  //   this.newEmployee = this.newEmployee.bind(this);

  const availableTags = useSelector((state) => state.tags);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrieveTags());
  }, []);

  function onChangeEmployeeTags(tagName) {
    let { employeeTags } = this.state;
    let index = employeeTags.indexOf(tagName);
    index >= 0 ? employeeTags.splice(index, 1) : employeeTags.push(tagName);
    this.setState({
      employeeTags: employeeTags,
    });
    console.log(this.state.employeeTags);
  }

  function onChangeBlockedDays(day) {
    let { blockedDays } = this.state;
    let index = blockedDays.indexOf(day);
    index >= 0 ? blockedDays.splice(index, 1) : blockedDays.push(day);
    this.setState({
      blockedDays: blockedDays,
    });
    console.log(this.state.blockedDays);
  }

  function saveEmployee() {
    const { name, blockedDays, employeeTags } = this.state;

    this.props
      .createEmployee(name, blockedDays.join(','), employeeTags.join(','))
      .then((data) => {
        this.setState({
          id: data.id,
          name: data.name,
          blockedDays: data.blockedDays,
          employeeTags: data.employeeTags,
          active: data.active,

          submitted: true,
        });
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function onSubmit(values) {
    dispatch(createEmployee(values));
    console.log(values);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* {this.state.submitted && (
        <div>
          <h4>You submitted successfully!</h4>
          <button className='btn btn-success' onClick={this.newEmployee}>
            Add
          </button>
        </div>
      )} */}

      <div className='form-group'>
        <Stack spacing={4}>
          <FormControl isInvalid={errors.name}>
            <Input id='name' placeholder='Leslie Coffee' {...register('name', { required: 'Please enter the employees name.' })} />
            <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
          </FormControl>

          {/* optional blocked days */}
          <Input id='blockedDays' placeholder='Leslie Coffee' {...register('blockedDays')} />

          <FormControl isInvalid={errors.tags}>
            <Stack spacing={5} direction='row'>
              {availableTags &&
                availableTags.map((tag) => (
                  <Checkbox value={tag.id} key={tag.id} {...register('tags')}>
                    {tag.name}
                  </Checkbox>
                ))}
            </Stack>
            <FormErrorMessage>{errors.tags?.message}</FormErrorMessage>
          </FormControl>

          {/* Tags set up for this business */}
          {/* <InputGroup size='sm'>
              <Stack spacing={5} direction='row'>
                {availableTags &&
                  availableTags.map((tag, index) => (
                    <Checkbox value={tag.id} key={tag.id} onChange={() => this.onChangeEmployeeTags(tag.id)}>
                      {tag.name}
                    </Checkbox>
                  ))}
              </Stack>
            </InputGroup>

            {/* If you add the size prop to `InputGroup`, it'll pass it to all its children. */}
          {/* <InputGroup size='sm'>
              <HStack align='stretch' direction='row'>
                <Checkbox value='Mon' onChange={() => this.onChangeBlockedDays('Mon')}>
                  Mon
                </Checkbox>
                <Checkbox value='Tue' onChange={() => this.onChangeBlockedDays('Tue')}>
                  Tue
                </Checkbox>
                <Checkbox value='Wed' onChange={() => this.onChangeBlockedDays('Wed')}>
                  Wed
                </Checkbox>
                <Checkbox value='Thu' onChange={() => this.onChangeBlockedDays('Thu')}>
                  Thu
                </Checkbox>
                <Checkbox value='Fri' onChange={() => this.onChangeBlockedDays('Fri')}>
                  Fri
                </Checkbox>
                <Checkbox value='Sat' onChange={() => this.onChangeBlockedDays('Sat')}>
                  Sat
                </Checkbox>
                <Checkbox value='Sun' onChange={() => this.onChangeBlockedDays('Sun')}>
                  Sun
                </Checkbox>
              </HStack>
            </InputGroup>{' '}
             */}
        </Stack>
        {/* <input
                type='text'
                className='form-control'
                id='name'
                required
                value={this.state.name}
                onChange={this.onChangeName}
                name='name'
              /> */}

        {/* <div className='form-group'>
              <label htmlFor='blockedDays'>BlockedDays</label>
              <input
                type='radio'
                className='form-control'
                id='blockedDays'
                required
                value={this.state.blockedDays}
                onChange={this.onChangeBlockedDays}
                name='blockedDays'
              />
            </div> */}

        <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
          Submit
        </Button>
      </div>
    </form>
  );
}
