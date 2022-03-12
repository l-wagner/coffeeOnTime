import { Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input } from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { createBusiness } from '../actions/business';

export default function Business() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  // const business = useSelector((state) => state.business);
  const dispatch = useDispatch();

  function onSubmit(values) {
    dispatch(createBusiness(values));
  }

  return (
    
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={errors.name}>
        <FormLabel htmlFor='name'>What's the name of your business?</FormLabel>
        <Input id='name' placeholder='Awesome Corp.' {...register('name', { required: 'Please name your business.' })} />
        {/* {errors.name && errors.name?.message} */}
        <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.owner}>
        <FormLabel htmlFor='name'>Who are the owners?</FormLabel>
        <Input id='owner' placeholder='Lisa' {...register('owner', { required: 'Please name at least one owner.' })} />
        <FormErrorMessage>{errors.owner?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.nameForTags}>
        <FormLabel htmlFor='name'>What do you call your tags?</FormLabel>
        <Input id='nameForTags' placeholder='Skills, roles, tags?' {...register('nameForTags')} />
        <FormErrorMessage>{errors.nameForTags?.message}</FormErrorMessage>
        <FormHelperText>
          {' '}
          Roles, jobs, skills? Tags will be used to define needs per shift. E.g: Monday open shifts need 2 baristas and 1 back-of-house.
          Employees who are tagged with those will be scheduled to fill the shift.
        </FormHelperText>
      </FormControl>
      <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
        Submit
      </Button>
    </form>
  );
}
