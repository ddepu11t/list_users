import { FC } from 'react'
import { Text, View } from 'native-base'

const AccountScreen: FC = () => {
  return (
    <View
      //   borderWidth={1}
      flex={1}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <Text fontSize={'2xl'}>Account Screen</Text>
    </View>
  )
}

export default AccountScreen
