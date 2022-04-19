import { Alert, AlertDescription, AlertIcon, AlertTitle, CloseButton } from '@chakra-ui/react';

export default function UpdateError() {
  return (
    <>
      <Alert status='error'>
        <AlertIcon />
        <AlertTitle mr={2}>We could not update this element.</AlertTitle>
        <AlertDescription>Please contact your admin.</AlertDescription>
        <CloseButton position='absolute' right='8px' top='8px' />
      </Alert>
    </>
  );
}
