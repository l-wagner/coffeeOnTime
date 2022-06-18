import { Box, Button, Center, Checkbox, Container, FormControl, FormErrorMessage, Heading, Input, Stack, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/auth';


export default function Profile() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const onSubmit = (values) => {
    dispatch(login(values));
  };

  return (
    <Container maxW={'xl'}>
      <Stack as={Box} textAlign={'center'} spacing={{ base: 8, md: 14 }} py={{ base: 20, md: 10 }}>
        {auth?.firstName ? (
          <>
            <Text fontSize='lg'>Welcome, {auth.firstName}!</Text>
          </>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              <FormControl isInvalid={errors.firstName}>
                <Input
                  id='name'
                  value='Dee'
                  placeholder='Your first name'
                  {...register('firstName', { required: 'Please enter your first name.' })}
                />
                <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.businessName}>
                <Input
                  value="Paddy's Pub"
                  id='businessName'
                  placeholder='The business you work for'
                  {...register('businessName', { required: 'Please enter the name of your business.' })}
                />
                <FormErrorMessage>{errors.businessName?.message}</FormErrorMessage>
              </FormControl>
            </Stack>

            <Button isFullWidth mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
              Log in
            </Button>
          </form>
        )}
      </Stack>
    </Container>
  );
}
