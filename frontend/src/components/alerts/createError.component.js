import { Alert, AlertDescription, AlertIcon, AlertTitle, CloseButton } from '@chakra-ui/react';

export default function CreateError(props) {
  return (
    <>
      <Alert status='error'>
        <AlertIcon />
        <AlertTitle mr={2}>{props.msg || 'We could not create this element.'}</AlertTitle>
        <AlertDescription>{props.desc}</AlertDescription>
        <CloseButton position='absolute' right='8px' top='8px' />
      </Alert>
    </>
  );
}
