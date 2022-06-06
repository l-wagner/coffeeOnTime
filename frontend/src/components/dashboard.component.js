import { Box, Button, Container, Flex, Heading, Icon, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { FcAssistant, FcDonate, FcInTransit } from 'react-icons/fc';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { retrieveEmployees } from '../actions/employees.js';
import { retrieveTags } from '../actions/tags';
import { retrieveShifts } from '../actions/shifts';

const Feature = ({ number, link, item }) => {
  return (
    <Stack textAlign={'center'}>
      {/* <Flex w={16} h={16} align={'center'} justify={'center'} color={'white'} rounded={'full'} bg={'gray.100'} mb={1}>
        {icon}
      </Flex> */}
      <Text fontWeight={600}>
        {number} {item}
      </Text>

      <Button mt={4} size={'sm'} colorScheme='teal' type='submit'>
        <Link className='nav-link' to={link}>
          Add more {item}
        </Link>
      </Button>
    </Stack>
  );
};
export default function Dashboard() {
  
  const { employees, business, tags, shifts } = useSelector((state) => state);

  useEffect(() => {
    // only run if business id avail
    business.id && dispatch(retrieveEmployees(business.id));
    business.id && dispatch(retrieveTags(business.id));
    business.id && dispatch(retrieveShifts(business.id));
  }, [business.id]);

  const dispatch = useDispatch();

  return (
    <>
      <Container maxW={'3xl'}>
        <Stack as={Box} textAlign={'center'} spacing={{ base: 8, md: 14 }} py={{ base: 20, md: 10 }}>
          <Heading fontWeight={50} fontSize={{ base: '2xl', sm: '4xl', md: '2xl' }} lineHeight={'110%'}>
            <Text as={'u'} fontWeight={5000} color={'teal.400'}>
              {business.name}{' '}
            </Text>
            has
          </Heading>
        </Stack>
      </Container>
      <Box p={4}>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
          <Feature icon={<Icon as={FcAssistant} w={10} h={10} />} number={employees.length} item={'employees'} link={'/employees'} />
          <Feature icon={<Icon as={FcDonate} w={10} h={10} />} number={tags.length} item={business.nameForTags} link={'/tags'} />
          <Feature icon={<Icon as={FcInTransit} w={10} h={10} />} number={shifts.length} item={'shifts'} link={'/shifts'} />
        </SimpleGrid>
        <Button isFullWidth mt={12} colorScheme='pink'>
          <Link to={'/schedule-create'}> Create schedule</Link>
        </Button>
      </Box>
    </>
  );
}
