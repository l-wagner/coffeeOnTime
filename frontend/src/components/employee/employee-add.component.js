import { Button, Checkbox, FormControl, FormErrorMessage, Input, Stack } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { createEmployee } from '../../actions/employees.js';
import { retrieveTags } from '../../actions/tags.js';

export default function Employee() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const availableTags = useSelector((state) => state.tags);
  const displayName = useSelector((state) => state.business.nameForTags);
  const businessId = useSelector((state) => state.business.id);
  const dispatch = useDispatch();

  useEffect(() => {
    // only run if business id avail
    businessId && dispatch(retrieveTags(businessId));
  }, [businessId]);

  const onSubmit = (values) => {
    dispatch(createEmployee(values));
    console.log(values);
  };

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

          <FormControl isInvalid={errors.tags}>
            <Stack spacing={5} direction='row'>
              {availableTags &&
                availableTags.map((tag) => (
                  <Checkbox
                    value={tag.id}
                    key={tag.id}
                    {...register('tags', { required: `Please select this employee's ${displayName}.` })}>
                    {tag.name}
                  </Checkbox>
                ))}
            </Stack>
            <FormErrorMessage>{errors.tags?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.blockedDays}>
            <Stack spacing={5} direction='row'>
              <Checkbox value='Mon' id='Mon' {...register('blockedDays')}>
                Mon
              </Checkbox>
              <Checkbox value='Tue' id='Tue' {...register('blockedDays')}>
                Tue
              </Checkbox>
              <Checkbox value='Wed' id='Wed' {...register('blockedDays')}>
                Wed
              </Checkbox>
              <Checkbox value='Thu' id='Thu' {...register('blockedDays')}>
                Thu
              </Checkbox>
              <Checkbox value='Fri' id='Fri' {...register('blockedDays')}>
                Fri
              </Checkbox>
              <Checkbox value='Sat' id='Sat' {...register('blockedDays')}>
                Sat
              </Checkbox>
              <Checkbox value='Sun' id='Sun' {...register('blockedDays')}>
                Sun
              </Checkbox>
            </Stack>
          </FormControl>
        </Stack>

        <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
          Submit
        </Button>
      </div>
    </form>
  );
}
