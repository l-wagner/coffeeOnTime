import { Button, Checkbox, FormControl, FormErrorMessage, HStack, Input, Stack } from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { createTag } from '../actions/tags';

export default function AddTag() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const displayName = useSelector((state) => state.business.nameForTags);
  const dispatch = useDispatch();

  function onSubmit(values) {
    dispatch(createTag(values));
    console.log(values);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* {this.state.submitted && (
        <div>
          <h4>You submitted successfully!</h4>
        </div>
      )} */}
      <div>
        <FormControl isInvalid={errors.name}>
          <Input
            id='name'
            placeholder='Barista, back of house... '
            {...register('name', { required: `Please enter the name for your new ${displayName}.` })}
          />
          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.description}>
          <Input
            id='description'
            placeholder='Can make coffee. Makes sammies... '
            {...register('description', { required: `Please enter the description for your new ${displayName}.` })}
          />
          <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
        </FormControl>

        <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
          Submit
        </Button>
      </div>
    </form>
  );
}
