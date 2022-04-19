import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Box, CloseButton, Heading, Stack,
    Text
} from '@chakra-ui/react';
import { faMugHot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Error() {
  return (
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
  );
}
