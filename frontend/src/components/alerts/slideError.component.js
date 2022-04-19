import { Box, Center, Slide, Text } from "@chakra-ui/react";


export default function SlideError(props) {
  return (
    <Slide direction='bottom' in={props.error.isError} style={{ zIndex: 10 }}>
      <Box p='40px' color='white' mt='4' bg='red.500' rounded='md' shadow='md'>
        <Center>
          <Text fontSize='xl'> {props.error.msg}</Text>
        </Center>
      </Box>
    </Slide>
  );
}
