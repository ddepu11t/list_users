import { Heading, HStack, Spinner, Text, View } from 'native-base'
import { FC } from 'react'

const SpinnerComponent: FC<{ message: string; mt?: number }> = ({
  message,
  mt = 16,
}) => {
  return (
    <HStack mt={mt} space={2} justifyContent='center'>
      <Spinner accessibilityLabel='Loading posts' color={'#5b5b5b'} />

      <Heading color='#5b5b5b' fontSize='lg' fontWeight={400}>
        {message}
      </Heading>
    </HStack>
  )
}

export default SpinnerComponent
