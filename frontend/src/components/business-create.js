import {
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';
import { faMugHot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
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
                  Roles, jobs, skills? Tags will be used to define needs per shift. E.g: Monday open shifts need 2 baristas and 1
                  back-of-house. Employees who are tagged with those will be scheduled to fill the shift.
                </FormHelperText>
              </FormControl>
              <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
                Submit
              </Button>
            </form>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}
