import { Box, Button, Center, Checkbox, Container, FormControl, FormErrorMessage, Heading, Input, Stack, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import Calendar from 'react-calendar';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

export default function RTO(props) {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const [value, onChange] = React.useState();
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const onSubmit = (values) => {
    // dispatch(login(values));
    console.log(values);
  };

  return (
    <Container maxW={'xl'}>
      <Stack as={Box} textAlign={'center'} spacing={{ base: 8, md: 14 }} py={{ base: 20, md: 10 }}>
        <Calendar showDoubleView selectRange calendarType={'US'} onChange={(value) => props.handleChange(value)} value={value} />
      </Stack>
    </Container>
  );
}
